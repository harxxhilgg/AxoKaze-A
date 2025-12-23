import axios from "axios";
import { useAuthStore } from "../stores";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000, // 30 sec for cold starts
});

// Endpoints that should NOT trigger token refresh on 401
const NO_REFRESH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/resend-otp",
  "/auth/refresh-token",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/logout",
  "/auth/google-login",
];

const shouldSkipRefresh = (url: string | undefined): boolean => {
  if (!url) return true;
  return NO_REFRESH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh for excluded endpoints or if already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh(originalRequest.url)
    ) {
      if (isRefreshing) {
        // Wait for the current refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");

        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Refresh failed - logout and redirect
        const { logout } = useAuthStore.getState();
        await logout();

        // Don't redirect if already on a public page
        const publicPages = ["/login", "/forgot-password", "/register", "/"];
        const isOnPublicPage = publicPages.some((page) =>
          window.location.pathname.startsWith(page)
        );

        if (!isOnPublicPage) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
