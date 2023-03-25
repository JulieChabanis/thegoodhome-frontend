import React, { useState, useEffect} from 'react'; 
import AppartmentService from '../../api/AppartmentService';
import Header from '../Global/Header';
import { Box, Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

// import add New Appartment Button
// import AddAppartmentButton from './AddAppartmentButton';



function AppartmentsList() {
  const [appartments, setAppartments] = useState([]); 

  useEffect(() => {
    getAppartments()
  }, []); 

  // GET Appartments List
  const getAppartments = () => {
    AppartmentService.getAppartments()
    .then(response => {
      setAppartments(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <Box m='20px'>
      <Header
      title="APPARTMENTS"
      subtitle="Gestion des appartements"
       />
      {/*Add Button for add new appartment*/}
      <Grid container spacing={2}>
        {appartments.map(appartment => (
          <Grid item xs={12} sm={6} md={4} key={appartment.id}>
            <Card>
              <CardHeader
                title={appartment.name}
              />
              <CardMedia
                component="img"
                height="200"
                image={appartment.image}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {appartment.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {appartment.rental} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  )

}

export default AppartmentsList;