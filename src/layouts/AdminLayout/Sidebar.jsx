import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Income', icon: <MoneyIcon />, path: '/admin/income' },
  { text: 'Vacations', icon: <BeachAccessIcon />, path: '/admin/vacations' },
  { text: 'Benefit', icon: <FavoriteIcon />, path: '/admin/benefit' },
];
  
const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={NavLink}
          to={item.path}
          sx={{
            '&.active': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;
