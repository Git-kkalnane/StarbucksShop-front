import { useAuthStore } from '../services/auth';

export function isAuthenticated() {
    const { accessToken } = useAuthStore.getState();
    return !!accessToken;
}
