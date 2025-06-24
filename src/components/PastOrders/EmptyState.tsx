import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const EmptyState: React.FC = () => (
  <Container sx={{ py: 5, textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom>
      주문 내역이 없습니다.
    </Typography>
    <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
      메인으로 가기
    </Button>
  </Container>
);
