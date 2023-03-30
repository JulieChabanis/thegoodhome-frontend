import React, { useState, useEffect } from 'react';
import AppartmentService from '../../api/AppartmentService';
import { useNavigate } from 'react-router-dom';
import Header from '../Global/Header';
import { Box,Pagination, Grid, CardActions, Card, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import AddAppartmentButton from './AddAppartmentButton';
import { useMediaQuery } from '@mui/material';

function AppartmentsList() {
  const [appartments, setAppartments] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const isMd = useMediaQuery("(max-width:1200px)")
  const isXsOrSm = useMediaQuery("(max-width:1000px)")
  const appartmentsPerPage = isXsOrSm ? 2 : isMd ? 6 : 8;


  useEffect(() => {
    getAppartments();
  }, []);

  // GET Appartments List
  const getAppartments = () => {
    AppartmentService.getAppartments()
      .then(response => {
        setAppartments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClickCard = (id) => {
    const selectedAppartment = appartments.find((appartment) => appartment.id === id);
    console.log('Selected appartment:', selectedAppartment);
    navigate(`/appartments/${selectedAppartment.id}`, { state: { appartment: selectedAppartment } });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  }; 

  const startIndex = (page - 1) * appartmentsPerPage;
  const endIndex = startIndex + appartmentsPerPage;
  const currentAppartments = appartments.slice(startIndex, endIndex);

  return (
    <Box m='20px'>
      <Box display='flex' flexDirection='column'>
      <Header title='APPARTMENTS' subtitle='Gestion des appartements' />
      <AddAppartmentButton />
      </Box>
      <Box m='15px 0 0 0'>
        <Grid container spacing={2}>
          {currentAppartments.map(appartment => (
            <Grid item xs={isXsOrSm ? 6 : 8} sm={isXsOrSm ? 6 : 8} md={isMd ? 4 : 8} lg={3} key={appartment.id}>
              <Card elevation={4} sx={{ minHeight:'100px', maxWidth:'410px', minWidth:'150px'}}>
                <CardMedia
                  component='img'
                  height='110'
                  image='https://picsum.photos/600'
                />
                <CardContent sx={{ maxHeight:'130px'}}>
                  <Typography variant='body2' color='text.secondary'>
                    {appartment.city}
                  </Typography>
                  <Typography variant='h4' color='text.primary'>
                    {appartment.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {appartment.address}
                  </Typography>
                  <Typography variant='h5' color='text.primary'>
                    {appartment.rental} €
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color='secondary' onClick={() => handleClickCard(appartment.id)}>
                    <PreviewRoundedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
     <Pagination
        count={Math.ceil(appartments.length / appartmentsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}

      />
    </Box>
  );
}

export default AppartmentsList;