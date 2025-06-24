import { create } from 'zustand';

interface Order {
  id: string;
  status: string;
  items: string[];
}

interface OrderState {
  orders: Order[];
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  fetchOrders: async () => {
    // TODO: 실제 API 연동
    set({ orders: [
      { id: '1', status: '제조중', items: ['아메리카노', '카페라떼'] },
      { id: '2', status: '준비완료', items: ['콜드브루'] },
    ] });
  },
}));
