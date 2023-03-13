import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteTenant = ({ id, open, handleClose}) => {
  const [error, setError] = useState(null);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/tenants/${id}`)
      .then (res => {
        console.log(res.data); 
        handleClose();
        window.location.reload();
      })
      .catch (err => {
        console.log(err);
        setError('Une erreur est survenue lors de la suppression du locataire.');
      });
  }; 

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Supprimer un locataire
        </DialogTitle>
        <DialogContent>
          {error ? (
            <p>{error}</p>
          ) : (
            <p>Êtes-vous sûr de vouloir supprimer ce locataire ?</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Annuler
          </Button>
          <Button color="error" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteTenant;

