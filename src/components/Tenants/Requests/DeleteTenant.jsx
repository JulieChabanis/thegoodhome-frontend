import React from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteTenant = ({ open, id, onDelete }) => {

  const handleClose = () => {
    onDelete();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tenants/${id}`);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Delete Tenant
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete this tenant?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTenant;
