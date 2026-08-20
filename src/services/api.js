import axios from "axios";

const configuredUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = configuredUrl.replace(/\/$/, "").endsWith("/api")
  ? configuredUrl.replace(/\/$/, "")
  : `${configuredUrl.replace(/\/$/, "")}/api`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage as a fallback (in addition to the httpOnly cookie)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopsphere_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages so components can just read err.message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;

/* ------------------------- Auth ------------------------- */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  addAddress: (data) => api.post("/auth/profile/addresses", data),
  deleteAddress: (id) => api.delete(`/auth/profile/addresses/${id}`),
};

/* ------------------------- Products ------------------------- */
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  search: (params) => api.get("/products/search", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category, params) => api.get(`/products/category/${category}`, { params }),
  getCategories: () => api.get("/products/categories/all"),
  getHighlights: () => api.get("/products/highlights/all"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

/* ------------------------- Orders ------------------------- */
export const orderAPI = {
  create: (data) => api.post("/orders", data),
  getMine: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders/admin/all"),
  updateStatus: (id, orderStatus) => api.put(`/orders/${id}/status`, { orderStatus }),
};

/* ------------------------- Reviews ------------------------- */
export const reviewAPI = {
  getForProduct: (productId) => api.get(`/reviews/${productId}`),
  create: (productId, data) => api.post(`/reviews/${productId}`, data),
  delete: (reviewId) => api.delete(`/reviews/single/${reviewId}`),
};

/* ------------------------- Users (admin) ------------------------- */
export const userAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  delete: (id) => api.delete(`/users/${id}`),
};
