import React, { Fragment } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteTenant = ({ id, open, handleClose}) => {

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/tenants/${id}`)
    .then (res => {
      console.log(res.data); 
      handleClose();
      window.location.reload();
    })
    .catch (err => {
      console.log(err);
    })
  }; 

  return (
    <Fragment>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Supprimer un locataire
      </DialogTitle>
      <DialogContent>
        Êtes-vous sûr de vouloir supprimer ce locataire ?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Annuler
        </Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </Fragment>
  );
};

export default DeleteTenant;
