import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Global/Header";
import { tokens } from "../UI/Themes/theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='TABLEAU DE BORD' subtitle='Bienvenue sur votre espace' />
      <Box>
        <Button
          sx={{
            backgroundColor: colors.blue[700],
            color: colors.grey[100], 
            fontSize: "14px", 
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Télécharger le Rapport
        </Button>
      </Box>
      </Box>

      {/*GRID CARD LAYOUT ROW1 */}
      <Typography
        sx={{ fontWeight: "bold", fontSize: "30px", color: colors.primary[400] }}
      >
        ROADMAP
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRow="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          minHeight={150}
          justifyContent="center"
          borderRadius="3px"
        >
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          minHeight={150}
          justifyContent="center"
          borderRadius="3px"
        >
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          minHeight={150}
          justifyContent="center"
          borderRadius="3px"
        >
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          minHeight={150}
          justifyContent="center"
          borderRadius="3px"
        >
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 