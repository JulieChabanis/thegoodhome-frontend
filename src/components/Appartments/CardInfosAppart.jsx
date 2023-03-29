import React, { useState, useEffect } from 'react';
import { Icon, useTheme, Box, Typography, Grid, Stack, Divider } from '@mui/material';
import Header from '../Global/Header';
import Carousel from 'react-material-ui-carousel'
import AppartmentService from '../../api/AppartmentService';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';

const CardInfosAppart = ({ id }) => {
  const [appartment, setAppartment] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    AppartmentService.getAppartmentById(id)
      .then(data => {
        setAppartment(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [id]);

  const images = [
      <img src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment11.JPG`} alt="bathroom" />,
      <img src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment10.JPG`} alt="kitchen" />,
      <img src={`${process.env.PUBLIC_URL}/static/images/appartments/appartment12.JPG`} alt="room" />
  ];

  return (
    <Box m='20px'>
      <Header
        title={`APPARTEMENT ${id}`}
        subtitle={`Informations sur l'appartement ${id}`}
      />
      <Grid ml='0px' mt="10px" container spacing={2} >
        <Grid>
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
              Penthouse 80m²
            </Typography>
            <Box sx={{ maxWidth: '80%', xs: { maxWidth: '100%' } }}>
              <Typography variant='body3'>
                p tiodn escri ptiodnes cript iod nescrip tiodne sc ript iodnes
                cript iodnescriptio dn escrip tiodnes cript iodn escriptiodne scri
                ptiodnescrip tiodn escri ptiodnes cript iod nescrip tiodne sc ript
                iodnes cript io
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{flexDirection: 'row', m:1}}>
              <Box sx={{ display: 'flex', mt: 2, mr:2,  alignItems: 'start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Icon sx={{ alignItems:'start'}}>
                    <LocationOnOutlinedIcon />
                  </Icon>
                  <Typography variant='body1' fontWeight='bold'>Adresse</Typography>
                  <Typography variant='body1'>80 Rue de la Ratatouille</Typography>
                  <Typography variant='body1'>Boulevard Léon</Typography>
                  <Typography variant='body1' fontWeight='bold'>Paris • 75000</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mt: 2,  alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                  <Icon sx={{ alignItems:'start'}}>
                    <EuroRoundedIcon />
                  </Icon>
                  <Typography variant='body1' fontWeight='bold'>Frais de Location</Typography>
                  <Typography variant='body1' fontWeight='bold'>Loyer : 1200 € / Charges comprises </Typography>
                  <Typography variant='body1'>Charges : 200 € incluses</Typography>
                  <Typography variant='body1'>Dépôt de garantie : 1400 €</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid ml='0px' mt="10px" container spacing={2}>
      </Grid>
    </Box>
  );
}

export default CardInfosAppart;