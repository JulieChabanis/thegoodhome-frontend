import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TenantService from '../../../api/TenantService';

const DeleteTenant = (props) => {
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.open) { 
      setTenantToDelete(props.tenantToDelete);
      setOpen(true);
    }
  }, [props.open, props.tenantToDelete]);

  const deleteTenant = () => {
    TenantService.deleteTenant(tenantToDelete.id)
      .then(() => {
        props.onDelete(tenantToDelete.id);
        setTenantToDelete(null);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  const handleClose = () => {
    setOpen(false);
  }; 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Supprimer ${tenantToDelete?.name} ${tenantToDelete?.lastname}`}</DialogTitle>
      <DialogContent>
        <p>Voulez-vous vraiment supprimer ce locataire ?</p>
        <p>Nom: {tenantToDelete?.name}</p>
        <p>Prénom: {tenantToDelete?.lastname}</p>
        <p>@Email: {tenantToDelete?.email}</p>
        <p>Tel.: {tenantToDelete?.phone}</p>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleClose}
        > Annuler
        </Button>
        <Button 
          color="error" 
          variant="contained" 
          onClick={deleteTenant}
        > Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
        
export default DeleteTenant;


