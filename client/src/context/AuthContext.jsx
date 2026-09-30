import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext(null);

// const API_BASE = "http://localhost:5000/api/auth";

// Configure axios to send cookies with every request
axios.defaults.withCredentials = true;

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor to attach token to every request
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(requestInterceptor);
  }, [accessToken]);

  // Set up response interceptor for automatic token refresh on 403
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const {data} = await axios.post(
              `${process.env.API_URL}/api/auth/refresh`,
            );
            setAccessToken(data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // Refresh failed — force sign out
            signOut();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(responseInterceptor);
  }, []);

  // Resolve loading state on mount
  useEffect(() => {
    setLoading(false);
  }, []);

  async function signIn(email, password) {
    const {data} = await axios.post(`${process.env.API_URL}/api/auth/signin`, {
      email,
      password,
    });

    setAccessToken(data.accessToken);
    setUser(data.user);
    localStorage.setItem("accessToken", data.accessToken);

    return data;
  }

  async function signOut() {
    try {
      await axios.post(`${process.env.API_URL}/api/auth/signout`);
    } catch {
      // ignore
    }
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
