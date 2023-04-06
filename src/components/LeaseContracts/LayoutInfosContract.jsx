import React from 'react'
import { Icon, Box, Typography, Grid, Stack, Button, useTheme } from '@mui/material';
import { useLocation, useNavigate} from 'react-router-dom';
import Header from '../Global/Header';
import Carousel from 'react-material-ui-carousel';
import { tokens } from "../UI/Themes/theme";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import CloseIcon from '@mui/icons-material/Close';
import Face2Icon from '@mui/icons-material/Face2';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

const LayoutInfosContract = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); 
  const navigate = useNavigate();
  const selectedContract = location.state && location.state.leaseContract ? location.state.leaseContract : null;
  if (!selectedContract) {
    return <div>Appartement non trouvé</div>;
  }

  const images = [
    <img key="bathroom" src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment11.JPG`} alt="bathroom" />,
    <img key="kitchen" src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment10.JPG`} alt="kitchen" />,
    <img key="room" src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment12.JPG`} alt="room" />
  ];

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Box m='20px' key={selectedContract.id}>
      <Header
        title={`CONTRAT NUMERO ${selectedContract.id}`}
        subtitle={`Informations sur le contrat de location de ${selectedContract.tenantEntity.name} ${selectedContract.tenantEntity.lastName}`}
      />
      <Stack alignItems='flex-start' m='20px'>
        <Button 
          variant='outlined'
          startIcon={<CloseIcon/>}
          onClick={handleClickBack}
          sx={{
            background: 'none',
            color: `${colors.green[400]} !important`, 
            fontWeight: 'bold',
            borderColor: `${colors.green[400]}!important`, 
            '&:hover': {
              background: `${colors.green[400]}!important`,
              color: `${colors.primary[500]}!important`, 
            }
          }}
          >
          Fermer la fiche
        </Button>
      </Stack>

      <Grid ml='0px' mt="10px" container spacing={2}>
        <Grid item>
        <Carousel
          sx={{
            position: 'relative',
            width: 300,
            height: 'auto',
            '& img': {
              height: '100%',
              objectFit: 'contain',
              width: 400,
            },
          }}
        >
          {images}
        </Carousel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ ml: 2 }}>
            <Typography variant='h1' fontWeight='bold'>
              {selectedContract.appartmentEntity.title}
            </Typography>
            <Box sx={{ maxWidth: '80%', xs: { maxWidth: '100%' } }}>
              <Typography variant='body3'>
              {selectedContract.appartmentEntity.description}
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{flexDirection: 'row', m:1}}>
              <Box sx={{ display: 'flex', mt: 2, mr:2,  alignItems: 'start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Icon sx={{ alignItems:'start'}}>
                    <LocationOnOutlinedIcon />
                  </Icon>
                  <Typography variant='body1' fontWeight='bold'>Adresse</Typography>
                  <Typography variant='body1'>{selectedContract.appartmentEntity.address}</Typography>
                  <Typography variant='body1'>{selectedContract.appartmentEntity.additionalAddress}</Typography>
                  <Typography variant='body1' fontWeight='bold'>{selectedContract.appartmentEntity.city} • {selectedContract.appartmentEntity.zipcode}</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mt: 2,  alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Icon sx={{ alignItems:'start'}}>
                    <EuroRoundedIcon />
                  </Icon>
                  <Typography variant='body1'>Frais de Location : </Typography>
                  <Typography variant='body1' fontWeight='bold'>Loyer : {selectedContract.appartmentEntity.rental} € / CC </Typography>
                  <Typography variant='body1'>Charges : {selectedContract.appartmentEntity.rentalCharges} € incluses</Typography>
                  <Typography variant='body1'>Dépôt de garantie : {selectedContract.appartmentEntity.securityDeposit} €</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box mt="20px">
        <Button
          variant='outlined'
          startIcon={<PictureAsPdfRoundedIcon />}
          sx={{
            ml: 2,
            mb: 1,
            background: 'none',
            color: `${colors.grey[100]} !important`, 
            fontWeight: 'bold',
            borderColor: `${colors.grey[100]}!important`, 
            '&:hover': {
              background: `${colors.grey[100]}!important`,
              color: `${colors.grey[800]}!important`, 
            }
          }}
        >
          Voir le Contrat de Bail
        </Button>
        <Button
          variant='outlined'
          startIcon={<PictureAsPdfRoundedIcon />}
          sx={{
            ml: 2,
            mb: 1,
            background: 'none',
            color: `${colors.grey[100]} !important`, 
            fontWeight: 'bold',
            borderColor: `${colors.grey[100]}!important`, 
            '&:hover': {
              background: `${colors.grey[100]}!important`,
              color: `${colors.grey[800]}!important`, 
            }
          }}
        >
          Quittances Loyer
        </Button>
      </Box>

      <Grid ml='0px' mt="10px" container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ ml: 2 }}>
          <Typography variant='h2' fontWeight='bold'>
              Infos sur le Locataire : 
          </Typography>
          </Box>  
            <Grid container spacing={2} sx={{flexDirection: 'row', m:1}}>
              <Box sx={{ display: 'flex', mr:2,  alignItems: 'start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                    <Icon sx={{ alignItems:'start', mb: 1}}>
                      <Face2Icon />
                    </Icon>
                    <Typography variant='body1' fontWeight='bold'>{selectedContract.tenantEntity.name} {selectedContract.tenantEntity.lastName}</Typography>
                    <Typography variant='body1'>Email : {selectedContract.tenantEntity.email}</Typography>
                    <Typography variant='body1'>Tel : {selectedContract.tenantEntity.phone}</Typography>
                  </Box>
              </Box>
              <Box sx={{ display: 'flex', mr:2,  alignItems: 'start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                    <Icon sx={{ alignItems:'start', mb: 1}}>
                      <AddCircleOutlineRoundedIcon  />
                    </Icon>
                    <Typography variant='body1' fontWeight='bold'>Solde :</Typography>
                    <Typography variant='body1'>Caution : {selectedContract.securityDepositAmount} €</Typography>
                    <Typography variant='body1'>Création du Bail : {selectedContract.createdAt}</Typography>
                  </Box>
              </Box>
            </Grid>
        </Grid>
      </Grid>

    </Box>
    
  )
}

export default LayoutInfosContract