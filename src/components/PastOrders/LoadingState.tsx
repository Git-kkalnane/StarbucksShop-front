import React from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

export const LoadingState: React.FC = () => (
  <Container
    sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <CircularProgress />
      <Typography>주문 내역을 불러오는 중입니다...</Typography>
    </Box>
  </Container>
);
