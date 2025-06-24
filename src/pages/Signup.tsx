import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('회원가입 요청됨 (API 연동 필요)');
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Card sx={{ minWidth: 340, maxWidth: 400, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="primary" align="center" gutterBottom>
            회원가입
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
              autoComplete="new-password"
              size="medium"
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
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
              sx={{ fontWeight: 700, py: 1.2, mt: 1 }}
              size="large"
            >
              회원가입
            </Button>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>
                로그인
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
