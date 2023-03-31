import React, { useState, useEffect } from 'react';
import AppartmentService from '../../api/AppartmentService';
import { useNavigate } from 'react-router-dom';
import Header from '../Global/Header';
import { Tabs, Tab, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box,Pagination, Grid, CardActions, Card, IconButton, CardMedia, CardContent, Typography, DialogContentText } from '@mui/material';
import AddAppartmentButton from './AddAppartmentButton';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';

import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';

function AppartmentsList() {
  const [appartments, setAppartments] = useState([]);
  const [page, setPage] = useState(1);
  const [sortingMethod, setSortingMethod] = useState('city');
  const navigate = useNavigate();

  const [AppartmentToEdit, setAppartmentToEdit] = useState({title: '', description: '', address: '', additionalAddress: '', city: '', zipcode: '', rental: '', rentalCharges: '', securityDeposit: ''});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingAppartmentId, setEditingAppartmentId] = useState(null);
  // Generate Breackpoints 
  const isMd = useMediaQuery("(max-width:1200px)")
  const isXsOrSm = useMediaQuery("(max-width:900px)")
  const appartmentsPerPage = isXsOrSm ? 4 : isMd ? 6 : 8;


  useEffect(() => {
    getAppartments();
  }, [sortingMethod]);

  // GET Appartments List
  const getAppartments = () => {
    AppartmentService.getAppartments()
      .then(response => {
        let sortedAppartments = response.data.slice(); // Sorted Appartments CITY or RENTAL
        if (sortingMethod === 'city') {
          sortedAppartments.sort((a, b) => a.city.localeCompare(b.city)); // sort by city name
        } else if (sortingMethod === 'rental') {
          sortedAppartments.sort((a, b) => a.rental - b.rental); // sort by rental amount
        }
        setAppartments(sortedAppartments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Edit Appartment from Card
  const handleEditClick = (id) => {
    const selectedAppartment = appartments.find(appartment => appartment.id === id);
    setEditingAppartmentId(id);
    setAppartmentToEdit({...selectedAppartment});
    setOpenEditDialog(true);
  };

  const handleEditConfirm = (id) => {
    AppartmentService.updateAppartment(editingAppartmentId, AppartmentToEdit)
    .then ((response) => {
      const updatedAppartment = response.data;
      setAppartments(appartments.map((selectedAppartment) =>
      (selectedAppartment.id === updatedAppartment.id ? updatedAppartment : selectedAppartment)));
      setOpenEditDialog(false);
      navigate(`/appartments/${id}`, { state: { appartment: AppartmentToEdit } });
      toast.success('Appartement modifié avec succès', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch ((error) => {
      console.log(error); 
    });
  };

  const handleEditChange = (event) =>  {
    const {name, value} = event.target;
    setAppartmentToEdit({ ...AppartmentToEdit, [name] : value});
  }

  const handleEditCancel = (event) => {
    setAppartmentToEdit({title: '', description: '', address: '', additionalAddress: '', city: '', zipcode: '', rental: '', rentalCharges: '', securityDeposit: ''});
    setOpenEditDialog(false);
  }

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

  // Pagination Fonctionnality
  const startIndex = (page - 1) * appartmentsPerPage;
  const endIndex = startIndex + appartmentsPerPage;
  const currentAppartments = appartments.slice(startIndex, endIndex);

  return (
    <Box m='20px'>
      <Box display='flex' flexDirection='column'>
      <Header title='APPARTMENTS' subtitle='Gestion des appartements' />
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs 
            indicatorColor="secondary"
            textColor="secondary" 
            value={sortingMethod} 
            onChange={(e, value) => setSortingMethod(value)}
          >
            <Tab value="city" label="Trier par : Villes A-Z)" icon={<LocationCityIcon/>}  />
            <Tab icon={<EuroSymbolIcon />} value="rental" label="Prix loyer (€-€€€)" />
          </Tabs>
        <AddAppartmentButton />
        </Box>
      </Box>
      <Box m='15px 0 0 0'>
        {/*Appartments Cards Map*/}
        <Grid container spacing={2}>
          {currentAppartments.map(appartment => (
            <Grid item xs={isXsOrSm ? 6 : 8} sm={isXsOrSm ? 6 : 8} md={isMd ? 4 : 8} lg={3} key={appartment.id}>
              <Card elevation={4} sx={{ minHeight:'100px', maxWidth:'410px', minWidth:'150px'}}>
                <CardMedia
                  component='img'
                  height='130'
                  image={`${process.env.PUBLIC_URL}/static/images/appartments/appartment11.JPG`}
                />
                <CardContent sx={{ maxHeight:'100px'}}>
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
                  <IconButton color='secondary'>
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
      <Dialog
        open={openEditDialog}
        onClose={handleEditCancel}
      >
        <DialogTitle sx={{ fontSize:'2.2em'}}>
          {"MODIFIER L'APPARTEMENT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifier les informations de l'appartement
          </DialogContentText>
          <TextField 
            margin='normal'
            fullWidth
            variant='outlined'
            id="title"
            name="title"
            label="Titre"
            value= {AppartmentToEdit?.title}
            onChange={handleEditChange}
          />
          <TextField 
            margin='normal'
            multiline
            rows={4}
            fullWidth
            variant='outlined'
            id="description"
            name="description"
            label="Description"
            value= {AppartmentToEdit?.description}
            onChange={handleEditChange}
          />
          <TextField 
            margin='normal'
            fullWidth
            variant='outlined'
            id="address"
            name="address"
            label="address"
            value= {AppartmentToEdit?.address}
            onChange={handleEditChange}
          />
          <TextField 
            margin='normal'
            fullWidth
            variant='outlined'
            id="additionalAddress"
            name="additionalAddress"
            label="Addresse Complémentaire"
            value= {AppartmentToEdit?.additionalAddress}
            onChange={handleEditChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField 
                margin='normal'
                fullWidth
                variant='outlined'
                id="city"
                name="city"
                label="Ville"
                value= {AppartmentToEdit?.city}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin='normal'
                variant='outlined'
                id="zipcode"
                name="zipcode"
                label="Code Postal"
                value= {AppartmentToEdit?.zipcode}
                onChange={handleEditChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField 
                margin='normal' 
                variant='outlined'
                id="rental"
                name="rental"
                label="rental"
                value= {AppartmentToEdit?.rental}
                onChange={handleEditChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                margin='normal'
                fullWidth
                variant='outlined'
                id="rentalCharges"
                name="rentalCharges"
                label="Charges locatives"
                value= {AppartmentToEdit?.rentalCharges}
                onChange={handleEditChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                margin='normal'
                fullWidth
                variant='outlined'
                id="securityDeposit"
                name="securityDeposit"
                label="Dépot de sécurité"
                value= {AppartmentToEdit?.securityDeposit}
                onChange={handleEditChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleEditCancel}
            color="error"
          >
            Annuler
          </Button>
          <Button
            variant="outlined"
            endIcon={<SendRoundedIcon />} 
            onClick={handleEditConfirm}
            color="secondary"
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AppartmentsList;