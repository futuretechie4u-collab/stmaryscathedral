// src/api.js
import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      if (window.location.pathname !== "/SignIn") {
        window.location.href = "/SignIn";
      }
    }
    return Promise.reject(error);
  }
);

export default API_BASE;
export { api };

/**
 * Fetches all records from a paginated endpoint by looping through pages.
 * Backend caps each page at 200; this keeps going until a short page is received.
 */
const fetchAllPages = async (endpoint, extraParams = {}) => {
  const PAGE_LIMIT = 200;
  let page = 1;
  let allData = [];

  while (true) {
    const res = await api.get(endpoint, { params: { page, limit: PAGE_LIMIT, ...extraParams } });
    const data = res.data || [];
    allData = allData.concat(data);
    if (data.length < PAGE_LIMIT) break; // last page reached
    page += 1;
  }

  // Return in the same shape as a normal axios response so callers stay unchanged
  return { data: allData };
};

export const getMembers = (params = {}) => fetchAllPages("/members", params);
export const createMember = (memberData) => api.post("/members", memberData);
export const updateMember = (id, data) => api.put(`/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/members/${id}`);

export const getFamilies = (params = {}) => fetchAllPages("/families", params);
export const createFamily = (data) => api.post("/families", data);
