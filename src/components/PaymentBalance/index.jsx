import React from 'react'
import { Box, useTheme, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from '../Global/Header';
import { tokens } from "../UI/Themes/theme";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import PaymentBalanceService from '../../api/PaymentBalanceService';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { toast } from 'react-toastify';


function PaymentBalancesList() {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [paymentBalances, setPaymentBalances] = useState([]);

const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [PaymentBalanceToDelete, setPaymentBalanceToDelete] = useState();

useEffect(() => {
  getAllPaymentBalances()
}, []);

const getAllPaymentBalances = () => {
  PaymentBalanceService.getAllPaymentBalances()
  .then (response => {
    setPaymentBalances(response.data)
    console.log(response.data);
  })
  .catch (error => {
    console.log(error);
  })
};

// Delete Payment Balance
const handleDeleteClick = (id) => {
  setPaymentBalanceToDelete({id});
  setOpenDeleteDialog(true);
}

const handleDeleteConfirm = () => {
  PaymentBalanceService.deletePaymentBalancetById(PaymentBalanceToDelete.id)
  .then (response => {
    console.log(response.data);;
    setPaymentBalances(paymentBalances.filter((paymentBalance) => paymentBalance.id !== PaymentBalanceToDelete.id));
    setOpenDeleteDialog(false);
    toast.info(`Suivi de paiement ${PaymentBalanceToDelete.id} supprimé`, {
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
  .catch (error=> {
    console.log(error);
  })
};

const handleDeleteCancel = () => {
  setPaymentBalanceToDelete(null);
  setOpenDeleteDialog(false);
}

const columns = [
  {
    field:'leaseContractEntity.id',
    headerName: 'Num Contrat',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => `${params.row.leaseContractEntity.id}`,
    flex: 0.5
  }, 
  {
    field:'tenantEntity.name',
    headerName: 'Locataire',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => `${params.row.leaseContractEntity.tenantEntity.name} ${params.row.leaseContractEntity.tenantEntity.lastName}`,
    flex: 1,
  },
  {
    field: 'appartmentEntity.rental',
    headerName: 'Loyer € / CC',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.leaseContractEntity.appartmentEntity.rental + " €",
    flex: 0.8,
  },
  {
    field: 'isPaid',
    headerName: 'Loyer Payé ?',
    headerAlign: 'left',
    align: 'left',
    flex: 0.8,
  },
  {
    field: 'paymentDate',
    headerName: 'Date paiement',
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
      const paymentBalance = params.row;
      return [
        // TO DO : Add Link to Open Tenant Balance
        <GridActionsCellItem
          icon={<PreviewIcon />}
          label='voir la fiche'
          onClick=""
        />,
        // TO DO : Add Link to Open Quittance
        <GridActionsCellItem
        icon={<PictureAsPdfRoundedIcon />}
        label='Voir les quittances'
        />,
        <GridActionsCellItem
        icon={<DeleteIcon />}
        label='supprimé le paiement'
        onClick={() => handleDeleteClick(paymentBalance.id)}
      />,
     ]
    }
  }
];

  return (
    <Box m='20px'>
      <Header 
        title="SUIVI DES PAIEMENTS" 
        subtitle="Gérer les paiements des locataires"
      />
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
      }}>
      <DataGrid 
       getRowHeight={() => 'auto'} 
       getEstimatedRowHeight={() => 200} 
       sortModel={[ { field: 'id', sort: 'desc', }, ]}
       rows={paymentBalances}
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
            {"SUPPRIMER UN PAIEMENT"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer le paiement ?
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

export default PaymentBalancesList