import { useState } from "react";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme} from '@mui/material'; 
import { Link } from 'react-router-dom';
import { tokens } from "../UI/Themes/theme";
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Image from 'react-bootstrap/Image';

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
        '&.pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        }, 
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        }, 
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebarProvider collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onDoubleClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ChairRoundedIcon /> : undefined}     
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
                ml='15px'
              >
                <Typography variant='h3' color={colors.grey[100]}>
                    ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  < MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
            {!isCollapsed && (
              <Box mb='25px'>
                <Box 
                  diplay='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Image
                    className="rounded-circle mx-auto d-block"
                    alt='profile-user'
                    width='100px'
                    height='100px'
                    src={`../../assets/user.jpg`}
                    style={{ cursor: 'pointer'}}
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
                title='Locations'
                to='/'
                icon={<CottageRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                Bonjour
              </Typography>
              <Item
                title='Locataires'
                to="/tenants"
                icon={<FaceRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Locataires'
                to="/tenants"
                icon={<FaceRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Locataires'
                to="/tenants"
                icon={<FaceRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <Typography
                variant='h6'
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                Suivi des dossiers
              </Typography>
              <Item
                title='Locataires'
                to="/tenants"
                icon={<ChairOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Dossiers'
                to="/tenants"
                icon={<FaceRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebarProvider>
    </Box>
  ); 
}; 

export default Sidebar; 