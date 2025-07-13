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
import { updateOrderStatus, fetchOrderDetail } from '../services/orderService';

// 주문 상태 변경 실제 API 사용
// const handleChangeStatus = async () => {
//     if (!order) return;
//     setLoading(true);
//     try {
//         await updateOrderStatus(order.id, 'READY_FOR_PICKUP'); // 실제로는 새로운 상태 전달
//         // 상태 변경 후 다시 상세 조회로 최신 상태 반영
//         const updated = await fetchOrderDetail(order.id);
//         setOrder(updated);
//     } catch (err) {
//         setError('주문 상태 변경에 실패했습니다.');
//     } finally {
//         setLoading(false);
//     }
// };

function OrderDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    // const { order: shortOrderInfo } = location.state;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(`member name: ${order?.member}`);

    useEffect(() => {
        const loadOrder = async () => {
            // First check if order was passed in location state
            // if (location.state?.order) {
            //     setOrder(location.state.order);
            //     setLoading(false);
            //     return;
            // }

            // If not, try to fetch by ID
            if (id) {
                try {
                    setLoading(true);
                    const apiOrder = await fetchOrderDetail(id);
                    if (apiOrder) {
                        // Map API response to expected Order shape
                        const mappedOrder: Order = {
                            id: apiOrder.id,
                            orderNumber: apiOrder.orderNumber,
                            orderTotalPrice: apiOrder.orderTotalPrice,
                            orderStatus: apiOrder.orderStatus,
                            pickupType: apiOrder.pickupType === 'STORE_PICKUP' ? 'IN_STORE' : apiOrder.pickupType,
                            orderRequestMemo: apiOrder.orderRequestMemo ?? '',
                            orderExpectedPickupTime:
                                typeof apiOrder.orderExpectedPickupTime === 'string'
                                    ? new Date(apiOrder.orderExpectedPickupTime).getTime() / 1000
                                    : apiOrder.orderExpectedPickupTime,
                            store: { id: 0, name: apiOrder.storeName },
                            member: { id: 0, name: apiOrder.memberNickname },
                            orderItems: (apiOrder.orderItems || []).map((item: any, idx: number) => ({
                                id: idx + 1,
                                itemName: item.itemName,
                                orderItemQuantity: item.quantity,
                                itemPrice: item.itemPrice,
                                finalPrice: item.finalPrice,
                                options: [], // 옵션 정보가 없으면 빈 배열로
                            })),
                        };
                        setOrder(mappedOrder);
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
        let nextStatus: 'PREPARING' | 'READY_FOR_PICKUP' | null = null;
        if (order.orderStatus === 'PLACED') {
            nextStatus = 'PREPARING';
        } else if (order.orderStatus === 'PREPARING') {
            nextStatus = 'READY_FOR_PICKUP';
        }
        if (nextStatus) {
            try {
                const updated = await updateOrderStatus(order.id, nextStatus);
                setOrder((prev) => ({ ...prev!, orderStatus: nextStatus! }));
            } catch (e) {
                setError('상태 변경에 실패했습니다.');
            }
        }
        setLoading(false);
    };

    return (
        <Container sx={{ py: 6 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                뒤로가기
            </Button>

            <OrderInfoCard order={order} />
            <OrderItemList items={order.orderItems} />

            {(order.orderStatus === 'PLACED' || order.orderStatus === 'PREPARING') && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, gap: 16 }}>
                    <Button
                        variant="contained"
                        color={order.orderStatus === 'PLACED' ? 'primary' : 'success'}
                        onClick={handleChangeStatus}
                        disabled={loading}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        {loading
                            ? '변경 중...'
                            : order.orderStatus === 'PLACED'
                            ? '제조중으로 변경'
                            : '준비완료로 변경'}
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default OrderDetails;
