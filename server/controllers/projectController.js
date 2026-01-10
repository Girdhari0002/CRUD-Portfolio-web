const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments();

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message,
    });
  }
};

// Get featured projects
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true, status: 'published' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: error.message,
    });
  }
};

// Get single project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message,
    });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, imageUrl, liveUrl, githubUrl, category, featured, status, dateCompleted } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // Ensure technologies is an array
    let techs = [];
    if (Array.isArray(technologies)) {
      techs = technologies.filter(t => t && t.trim());
    } else if (technologies) {
      techs = [technologies];
    }

    // Validate category
    const validCategories = ['Web', 'Mobile', 'Design', 'Other'];
    const validCategory = validCategories.includes(category) ? category : 'Web';

    // Validate status
    const validStatus = ['published', 'draft'].includes(status) ? status : 'published';

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      technologies: techs,
      imageUrl: (imageUrl && imageUrl.trim()) || '',
      liveUrl: (liveUrl && liveUrl.trim()) || '',
      githubUrl: (githubUrl && githubUrl.trim()) || '',
      category: validCategory,
      featured: featured === true,
      status: validStatus,
      dateCompleted: dateCompleted ? new Date(dateCompleted) : new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(e => e.message) : [],
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedAt = Date.now();

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message,
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message,
    });
  }
};

// Toggle featured
exports.toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    project.featured = !project.featured;
    project.updatedAt = Date.now();
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project featured status toggled',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling featured status',
      error: error.message,
    });
  }
};
