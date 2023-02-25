import React, { useState, useEffect } from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import TenantService from '../../../api/TenantService';

const CreateTenantForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  const [newTenant, setNewTenant] = useState("");

  const createTenant = () => {
    TenantService.createTenant()
    .then(response => {
        setNewTenant(response.data);
        console.log(response.data);
      })
    .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    createTenant();
  }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewTenant({...newTenant, [name]: value }); 
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (newTenant.name.length > 0) {
      handleChange(e, createTenant(newTenant));
      }
    }
    
  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: '70%',
      borderRadius :2,
      boxShadow: 24,
      background: `${colors.blue[700]} !important`,
      p: 4,
        }}>
      <Typography variant='h2' color={colors.grey[100]} sx={{
        fontWeight: 400,
        mb: 3,
      }}>
        Ajouter un locataire
      </Typography>
      <Box
        component='form'
      >
        <form>
        <FormControl fullWidth>
            <TextField 
            margin='normal'
            required
            value={newTenant.name}
            id="name"
            label="Nom" 
            variant="outlined"
            onChange={handleChange}
            >
            </TextField>
            <br /> 
            <TextField required value={newTenant.lastname} onChange={handleChange} id="outlined-basid" label="Prénom" variant="outlined"></TextField>
            <br /> 
            <TextField required value={newTenant.email} onChange={handleChange} id="outlined-basid" label="Email" variant="outlined"></TextField>
            <br /> 
            <TextField required value={newTenant.phone}  onChange={handleChange} id="outlined-basid" label="Telephone" variant="outlined"></TextField>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
          onClick={handleSubmit}
        > Ajouter
        </Button>
        </form>
        </Box>
      </Box>
    )
}

export default CreateTenantForm;
