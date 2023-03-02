import React, {useState} from 'react';
import { Box, Tooltip, IconButton} from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import DeleteTenant from './Requests/DeleteTenant';

const TenantsActions = ({ id }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
        <IconButton>
          <Edit/> 
        </IconButton>
      </Tooltip>

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