import React from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../../types/order';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Date(timestamp * 1000).toLocaleDateString('ko-KR', options);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: order.orderStatus === 'CANCELLED' ? '4px solid #ff4444' : '4px solid #4caf50',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography fontWeight={700} fontSize={18}>
            주문 #{order.orderNumber}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: order.orderStatus === 'CANCELLED' ? 'error.light' : 'success.light',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {order.orderStatus === 'CANCELLED' ? '주문 취소' : '주문 완료'}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          {formatDate(order.orderExpectedPickupTime)}
        </Typography>
        <Typography variant="body1" paragraph>
          {order.orderItems.map((item) => item.itemName).join(', ')}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
          <Typography variant="h6" fontWeight={700}>
            {order.orderTotalPrice.toLocaleString()}원
          </Typography>
          <Button
            component={Link}
            to={`/orders/${order.id}`}
            state={{ order }}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            상세 보기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
