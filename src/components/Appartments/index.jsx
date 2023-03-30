import React, { useState, useEffect } from 'react';
import AppartmentService from '../../api/AppartmentService';
import { useNavigate } from 'react-router-dom';
import Header from '../Global/Header';
import { Box,Pagination, Grid, CardActions, Card, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import AddAppartmentButton from './AddAppartmentButton';
import { useMediaQuery } from '@mui/material';

import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

function AppartmentsList() {
  const [appartments, setAppartments] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [appartmentToEdit, setAppartmentsToEdit] = useState({ title: '', description: '', address: '', additionalAddres: '', city: '', zipcode: '', rental: '', rentalCharges: '', securityDeposit: '',  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingAppartmentId, setEditingAppartmentId] = useState(null);
  // Generate Breackpoints 
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

  // Open Card Appartment by ID
  const handleClickCard = (id) => {
    const selectedAppartment = appartments.find((appartment) => appartment.id === id);
    console.log('Selected appartment:', selectedAppartment);
    navigate(`/appartments/${selectedAppartment.id}`, { state: { appartment: selectedAppartment } });
  };

  // Change Page Pagination
  const handleChangePage = (event, value) => {
    setPage(value);
  }; 

  // EDIT Appartment from List
  const handleEditClick = (id) => () => {
    const appartment = appartments.find((appartment) => appartment.id === id); 
    setEditingAppartmentId(id); 
    setAppartmentsToEdit({...appartment});
    setOpenEditDialog(true); 
  };

  const handleEditConfirm = () => {
    AppartmentService.updateAppartment(editingAppartmentId, appartmentToEdit)
    .then ((response) => {
      const updatedAppartment = response.data;
      setAppartments(appartments.map((appartment) => 
      (appartment.id === updatedAppartment.id ? updatedAppartment : appartment)));
      setOpenEditDialog(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleEditChange = (event) => {
    const { name, value} = event.target; 
    setAppartmentsToEdit({...appartmentToEdit, [name] : value});
  }

  const handleEditCancel = () => {
    setAppartmentsToEdit({ title: '', description: '', address: '', additionalAddres: '', city: '', zipcode: '', rental: '', rentalCharges: '', securityDeposit: '',  });
    setOpenEditDialog(false);
  };

  // Pagination Fonctionnality
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
        {/*Appartments Cards Map*/}
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
                {/* Actions GETbyId, PUT, DELETE Appartment*/}
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton color='secondary' onClick={() => handleClickCard(appartment.id)}>
                    <PreviewRoundedIcon />
                  </IconButton>
                  <IconButton color='secondary' onClick={() => handleEditClick(appartment.id)}>
                    <EditIcon  />
                  </IconButton>
                  <IconButton color='secondary' onClick={() => handleClickCard(appartment.id)}>
                    <DeleteIcon />
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