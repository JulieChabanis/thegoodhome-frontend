import React, { useState } from 'react';
import { Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { tokens } from "../UI/Themes/theme";



// Button + Add a new appartment
export default function AddAppartmentButton() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    navigate('/ajouter-contrat');
  }

 
  
  return (
    <Stack direction='row' justifyContent='flex-end'alignItems='flex-end'>
      <Button 
        variant='outlined'
        startIcon={<AddIcon/>}
        onClick={handleOpen}
        sx={{
          background: 'none',
          color: `${colors.green[400]} !important`, 
          fontWeight: 'bold',
          borderColor: `${colors.green[400]}!important`, 
          '&:hover': {
            background: `${colors.green[400]}!important`,
            color: `${colors.primary[500]}!important`, 
          }
        }}
      >
        Créer un contrat de location
      </Button>
    </Stack>
  )
}
