import api from './api'

// Generic CRUD factory for the frontend, mirrors backend crudRouter
const resource = (path) => ({
  getAll: (params) => api.get(`/${path}`, { params }),
  getOne: (id) => api.get(`/${path}/${id}`),
  create: (data) => api.post(`/${path}`, data),
  update: (id, data) => api.put(`/${path}/${id}`, data),
  remove: (id) => api.delete(`/${path}/${id}`),
  reorder: (items) => api.patch(`/${path}/reorder`, { items }),
})

export const projectsApi = resource('projects')
export const skillsApi = resource('skills')
export const educationApi = resource('education')
export const experienceApi = resource('experience')
export const achievementsApi = resource('achievements')
export const certificatesApi = resource('certificates')
export const publicationsApi = resource('publications')
export const socialLinksApi = resource('social-links')
export const sectionsApi = resource('sections')

export const skillCategoriesApi = {
  getAll: () => api.get('/skills/categories/all'),
  create: (data) => api.post('/skills/categories', data),
  update: (id, data) => api.put(`/skills/categories/${id}`, data),
  remove: (id) => api.delete(`/skills/categories/${id}`),
}

export const heroApi = {
  get: () => api.get('/hero'),
  update: (data) => api.put('/hero', data),
}

export const aboutApi = {
  get: () => api.get('/about'),
  update: (data) => api.put('/about', data),
}

export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  markRead: (id) => api.patch(`/contact/${id}/read`),
  remove: (id) => api.delete(`/contact/${id}`),
}

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

export const uploadApi = {
  image: (file, folder) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post(`/upload/image?folder=${folder}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  resume: (file) => {
    const formData = new FormData()
    formData.append('resume', file)
    return api.post('/upload/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteImage: (publicId) => api.delete(`/upload/image/${encodeURIComponent(publicId)}`),
}

export const dashboardApi = {
  stats: () => api.get('/dashboard/stats'),
}