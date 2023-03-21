import React, { useState, useEffect} from 'react'; 
import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { tokens } from '../UI/Themes/theme';
import TenantService from '../../api/TenantService';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Header Text
import Header from '../Global/Header';

// import add New Tenant Button ;
import AddTenantButton from './AddTenantButton';

function TenantsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tenants, setTenants] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const [tenantToEdit, setTenantToEdit] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    getTenants()
  }, []);

  // GET Tenant List
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

  // EDIT Tenant from List
  const handleEditClick = (id) => () => {
    const tenant = tenants.find((tenant) => tenant.id === id);
    setTenantToEdit(tenant);
    setOpenEditDialog(true);
  }

  const handleEditConfirm = () => {
    TenantService.updateTenant(tenantToEdit.id, tenantToEdit)
      .then((response) => {
        const updatedTenant = response.data;
        setTenants(tenants.map((tenant) => 
          tenant.id === updatedTenant.id || tenant.name === updatedTenant.name || tenant.lastName === updatedTenant.lastName || tenant.email === updatedTenant.email || tenant.phone === updatedTenant.phone
          ? updatedTenant
          : tenant
        ));
        setTenantToEdit(tenants);
        setOpenEditDialog(false);
        toast.success(`Locataire ${tenantToEdit.id} modifié`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleEditCancel= () => {
    setTenantToEdit(null);
    setOpenEditDialog(false);
  }

  // DELETE Tenant from List
  const handleDeleteClick = (id) => () => {
    setTenantToDelete({ id });
    setOpenDeleteDialog(true);
  }
  const handleDeleteConfirm = () => {
    TenantService.deleteTenantById(tenantToDelete.id)
    .then (response => {
      console.log(response.data);
      setTenants(tenants.filter((tenant) => tenant.id !== tenantToDelete.id));
      setOpenDeleteDialog(false);
      toast.info(`Locataire ${tenantToDelete.id} supprimé`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch(error => {
      console.log(error);
    })
  }
  const handleDeleteCancel = () => {
    setTenantToDelete(null);
    setOpenDeleteDialog(false); 
  }

  // Map Tenant List in Data-Grid
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID',
      flex: 0.2,
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
      field: 'phone',
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
          icon={<EditIcon/>}
          label='Modifier un locataire'
          onClick={handleEditClick(id)}
          />,
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
        sortModel={[ { field: 'id', sort: 'desc', },  ]}
        />
      </Box>
      {/*Add Confirmation Edit Dialog*/}
      <Box>
        <Dialog
        open={openEditDialog}
        onClose={handleEditCancel}
        >
          <DialogTitle>
          </DialogTitle>
          <DialogContent>
           <DialogContentText>
            Modifier les informations du locataire ci-dessous
            </DialogContentText> 
              <TextField             
                fullWidth
                variant="filled"
                id="name"
                name="name"
                label="Prénom"
                value= {tenantToEdit?.name}
                onChange={(e) => setTenantToEdit({...tenantToEdit, name: e.target.value})}
              />
              <TextField             
                fullWidth
                variant="filled"
                id="lastName"
                name="lastName"
                label="Nom de Famille"
                value= {tenantToEdit?.lastName}
                onChange={(e) => setTenantToEdit({...tenantToEdit, lastName: e.target.value})}
              />
              <TextField             
                fullWidth
                variant="filled"
                id="email"
                name="email"
                label="Email"
                value= {tenantToEdit?.email}
                onChange={(e) => setTenantToEdit({...tenantToEdit, email: e.target.value})}
              />
              <TextField             
                fullWidth
                variant="filled"
                id="email"
                name="lemail"
                label="Email"
                value= {tenantToEdit?.phone}
                onChange={(e) => setTenantToEdit({...tenantToEdit, phone: e.target.value})}
              />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleEditCancel} color="secondary">
              Annuler
            </Button>
            <Button variant="outlined" onClick={handleEditConfirm} color="success">
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/*Add Confirmation Delete Dialog*/}
      <Box>
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteCancel}
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: colors.primary[800],
            }
          }}
        >
          <DialogTitle>
            {"SUPPRIMER UN LOCATAIRE"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer le locataire {tenantToDelete?.id} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleDeleteCancel} color="secondary">
              Annuler
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteConfirm} color="error">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default TenantsList;