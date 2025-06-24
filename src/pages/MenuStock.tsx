import { useState } from 'react';

const mockMenu = [
  { id: 'm1', name: '아메리카노', stock: 10 },
  { id: 'm2', name: '카페라떼', stock: 5 },
  { id: 'm3', name: '콜드브루', stock: 8 },
];

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function MenuStock() {
  const [menu, setMenu] = useState(mockMenu);
  const adjustStock = (id: string, delta: number) => {
    setMenu(menu => menu.map(m => m.id === id ? { ...m, stock: Math.max(0, m.stock + delta) } : m));
  };
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} color="primary" mb={4}>
        메뉴 재고 관리
      </Typography>
      <Grid container spacing={3}>
        {menu.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardContent>
                <Typography fontWeight={700} fontSize={18} color="primary.main" gutterBottom>
                  {item.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => adjustStock(item.id, -1)}
                    sx={{ minWidth: 36, fontWeight: 700 }}
                  >
                    -
                  </Button>
                  <Typography fontWeight={700} fontSize={20} color="success.main" sx={{ minWidth: 32, textAlign: 'center' }}>
                    {item.stock}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => adjustStock(item.id, 1)}
                    sx={{ minWidth: 36, fontWeight: 700 }}
                  >
                    +
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
