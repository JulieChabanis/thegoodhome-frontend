import { Box } from "@mui/system"
import Header from "../Global/Header";

const Dashboard = () => {
  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='TABLEAU DE BORD' subtitle='Bienvenue sur votre espace' />
      </Box>
    </Box>
  );
};

export default Dashboard; 