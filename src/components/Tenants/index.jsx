import React, { useState, useEffect} from 'react'; 
import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
// import { Delete } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { tokens } from '../UI/Themes/theme';
import TenantService from '../../api/TenantService';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import DeleteTenant from './Requests/DeleteTenant';

// Import Map Component
import Header from '../Global/Header';

// import TenantsActions from './TenantsActions';
import AddTenantButton from './AddTenantButton'

function TenantsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tenants, setTenants] = useState([]);
  const [open, setOpen] = useState(false); 
  const [tenantToDelete, setTenantToDelete] = useState(null);

  useEffect(() => {
    getTenants()
  }, []);

  // Tenants List
  const getTenants = () => {
    TenantService.getTenants()
    .then(response => {
        setTenants(response.data);
        console.log(response.data);
      })
    .catch(error => {
        console.log(error);
      });
  };

  // Functionnal Delete Tenant
  const handleDeleteClick = (id) => () => {
    setTenantToDelete(id);
    setOpen(true);
  }
  const handleDeleteConfirm = () => {
    TenantService.deleteTenantById(tenantToDelete)
    .then (response => {
      console.log(response.data);
      setTenants(tenants.filter((tenant) => tenant.id !== tenantToDelete));
      setOpen(false);
    })
    .catch(error => {
      console.log(error);
    })
  }
  const handleDeleteCancel = () => {
    setTenantToDelete(null);
    setOpen(false); 
  }

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID',
      flex: 0.1,
      headerAlign: 'center', 
      align: 'center',
    },
    { 
      field: 'name', 
      headerName: 'Prénom',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      flex: 0.8,
    },
    { 
      field: 'lastName',
      headerName: 'Nom de famille',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      flex: 0.8,
      },
    { 
      field: 'email',
      headerName: '@Email',
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
    },
    { 
      field: 'phoneNumber',
      headerName: 'Tel.',
      headerAlign: 'left', 
      align: 'left',
      flex: 0.8,
     },
     {
      // ADD Buttons Actions
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      flex: 1,
      getActions:({ id }) => {
        return [
          <GridActionsCellItem
          icon={<DeleteIcon/>}
          label='Delete'
          onClick={handleDeleteClick(id)}
          />
        ]
      }
    },
  ];

  return (
    <Box m='20px'>
      <Header 
        title="MES LOCATAIRES"
        subtitle="Gestion de mes locataires"
      />
      {/*Add Button for add tenant*/}
      <Box>
        <AddTenantButton />
      </Box>
      <Box 
        m='40px 0 40px 0' 
        height='50vh' 
        sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        }, 
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
          py: 1,
        },
        '& .name-column--cell' : {
          color: colors.green[300],
        },
        '& .MuiDataGrid-columnHeaders' : {
          backgroundColor: colors.blue[700],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller' : {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer' : {
          borderTop: 'none',
          backgroundColor: colors.blue[700],
        },
        ' & .MuiDataGrid-toolbarContainer .MuiButton-text' : {
          color: `${colors.grey[100]} !important`,
        },  
    }}>
       <DataGrid 
       rows={tenants}
       columns={columns}
       />
    </Box>
    {/*Add Confirmation Dialog*/}
    <Box>
  <Dialog
    open={open}
    onClose={handleDeleteCancel}
  >
    <DialogTitle>
      {"Supprimer ce locataire ?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Êtes-vous sûr de vouloir supprimer ce locataire ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteCancel} color="secondary">
        Annuler
      </Button>
      <Button onClick={handleDeleteConfirm} color="primary">
        Supprimer
      </Button>
    </DialogActions>
  </Dialog>
</Box>
    </Box>
  )
}

export default TenantsList;