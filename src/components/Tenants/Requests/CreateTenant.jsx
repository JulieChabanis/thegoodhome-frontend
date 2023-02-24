import React, { useState, useEffect,} from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { InputLabel, Input, FormHelperText, TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';
// import TenantService from '../../../api/TenantService';

export default function CreateTenantForm() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [tenant, setTenant] = useState({
    name:'',
    lastname:'',
    email:'',
    phone:'',
  })

  const {name, lastname, email, phone} = tenant;


  const onInputChange = (e) => {

    setTenant({...tenant, [e.target.name]: e.target.value})
  }; 

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/tenants/create', tenant);
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
        onSubmit={(e) => onSubmit(e)}
      >
        <FormControl fullWidth>
            <TextField 
            margin='normal'
            required
            id="name"
            label="Nom" 
            variant="outlined"
            onChange={(e)=> onInputChange(e)}
            >
            </TextField>
            <br /> 
            <TextField required id="outlined-basid" label="Prénom" variant="outlined" onChange={(e)=> onInputChange(e)}></TextField>
            <br /> 
            <TextField required id="outlined-basid" label="Email" variant="outlined" onChange={(e)=> onInputChange(e)}></TextField>
            <br /> 
            <TextField required id="outlined-basid" label="Telephone" variant="outlined" onChange={(e)=> onInputChange(e)}></TextField>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
        > Ajouter
        </Button>
        </Box>
      </Box>
    )
};
