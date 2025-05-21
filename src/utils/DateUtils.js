export const getNext7Days = () => {
  const days = [];
  const today = new Date();
  const weekdayNames = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const label = weekdayNames[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const value = `${day}/${month}`;
    days.push({ label, value });
  }
  return days;
};
