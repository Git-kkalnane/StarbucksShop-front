import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HistoryIcon from '@mui/icons-material/History';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const isLoggedIn = !!useAuthStore((s) => s.accessToken);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
      <Toolbar>
        <StorefrontIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, flexGrow: 1 }}>
          매장주문
        </Typography>
        <Button color="inherit" startIcon={<HistoryIcon />} component={RouterLink} to="/past-orders">
          과거주문
        </Button>
        <Button color="inherit" startIcon={<InventoryIcon />} component={RouterLink} to="/menu-stock">
          재고관리
        </Button>
        {isLoggedIn && (
          <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
