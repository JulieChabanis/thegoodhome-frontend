import React, { useState, useEffect} from 'react'; 
import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { tokens } from '../UI/Themes/theme';
import TenantService from '../../api/TenantService';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import PreviewIcon from '@mui/icons-material/Preview';
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

  const [tenantToEdit, setTenantToEdit] = useState({ name: '', lastName: '', email: '', phone: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingTenantId, setEditingTenantId] = useState(null);


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
    setEditingTenantId(id);
    setTenantToEdit({...tenant});
    setOpenEditDialog(true);
  }

  const handleEditConfirm = () => {
    TenantService.updateTenant(editingTenantId, tenantToEdit)
      .then((response) => {
        const updatedTenant = response.data;
        setTenants(tenants.map((tenant) => 
          (tenant.id === updatedTenant.id ? updatedTenant : tenant)));
        // setTenantToEdit(tenants);
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
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditChange = (event) => {
    const { name, value} = event.target;
    setTenantToEdit({ ...tenantToEdit, [name] : value});
  }

  const handleEditCancel= () => {
    setTenantToEdit({ name: '', lastName: '', email: '', phone: '' });
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
          /*<GridActionsCellItem
          icon={<PreviewIcon/>}
          label='voir le locataire'
          onClick=""
          />,*/
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
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: colors.primary[900],
          }
        }}
        >
          <DialogTitle  sx={{ fontSize: '18px'}}>
            {"MODIFIER LE LOCATAIRE"}
          </DialogTitle>
          <DialogContent>
           <DialogContentText>
            Modifier les informations du locataire ci-dessous
            </DialogContentText> 
              <TextField    
                margin='normal'         
                fullWidth
                variant="outlined"
                id="name"
                name="name"
                label="Prénom"
                value= {tenantToEdit?.name}
                onChange={handleEditChange}
              />
              <TextField  
                margin='normal'           
                fullWidth
                variant="outlined"
                id="lastName"
                name="lastName"
                label="Nom de Famille"
                value= {tenantToEdit?.lastName}
                onChange={handleEditChange}
              />
              <TextField    
                margin='normal'         
                fullWidth
                variant="outlined"
                id="email"
                name="email"
                label="Email"
                value= {tenantToEdit?.email}
                onChange={handleEditChange}
              />
              <TextField   
                margin='normal'          
                fullWidth
                variant="outlined"
                id="phone"
                name="phone"
                label="Telephone"
                value= {tenantToEdit?.phone}
                onChange={handleEditChange}
              />
          </DialogContent>
          <DialogActions>
            <Button 
              variant="outlined" 
              onClick={handleEditCancel} 
              sx={{
                background: 'none',
                color: `${colors.blue[400]} !important`, 
                borderColor: `${colors.blue[400]}!important`, 
                '&:hover': {
                  color: `${colors.blue[200]}!important`, 
                }
              }}
            >
              Annuler
            </Button>
            <Button 
              variant="outlined" 
              endIcon={<SendRoundedIcon />} 
              onClick={handleEditConfirm} 
              color="secondary"
            >
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