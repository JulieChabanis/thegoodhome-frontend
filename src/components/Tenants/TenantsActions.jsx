import React, {useState} from 'react';
import { Box, Tooltip, IconButton, Modal} from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DeleteTenant from './Requests/DeleteTenant';
import UpdateTenant from './Requests/UpdateTenant';

const TenantsActions = ({ id }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

   // Update button
   const handleClickUpdate = () => {
    setOpenUpdateModal(true);
   }; 

   const handleCloseUpdate = () => {
    setOpenUpdateModal(false);
   }; 
 
  // Delete button
  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
  }; 
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      <Tooltip title="View Tenant details">
        <IconButton>
          <Preview/> 
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit Tenant">
        <IconButton onClick={handleClickUpdate}>
          <Edit/> 
        </IconButton>
      </Tooltip>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <UpdateTenant />
     </Modal> 

      <Tooltip title="Delete Tenant">
        <IconButton onClick={handleClickDelete}>
          <Delete />
        </IconButton> 
      </Tooltip>
      <DeleteTenant open={openDeleteDialog} handleClose={handleCloseDeleteDialog} id={id}/>
    </Box>
  );
  }

export default TenantsActions;