import { useState, useEffect, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import { default as MuiGrid } from '@mui/material/Grid';

import type { Order } from '../types/order';
import { OrderCard } from '../components/PastOrders/OrderCard';
import { LoadingState } from '../components/PastOrders/LoadingState';
import { ErrorState } from '../components/PastOrders/ErrorState';
import { EmptyState } from '../components/PastOrders/EmptyState';

// Mock API function
const fetchPastOrders = async (): Promise<Order[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const now = Math.floor(Date.now() / 1000);
            const mockOrders: Order[] = [
                {
                    id: 100,
                    orderNumber: 202406241001,
                    orderTotalPrice: 8500,
                    orderStatus: 'COMPLETED',
                    pickupType: 'IN_STORE',
                    orderRequestMemo: '얼음 많이 주세요',
                    orderExpectedPickupTime: now - 86400 * 7, // 7일 전
                    store: { id: 1, name: '스타벅스 강남점' },
                    member: { id: 1, name: '홍길동' },
                    orderItems: [
                        {
                            id: 1,
                            itemName: '카푸치노',
                            orderItemQuantity: 1,
                            itemPrice: 4500,
                            options: [],
                        },
                        {
                            id: 2,
                            itemName: '에스프레소',
                            orderItemQuantity: 1,
                            itemPrice: 4000,
                            options: [],
                        },
                    ],
                },
                {
                    id: 101,
                    orderNumber: 202406241002,
                    orderTotalPrice: 5000,
                    orderStatus: 'CANCELLED',
                    pickupType: 'TAKEOUT',
                    orderRequestMemo: '뜨거운 음료로 주세요',
                    orderExpectedPickupTime: now - 86400 * 3, // 3일 전
                    store: { id: 2, name: '스타벅스 역삼점' },
                    member: { id: 1, name: '홍길동' },
                    orderItems: [
                        {
                            id: 3,
                            itemName: '아이스 아메리카노',
                            orderItemQuantity: 1,
                            itemPrice: 4500,
                            options: [
                                {
                                    id: 1,
                                    syrupName: '샷 추가',
                                    isRequired: true,
                                    displayOrder: 1,
                                    additionalPrice: 500,
                                    quantity: 1,
                                },
                            ],
                        },
                    ],
                },
            ];
            resolve(mockOrders);
        }, 800); // 0.8초 지연
    });
};

const PastOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchPastOrders();
            setOrders(data);
            setError(null);
        } catch (err) {
            setError('주문 내역을 불러오는 중 오류가 발생했습니다.');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} onRetry={loadOrders} />;
    }

    if (orders.length === 0) {
        return <EmptyState />;
    }

    return (
        <Container sx={{ py: 6 }}>
            <Box sx={{ flexGrow: 1 }}>
                <MuiGrid container spacing={3}>
                    {orders.map((order) => (
                        <MuiGrid key={order.id} component="div" {...{ xs: 12, sm: 6, md: 4 }}>
                            <OrderCard order={order} />
                        </MuiGrid>
                    ))}
                </MuiGrid>
            </Box>
        </Container>
    );
};

export default PastOrders;
