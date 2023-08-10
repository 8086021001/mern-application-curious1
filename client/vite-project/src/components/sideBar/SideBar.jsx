import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const items = [
  { text: 'Your requests', icon: <DashboardIcon />, path: '/user/meetReq' },
  { text: 'chats', icon: <MailIcon />, path: '/user/chat' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/user/stories' },
];

const Sidebar = ({ sidebarWidth, appBarHeight, sidebarColor, textColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div style={{ position: 'absolute', left: 0, margin: '10px', padding: '10px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        style={{ width: sidebarWidth }}
      >
        <List style={{ backgroundColor: sidebarColor, height: `calc(100% - ${appBarHeight}px)` }}>
          {items.map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index}>
              <ListItemIcon style={{ color: textColor }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} style={{ color: textColor }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

    </>
  );
};

export default Sidebar;
