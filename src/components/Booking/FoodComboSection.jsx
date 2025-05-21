import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FoodComboSection = ({ onUpdateTotal, onUpdateCombos }) => {
  const [quantities, setQuantities] = useState({
    lightstick: 0,
    blindbox1: 0,
    blindbox2: 0,
    capybara: 0,
    combo2big: 0,
    combo2bigextra: 0,
  });

  const handleIncrease = (item) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev, [item]: prev[item] + 1 };
      updateTotals(newQuantities);
      return newQuantities;
    });
  };

  const handleDecrease = (item) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev, [item]: Math.max(0, prev[item] - 1) };
      updateTotals(newQuantities);
      return newQuantities;
    });
  };

  const updateTotals = (quantities) => {
    const prices = {
      lightstick: 60000,
      blindbox1: 300000,
      blindbox2: 150000,
      capybara: 350000,
      combo2big: 109000,
      combo2bigextra: 139000,
    };
    const total = Object.keys(quantities).reduce((sum, item) => sum + quantities[item] * prices[item], 0);
    const selectedCombos = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([item, qty]) => ({ id: item, quantity: qty, price: prices[item] }));
    if (onUpdateTotal) onUpdateTotal(total);
    if (onUpdateCombos) onUpdateCombos(selectedCombos);
  };

  useEffect(() => {
    updateTotals(quantities);
  }, [quantities]);

  const combos = [
    {
      id: 'capybara',
      image: 'https://cdn.galaxycine.vn/media/2025/4/29/capybara-app-co-online-min_1745917429070.jpg',
      title: 'Capybara Set',
      description: 'Capybara lười biếng, đắt tay với đồ ăn, thức uống 1 bắp ngô và 1 nước size L tặng kèm nón.',
      price: '350.000 đ',
    },
    {
      id: 'combo2big',
      image: 'https://cdn.galaxycine.vn/media/2025/4/11/combo-2-big-1920x1320_1744354864910.jpg',
      title: 'Combo 2 Big',
      description: 'Nhân đôi sự sảng khoái! Combo 2 gồm 1 bắp rang bơ đậm, 2 Pepsi lạnh - tiết kiệm hơn 28.000!',
      price: '109.000 đ',
    },
    {
      id: 'combo2bigextra',
      image: 'https://cdn.galaxycine.vn/media/2025/4/11/combo-2-big-extra-1920x1320_1744354872856.jpg',
      title: 'Combo 2 Big Extra',
      description: 'Nhân đôi sự sảng khoái! Combo 2 gồm 1 bắp rang bơ đậm, 2 Pepsi lạnh và 1 snack tùy chọn - tiết kiệm hơn 33.000!',
      price: '139.000 đ',
    },
  ];

  return (
    <Box sx={{ p: 2, bgcolor: '#fff' }}>
      <Typography variant="h6" sx={{ fontWeight: '200', color: '#1e88e5', mb: 2 }}>
        Chọn Combo / Sản phẩm
      </Typography>
      {combos.map((combo) => (
        <Paper key={combo.id} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', borderRadius: 1, boxShadow: 1 }}>
          <Box
            component="img"
            src={combo.image}
            alt={combo.title}
            sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2, borderRadius: 4 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {combo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {combo.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Giá: {combo.price}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton
              size="small"
              onClick={() => handleDecrease(combo.id)}
              disabled={quantities[combo.id] === 0}
              sx={{ color: '#1e88e5' }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{quantities[combo.id]}</Typography>
            <IconButton
              size="small"
              onClick={() => handleIncrease(combo.id)}
              sx={{ color: '#1e88e5' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default FoodComboSection;