import type { Order, OrderStatus } from '../types/order';

const mockOrders: Order[] = [
    {
        id: 1,
        orderNumber: 202406241001,
        orderTotalPrice: 15500,
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
                        syrupName: '바닐라 시럽',
                        isRequired: true,
                        displayOrder: 1,
                        additionalPrice: 500,
                        quantity: 2,
                    },
                    {
                        id: 2,
                        syrupName: '샷 추가',
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
    {
        id: 2,
        orderNumber: 202406241002,
        orderTotalPrice: 5000,
        orderStatus: 'READY_FOR_PICKUP',
        pickupType: 'TAKEOUT',
        orderRequestMemo: '',
        orderExpectedPickupTime: Math.floor(Date.now() / 1000) + 3600, // 1시간 후
        store: { id: 2, name: '스타벅스 시청점' },
        member: { id: 2, name: '김철수' },
        orderItems: [
            {
                id: 3,
                itemName: '콜드브루',
                orderItemQuantity: 1,
                unitPrice: 5000,
                options: [
                    {
                        id: 3,
                        syrupName: '연하게',
                        isRequired: true,
                        displayOrder: 1,
                        additionalPrice: 0,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
];

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
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight={700} color="primary" mb={4}>
                진행중 주문
            </Typography>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {mockOrders.map((order) => (
                    <div key={order.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: 4, height: '100%' }}>
                            <CardContent>
                                <Typography fontWeight={700} fontSize={18} gutterBottom>
                                    주문번호: <span style={{ color: '#1976d2' }}>{order.orderNumber}</span>
                                </Typography>
                                <Chip
                                    label={`상태: ${getStatusLabel(order.orderStatus)}`}
                                    color={order.orderStatus === 'PREPARING' ? 'success' : 'primary'}
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Typography fontSize={14} color="text.secondary" mb={2}>
                                    {order.orderItems.map((item) => item.itemName).join(', ')}
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
                ))}
            </div>
        </Container>
    );
}
