import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import type { Order } from '../types/order';
import { OrderInfoCard } from '../components/OrderDetails/OrderInfoCard';
import { OrderItemList } from '../components/OrderDetails/OrderItemList';

function mockChangeOrderStatus(order: Order): Promise<Order> {
    // Mock function to simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...order, orderStatus: 'READY_FOR_PICKUP' });
        }, 500);
    });
}

// Mock function to fetch order by ID (replace with actual API call)
async function fetchOrderById(orderId: string): Promise<Order | null> {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // This is just mock data - in a real app, you would fetch from your API
            const mockOrders: Order[] = [
                {
                    id: 100,
                    orderNumber: 202406241001,
                    orderTotalPrice: 12500,
                    orderStatus: 'PREPARING',
                    pickupType: 'IN_STORE',
                    orderRequestMemo: '빨대 빼주세요',
                    orderExpectedPickupTime: Math.floor(Date.now() / 1000) + 1800, // 30분 후
                    store: { id: 1, name: '스타벅스 강남점' },
                    member: { id: 1, name: '홍길동' },
                    orderItems: [
                        {
                            id: 1,
                            itemName: '아메리카노',
                            orderItemQuantity: 2,
                            unitPrice: 4500,
                            options: [
                                {
                                    id: 1,
                                    syrupName: '샷 추가',
                                    isRequired: true,
                                    displayOrder: 1,
                                    additionalPrice: 500,
                                    quantity: 2,
                                },
                                {
                                    id: 2,
                                    syrupName: '시럽 추가',
                                    isRequired: false,
                                    displayOrder: 2,
                                    additionalPrice: 500,
                                    quantity: 1,
                                },
                            ],
                        },
                        {
                            id: 2,
                            itemName: '치즈케이크',
                            orderItemQuantity: 1,
                            unitPrice: 3500,
                            options: [],
                        },
                    ],
                },
                // Add more mock orders as needed
            ];

            const foundOrder = mockOrders.find((order) => order.id.toString() === orderId) || null;
            resolve(foundOrder);
        }, 300);
    });
}

function OrderDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(`member name: ${order?.member}`);

    useEffect(() => {
        const loadOrder = async () => {
            // First check if order was passed in location state
            if (location.state?.order) {
                setOrder(location.state.order);
                setLoading(false);
                return;
            }

            // If not, try to fetch by ID
            if (id) {
                try {
                    setLoading(true);
                    const orderData = await fetchOrderById(id);
                    if (orderData) {
                        setOrder(orderData);
                    } else {
                        setError('주문을 찾을 수 없습니다.');
                    }
                } catch (err) {
                    console.error('Failed to fetch order:', err);
                    setError('주문을 불러오는 중 오류가 발생했습니다.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('유효하지 않은 주문 ID입니다.');
                setLoading(false);
            }
        };

        loadOrder();
    }, [id, location.state]);

    if (loading) {
        return (
            <Container
                sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress />
                    <Typography>주문 정보를 불러오는 중입니다...</Typography>
                </Box>
            </Container>
        );
    }

    if (error || !order) {
        return (
            <Container sx={{ py: 5, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    {error || '주문을 찾을 수 없습니다.'}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/past-orders')}
                    sx={{ mt: 2, mr: 1 }}
                >
                    주문 목록으로
                </Button>
                <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    홈으로
                </Button>
            </Container>
        );
    }

    const handleChangeStatus = async () => {
        if (!order) return;
        setLoading(true);
        const updated = await mockChangeOrderStatus(order);
        setOrder(updated);
        setLoading(false);
    };

    return (
        <Container sx={{ py: 6 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                뒤로가기
            </Button>

            <OrderInfoCard order={order} />
            <OrderItemList items={order.orderItems} />

            {order.orderStatus === 'PREPARING' && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, gap: 16 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleChangeStatus}
                        disabled={loading}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        {loading ? '변경 중...' : '준비완료로 변경'}
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default OrderDetails;
