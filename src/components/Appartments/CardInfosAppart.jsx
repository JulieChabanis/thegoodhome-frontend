import React  from 'react';
import { Icon, Box, Typography, Grid, IconButton } from '@mui/material';
import { useLocation, useNavigate} from 'react-router-dom';
import Header from '../Global/Header';
import Carousel from 'react-material-ui-carousel'
// import AppartmentService from '../../api/AppartmentService';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';

const CardInfosAppart = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const selectedAppartment = location.state && location.state.appartment ? location.state.appartment : null;
if (!selectedAppartment) {
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
    <Box m='20px' key={selectedAppartment.id}>
      <Header
        title={`APPARTEMENT ${selectedAppartment.id}`}
        subtitle={`Informations sur l'appartement ${selectedAppartment.id}`}
      />
      <Grid ml='0px' mt="10px" container spacing={2}>
        <Grid item>
        <Carousel
          sx={{
            position: 'relative',
            width: 470,
            height: 'auto',
            '& img': {
              height: '100%',
              objectFit: 'contain',
              width: 500,
            },
          }}
        >
          {images}
        </Carousel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ ml: 2 }}>
            <Typography variant='h1' fontWeight='bold'>
              {selectedAppartment.title}
            </Typography>
            <Box sx={{ maxWidth: '80%', xs: { maxWidth: '100%' } }}>
              <Typography variant='body3'>
              {selectedAppartment.description}
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{flexDirection: 'row', m:1}}>
              <Box sx={{ display: 'flex', mt: 2, mr:2,  alignItems: 'start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Icon sx={{ alignItems:'start'}}>
                    <LocationOnOutlinedIcon />
                  </Icon>
                  <Typography variant='body1' fontWeight='bold'>Adresse</Typography>
                  <Typography variant='body1'>{selectedAppartment.address}</Typography>
                  <Typography variant='body1'>{selectedAppartment.additionalAddress}</Typography>
                  <Typography variant='body1' fontWeight='bold'>{selectedAppartment.city} • {selectedAppartment.zipcode}</Typography>
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
                  <Typography variant='body1' fontWeight='bold'>Loyer : {selectedAppartment.rental} € / CC </Typography>
                  <Typography variant='body1'>Charges : {selectedAppartment.rentalCharges} € incluses</Typography>
                  <Typography variant='body1'>Dépôt de garantie : {selectedAppartment.securityDeposit} €</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid ml='0px' mt="10px" container spacing={2}>
      <IconButton color='secondary' onClick={handleClickBack}>
            <EuroRoundedIcon />
          </IconButton>
      </Grid>
    </Box>
  );
}

export default CardInfosAppart;