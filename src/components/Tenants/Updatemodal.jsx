import React, { useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { tokens } from '../UI/Themes/theme';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TenantService from '../../api/TenantService';

export default function UpdateModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tenants, setTenants] = useState({});

  useEffect(() => {
    getTenants()
  }, []);

  const getTenants = () => {
    TenantService.getTenants()
    .then(response => {
        setTenants(response.data);
        console.log(response.data);
      })
    .catch(error => {
        console.log(error)
      });
  }; 

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
        <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        </Box>
      </Modal>
    </div>
  );
}