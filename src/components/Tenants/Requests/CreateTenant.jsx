import React, { useState, useEffect} from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { InputLabel, Input, FormHelperText, TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
// import TenantService from '../../../api/TenantService';

export default function CreateTenantForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  
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
        <FormControl fullWidth>
            <TextField 
            margin='normal'
            id="name"
            label="Nom" 
            variant="outlined"
            autoFocus
            >
            </TextField>
            <br /> 
            <TextField id="outlined-basid" label="Prénom" variant="outlined"></TextField>
            <br /> 
            <TextField id="outlined-basid" label="Email" variant="outlined"></TextField>
            <br /> 
            <TextField id="outlined-basid" label="Telephone" variant="outlined"></TextField>
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
