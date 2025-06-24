import React from 'react';
import type { Order } from '../../types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

interface OrderInfoCardProps {
  order: Order;
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ order }) => {
  const formatPickupTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div" fontWeight="bold">
            주문번호: {order.orderNumber}
          </Typography>
          <OrderStatusBadge status={order.orderStatus} />
        </Box>
        
        <Box mb={2}>
          <Typography variant="body1" color="text.secondary">
            <strong>픽업 방식:</strong> {order.pickupType === 'IN_STORE' ? '매장 내 수령' : '테이크아웃'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>예상 픽업 시간:</strong> {formatPickupTime(order.orderExpectedPickupTime)}
          </Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body1">
            <strong>주문 금액:</strong> {order.orderTotalPrice.toLocaleString()}원
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="body1">
            <strong>매장:</strong> {order.store.name}
          </Typography>
          <Typography variant="body1">
            <strong>주문자:</strong> {order.member.name}
          </Typography>
          {order.orderRequestMemo && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              <strong>요청사항:</strong> {order.orderRequestMemo}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
