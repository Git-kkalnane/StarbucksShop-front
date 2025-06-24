import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!!useAuthStore.getState().accessToken) {
      navigate('/');
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Card sx={{ minWidth: 340, maxWidth: 380, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="primary" align="center" gutterBottom>
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="이메일"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              size="medium"
            />
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              size="medium"
            />
            {error && (
              <Typography color="error" fontSize={14} align="center">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ fontWeight: 700, py: 1.2, mt: 1 }}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              계정이 없으신가요?{' '}
              <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                회원가입
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
