import { useAuthStore } from '../services/auth';

export async function apiFetch<T>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
    const { accessToken } = useAuthStore.getState();
    const headers = {
        ...(init.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        'Content-Type': 'application/json',
    };
    const res = await fetch(input, { ...init, headers });
    if (!res.ok) throw new Error('API Error');
    return res.json();
}
