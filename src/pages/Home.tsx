import type { Order, OrderStatus } from '../types/order';

import { useEffect, useState } from 'react';
import { fetchCurrentOrders } from '../services/orderService';

const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
        case 'PREPARING':
            return '제조중';
        case 'READY_FOR_PICKUP':
            return '준비완료';
        case 'PLACED':
            return '주문접수';
        case 'COMPLETED':
            return '완료';
        case 'CANCELLED':
            return '취소';
        default:
            return status;
    }
};

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

export default function Home() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'PREPARING':
                return 'warning';
            case 'READY_FOR_PICKUP':
                return 'success';
            case 'COMPLETED':
                return 'info';
            case 'CANCELLED':
                return 'error';
            default:
                return 'primary';
        }
    };

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const data = await fetchCurrentOrders();
                setOrders(data || []);
                setError(null);
            } catch (err) {
                setError('주문 목록을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

    if (loading) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography>주문 목록을 불러오는 중입니다...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight={700} color="primary" mb={4}>
                진행중 주문
            </Typography>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {orders.length === 0 ? (
                    <Typography>진행중인 주문이 없습니다.</Typography>
                ) : (
                    orders.map((order) => (
                        <div key={order.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 4, height: '100%' }}>
                                <CardContent>
                                    <Typography fontWeight={700} fontSize={18} gutterBottom>
                                        주문번호: <span style={{ color: '#1976d2' }}>{order.orderNumber}</span>
                                    </Typography>
                                    <Chip
                                        label={`상태: ${getStatusLabel(order.orderStatus)}`}
                                        color={getStatusColor(order.orderStatus)}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography fontSize={14} color="text.secondary" mb={2}>
                                        {order.orderItems?.map((item: any) => item.itemName).join(', ')}
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to={`/orders/${order.id}`}
                                        state={{ order }}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ fontWeight: 700 }}
                                    >
                                        상세보기
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </Container>
    );
}
