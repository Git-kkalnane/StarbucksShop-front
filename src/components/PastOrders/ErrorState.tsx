import React from 'react';
import { Container, Typography, Button } from '@mui/material';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <Container sx={{ py: 5, textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom color="error">
      오류가 발생했습니다
    </Typography>
    <Typography color="error" gutterBottom>
      {error}
    </Typography>
    <Button variant="contained" color="primary" onClick={onRetry} sx={{ mt: 2 }}>
      다시 시도
    </Button>
  </Container>
);
