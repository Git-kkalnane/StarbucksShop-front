// src/services/api.ts
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Storage } from '../store/storage';

// Placeholder for starbucksStorage (replace with real implementation)
interface StarbucksStorage {
    getAccessToken: () => string | null;
}
// You must replace this import with your actual implementation
export const starbucksStorage: StarbucksStorage = {
    getAccessToken: () => Storage.getAccessToken(), // placeholder
};

// Placeholder for AuthService (replace with real implementation)
interface AuthServiceType {
    setAuthToken: (token: string) => void;
    clearAuth: () => void;
}
// You must replace this import with your actual implementation
const AuthService: AuthServiceType = {
    setAuthToken: (_token: string) => {},
    clearAuth: () => {},
};

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api: AxiosInstance = axios.create({
    baseURL: URL + API_VERSION,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config: import('axios').InternalAxiosRequestConfig) => {
        const token = Storage.getAccessToken();
        console.log(`token: ${token}`);
        if (token && config.headers) {
            (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// // 응답 인터셉터: 401 에러 처리00
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     // 401 에러이고, 재시도한 요청이 아닌 경우
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // 리프레시 토큰으로 액세스 토큰 갱신 시도
//         const response = await api.post('/auth/reissue-access-token', {}, { withCredentials: true });
//         const authHeader = response.headers['authorization'];

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//           throw new Error('No access token found in response');
//         }
//         const accessToken = authHeader.split(' ')[1];

//         AuthService.setAuthToken(accessToken);

//         // 원래 요청을 새로운 토큰으로 재시도
//         if (originalRequest.headers) {
//           (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
//         }
//         return api(originalRequest);
//       } catch (refreshError) {
//         // 리프레시 토큰도 만료된 경우 로그아웃 처리
//         AuthService.clearAuth();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default api;
