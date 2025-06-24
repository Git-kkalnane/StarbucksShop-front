import { useAuthStore } from '../store/auth';

export function isAuthenticated() {
  const { accessToken } = useAuthStore.getState();
  return !!accessToken;
}
