import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens} from '../../components/UI/Themes/theme';
import { InputBase} from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  
  return (
  
  <Box display='flex'justifyContent='space-between' p={2}>
    
    {/* SEARCH BAR */}
    <Box 
      display='flex' 
      backgroundColor={colors.primary[400]} 
      borderRadius='3px'>

      <InputBase sx={{ml: 2, flex: 1}} placeholder='Search'></InputBase>
      <IconButton type='button' sx={{ p:1}}>
        <SearchIcon />
      </IconButton>
    </Box>

    {/* ICON */}
    <Box display='flex'>
    <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeRoundedIcon/>
        )}
      </IconButton>

      <IconButton>
        <EmailOutlinedIcon/>
      </IconButton>

      <IconButton>
        <CircleNotificationsIcon />
      </IconButton>
            
      <IconButton>
        <AccountCircleIcon />
      </IconButton>

    </Box>
  </Box>
  
)};

export default TopBar; 
