import axios from 'axios'

const api = axios.create({
  baseURL: '/dev-portfolio/v1',
  timeout: 10000
})

// 请求拦截器 - 添加 Token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理 Token 过期
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 认证
export const login = (username, password) => api.post('/auth/login', { username, password })
export const getCurrentUser = () => api.get('/user/me')

// 个人资料
export const getProfile = () => api.get('/profile/info')
export const updateProfile = (data) => api.put('/profile/info', data)

// 技能
export const getSkills = () => api.get('/profile/skills')

// 项目
export const getProjects = (published = true) => api.get('/projects', { params: { published } })
export const getProject = (id) => api.get(`/projects/${id}`)
export const createProject = (data) => api.post('/projects', data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)

// 博客
export const getBlogPosts = (page = 1, pageSize = 10, published = true) => 
  api.get('/blogs', { params: { page, pageSize, published } })
export const getBlogPostBySlug = (slug) => api.get(`/blogs/slug/${slug}`)
export const getBlogPost = (id) => api.get(`/blogs/${id}`)
export const createBlogPost = (data) => api.post('/blogs', data)
export const updateBlogPost = (id, data) => api.put(`/blogs/${id}`, data)
export const deleteBlogPost = (id) => api.delete(`/blogs/${id}`)

export default api
