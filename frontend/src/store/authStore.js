import { create } from "zustand";
import axios from "axios";
// zustand is a global state management library that allows you to create a store and manage state in a simple and efficient way. It is similar to Redux, but with a simpler API and less boilerplate code.

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true; // This line sets the default configuration for axios to include credentials (like cookies) in cross-origin requests. This is important for authentication, as it allows the server to recognize the user making the request.  

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error; 
    }
  },
}));
