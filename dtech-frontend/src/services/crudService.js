import api from './api';

const makeService = (endpoint) => ({
  getAll: (params) => api.get(`/${endpoint}`, { params }).then(r => r.data),
  getById: (id) => api.get(`/${endpoint}/${id}`).then(r => r.data),
  create: (formData) => api.post(`/${endpoint}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  update: (id, formData) => api.put(`/${endpoint}/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  remove: (id) => api.delete(`/${endpoint}/${id}`).then(r => r.data),
});

export const achievementsService = {
  ...makeService('achievements'),
  addImage: (id, formData) => api.post(`/achievements/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  removeImage: (imageId) => api.delete(`/achievements/images/${imageId}`).then(r => r.data),
  addTechnology: (id, formData) => api.post(`/achievements/${id}/technologies`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  removeTechnology: (techId) => api.delete(`/achievements/technologies/${techId}`).then(r => r.data),
};

export const portfolioService = {
  ...makeService('portfolio'),
  addImage: (id, formData) => api.post(`/portfolio/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  removeImage: (imageId) => api.delete(`/portfolio/images/${imageId}`).then(r => r.data),
};

export const productsService = {
  ...makeService('products'),
  addImage: (id, formData) => api.post(`/products/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  removeImage: (imageId) => api.delete(`/products/images/${imageId}`).then(r => r.data),
};

export const servicesService = makeService('services');
export const testimoniService = makeService('testimoni');
export const teamService = makeService('team');
export const newsService = makeService('news');
export const certificatesService = makeService('certificates');

export const contactService = {
  getAll: () => api.get('/contact').then(r => r.data),
  markRead: (id) => api.patch(`/contact/${id}/read`).then(r => r.data),
  remove: (id) => api.delete(`/contact/${id}`).then(r => r.data),
};
