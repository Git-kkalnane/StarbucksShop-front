// src/services/orderService.ts
import api from './api';

// 현재 진행중인 주문 목록 조회
export async function fetchCurrentOrders() {
    const res = await api.get('/merchant/orders/current');
    // 성공 시: res.data.result (List<StoreCurrentOrderResponse>)
    return res.data.result;
}

// 특정 주문 상세 조회
export async function fetchOrderDetail(orderId: number | string) {
    const res = await api.get(`/merchant/orders/${orderId}`);
    // 성공 시: res.data.result (StoreOrderDetailResponse)
    console.log('fetchOrderDetail res.data', res.data);
    return res.data.result;
}

// 과거 주문 내역(완료/취소) 페이징 조회
export async function fetchOrderHistory(page = 0, size = 15) {
    const res = await api.get('/merchant/orders/history', {
        params: { page, size },
    });
    // 성공 시: res.data.result (StoreOrderHistoryListResponse)
    return res.data.result;
}

// 주문 상태 변경
export async function updateOrderStatus(orderId: number | string, newStatus: string) {
    const res = await api.patch(`/merchant/orders/${orderId}/status`, {
        newStatus,
    });
    // 성공 시: res.data.result or void
    return res.data.result;
}
