import React, { useState, useEffect } from 'react';
import AppartmentService from '../../api/AppartmentService';
import Header from '../Global/Header';
import { Box, Grid,CardActions, Card, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import AddAppartmentButton from './AddAppartmentButton';
function AppartmentsList() {
  const [appartments, setAppartments] = useState([]);

  useEffect(() => {
    getAppartments();
  }, []);

  // GET Appartments List
  const getAppartments = () => {
    AppartmentService.getAppartments()
      .then(response => {
        const sortedAppartments = response.data.sort((a, b) => b.dateAdded - a.dateAdded);
        setAppartments(sortedAppartments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box m='20px'>
      <Header title='APPARTMENTS' subtitle='Gestion des appartements' />
      {/* Add Button for add new appartment */}
      <Box>
        <AddAppartmentButton />
      </Box>
      <Box m='20px 0 40px 0' height='50vh'>
        <Grid container spacing={3}>
          {appartments.map(appartment => (
            <Grid item xs={6} sm={5} md={4} lg={3} key={appartment.id}>
              <Card elevation={4}>
                <CardMedia
                  component='img'
                  height='200'
                  image='https://picsum.photos/600'
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {appartment.city}
                  </Typography>
                  <Typography variant='h4' color='text.primary'>
                    {appartment.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {appartment.description}
                  </Typography>
                  <Typography variant='h5' color='text.primary'>
                    {appartment.rental} €
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color='secondary'>
                    <PreviewRoundedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AppartmentsList;