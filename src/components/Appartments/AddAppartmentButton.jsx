import React, { useState } from 'react';
import { Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { tokens } from "../UI/Themes/theme";
import Modal from '@mui/material/Modal';
import CreateAppartment from "./Requests/CreateAppartment"


// Button + Add a new appartment
export default function AddAppartmentButton() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false) ;
  
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
        New Appartment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div tabIndex={-1}>
          <CreateAppartment/>
        </div>
      </Modal>
    </Stack>
  )
}
