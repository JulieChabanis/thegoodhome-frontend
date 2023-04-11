import React, { useState, useEffect } from 'react'
import Header from '../Global/Header';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import LeaseContractService from '../../api/LeaseContractService';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme } from '@mui/material';
import { tokens } from "../UI/Themes/theme";
import AddContractButton from './AddContractButton';
import { toast } from 'react-toastify';
import { openPdf } from '../../api/PdfLeaseContractService'; 

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

function LeaseContractsList() {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const navigate = useNavigate();
const [leaseContracts, setLeaseContracts] = useState([]); 

const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [leaseContractToDelete, setLeaseContractToDelete] = useState(); 


useEffect(() => {
  getAllLeaseContrats()
}, []);

const getAllLeaseContrats = () => {
  LeaseContractService.getAllLeaseContracts()
  .then (response => {
    setLeaseContracts(response.data)
    console.log(response.data);
  })
  .catch(error => {
    console.log(error); 
  });
};

const handleClickContract = (id) => {
  const selectedLeaseContract = leaseContracts.find((leaseContract) => leaseContract.id === id);
  console.log('Selected Lease Contract:', selectedLeaseContract);
  navigate(`/contracts/${selectedLeaseContract.id}`, {state: {leaseContract: selectedLeaseContract} });
};

// Delete Lease Contract
const handleDeleteClick = (id) => {
  setLeaseContractToDelete({ id });
  setOpenDeleteDialog(true);
}

const handleDeleteConfirm = () => {
  LeaseContractService.deleteLeaseContractById(leaseContractToDelete.id)
  .then (response => {
    console.log(response.data);
    setLeaseContracts(leaseContracts.filter((leaseContract) => leaseContract.id !== leaseContractToDelete.id));
    setOpenDeleteDialog(false);
    toast.info(`Contrat de Location ${leaseContractToDelete.id} supprimé`, {
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
};

const handleDeleteCancel = () => {
  setLeaseContractToDelete(null);
  setOpenDeleteDialog(false); 
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    flex: 0.2,
  }, 
  {
    field: 'tenantEntity.name',
    headerName: 'Locataire',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => `${params.row.tenantEntity.name} ${params.row.tenantEntity.lastName}`,
    flex: 1,
  },
  {
    field: 'appartmentEntity.title',
    headerName: 'Appartement',
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.title,
    flex: 1,
  },
  {
    field: 'appartmentEntity.city',
    headerName: 'Ville',
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.city,
    flex: 0.8,
  },
  {
    field: 'appartmentEntity.rental',
    headerName: 'Prix',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.rental + " €",
    flex: 0.8,
  },
  {
    field: 'createdAt',
    headerName: 'Début Bail',
    headerAlign: 'left',
    align: 'left',
    flex: 0.8,
  },
  {
    field: 'actions',
    headerName: 'Action',
    type: 'actions', 
    flex : 1,
    getActions: (params) => {
      const leaseContract= params.row;
      return [
        <GridActionsCellItem
          icon={<PreviewIcon />}
          label='voir la fiche'
          onClick={() => handleClickContract(leaseContract.id)}
        />,
        // TODO Add Link to Open Bail PDF
        <GridActionsCellItem
        icon={<PictureAsPdfRoundedIcon />}
        label='Ouvrir le contrat de Bail'
        onClick={openPdf}
      />,
        <GridActionsCellItem
        icon={<DeleteIcon />}
        label='Supprimer le contrat'
        onClick={() => handleDeleteClick(leaseContract.id)}
      />,
      ]
    }
  }
];

  return (
    <Box m='20px'>
      <Header title="CONTRATS DE LOCATION" subtitle="Mes contrats de location"/>
      < AddContractButton />
      <Box 
        m='40px 0 40px 0' 
        height='40vh' 
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
      }}>
      <DataGrid 
       getRowHeight={() => 'auto'} 
       getEstimatedRowHeight={() => 200} 
       sortModel={[ { field: 'id', sort: 'desc', }, ]}
       rows={leaseContracts}
       columns={columns}
       />
      </Box>
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
            {"SUPPRIMER UN CONTRAT"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer le contrat {leaseContractToDelete?.id} ?
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

export default LeaseContractsList; 