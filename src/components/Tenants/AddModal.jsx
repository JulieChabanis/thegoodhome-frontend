import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { tokens } from '../UI/Themes/theme';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddTenantButton from './AddTenantButton';

export default function AddModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
        onClick={handleOpen}
        sx={{
          background: `${colors.green[400]} !important`,
          color: `${colors.primary[400]} !important`, 
          fontWeight: 'bold',
        }}
      > UPDATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddTenantButton/>
      </Modal>
    </div>
  );
}