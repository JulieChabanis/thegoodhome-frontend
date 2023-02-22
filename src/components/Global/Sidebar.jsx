import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme} from '@mui/material'; 
import { Link } from 'react-router-dom';
import { tokens } from '../../components/UI/Themes/theme';
import "react-pro-sidebar/dist/css/styles.css";

// Import MUI icons
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Item = ({ title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  return (
    <MenuItem 
      active={selected === title}
      style={{
        color: colors.grey[100]
    }}
    onClick={() => setSelected(title)}
    icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        }, 
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 20px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        }, 
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onDoubleClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? < MenuOutlinedIcon /> : undefined}     
            style={{
              margin: '10px 0 20 px 0', 
              color: colors.grey[100], 
            }}       
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='10px'
              >
                <Typography variant='h3' color={colors.grey[100]}>
                    LOGO
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  < MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
                <Box textAlign='center'>
                  <Typography 
                    variant='h2' 
                    color={colors.grey[100]} 
                    fontWeight='bold' 
                    sx={{ m: '10px 0 0 0'}}
                  >
                    Name Agence
                  </Typography>
                  <Typography variant='h5'color={colors.green[500]}>
                    Name User
                  </Typography>
                </Box>
              </Box>
            )}

            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Item
                title='Dashboard'
                to='/'
                icon={<DashboardCustomizeRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                Gestion
              </Typography>
              <Item
                title='Locataires'
                to="/tenants"
                icon={<FaceRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Appartements'
                to="/tenants"
                icon={<CottageOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Dossiers'
                to="/tenants"
                icon={<FolderSharedOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                Planning
              </Typography>
              <Item
                title='Calendrier'
                to="/tenants"
                icon={<CalendarMonthRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Paramètres'
                to="/tenants"
                icon={<SettingsRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
    </Box>
  ); 
}; 

export default Sidebar; 