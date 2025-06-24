import React from 'react';
import Chip from '@mui/material/Chip';
import type { OrderStatus } from '../../types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'PLACED':
        return '주문완료';
      case 'PREPARING':
        return '제조중';
      case 'READY_FOR_PICKUP':
        return '준비완료';
      case 'COMPLETED':
        return '픽업완료';
      case 'CANCELLED':
        return '취소됨';
      default:
        return status;
    }
  };

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

  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size="small"
    />
  );
};
