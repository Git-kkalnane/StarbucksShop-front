import { create } from 'zustand';
import api from './api';
import { Storage } from '../store/storage';
import type { UserType } from '../store/storage';

interface AuthState {
    accessToken: string | null;
    user: UserType;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: Storage.getAccessToken(),
    user: Storage.getUser(),
    isLoading: false,
    error: null,
    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post('/merchant/auth/login', { email, password });
            // 토큰은 헤더에서, 유저 정보는 body.result에서 받음
            const accessToken = res.headers['authorization']?.replace('Bearer ', '') || '';
            const user = res.data?.result;
            Storage.setAccessToken(accessToken);
            Storage.setUser(user);
            set({ accessToken, user, isLoading: false });
        } catch (e: any) {
            let msg = '로그인 실패';
            if (e?.response?.status === 404) msg = '존재하지 않는 이메일이거나 비밀번호가 틀렸습니다.';
            if (e?.response?.status === 400) msg = '요청 데이터 유효성 오류';
            set({ error: msg, isLoading: false });
        }
    },
    logout: () => {
        Storage.clearAll();
        set({ accessToken: null, user: null });
    },
}));
