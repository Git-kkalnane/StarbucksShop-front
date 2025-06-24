import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // 실제 API 연동 필요. 데모용 목로그인
      await new Promise((res) => setTimeout(res, 500));
      if (email === 'demo@shop.com' && password === '1234') {
        set({ accessToken: 'demo-access', refreshToken: 'demo-refresh', isLoading: false });
      } else {
        set({ error: '로그인 실패: 아이디 또는 비밀번호 오류', isLoading: false });
      }
    } catch {
      set({ error: '로그인 실패', isLoading: false });
    }
  },
  logout: () => set({ accessToken: null, refreshToken: null }),
}));
