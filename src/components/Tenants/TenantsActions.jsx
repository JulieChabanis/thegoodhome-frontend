import React, {useState} from 'react';
import { Box, Tooltip, IconButton} from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import DeleteTenant from './Requests/DeleteTenant';

const TenantsActions = ({params}) => {
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tenantIdToDelete, setTenantIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setTenantIdToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setTenantIdToDelete(null);
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
        <IconButton
          onClick={() => handleDelete(123)}
      >
          <Delete />
        </IconButton> 
      </Tooltip>
      <DeleteTenant
        open={openDeleteDialog}
        tenantId={tenantIdToDelete}
        onDelete={() => {
          setTenantIdToDelete(null);
          setOpenDeleteDialog(false);
        }}
      />
    </Box>
  );
}; 

export default TenantsActions;