import api from './api';

export const contactService = {
  sendMessage: async (name, email, subject, message) => {
    const response = await api.post('/contact', {
      name,
      email,
      subject,
      message,
    });
    return response.data;
  },

  getAllMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.patch(`/contact/${id}/read`);
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};
