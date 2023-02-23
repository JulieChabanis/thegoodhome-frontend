import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from '../UI/Themes/theme'; 

const Requests = ({title}) => {
  const theme = useTheme(); 
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography
      variant='h5'
      color={colors.blue[400]}
      fontWeight='bold'    
      sx={{ m: "0 0 5px 0"}} 
      >{title}
      </Typography>
      <Button variant="outlined">Outlined</Button>
    </Box>
  )
};

export default Requests;