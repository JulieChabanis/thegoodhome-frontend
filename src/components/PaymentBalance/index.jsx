import React from 'react'
import { Box, useTheme, Grid, Link } from '@mui/material';
import Header from '../Global/Header';
import { tokens } from "../UI/Themes/theme";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import PaymentBalanceService from '../../api/PaymentBalanceService';
import { useEffect, useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';


function PaymentBalancesList() {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [paymentBalances, setPaymentBalances] = useState([]);

useEffect(() => {
  getAllPaymentBalances()
}, []);

const getAllPaymentBalances = () => {
  PaymentBalanceService.getAllPaymentBalances()
  .then (response => {
    console.log(response.data);
  })
  .catch (error => {
    console.log(error);
  })
};

const columns = [
  {
    field:'leaseContract.id',
    headerName: 'Num Contrat',
    headerAlign: 'center',
    align: 'center',
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
    headerName: 'Prix',
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
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<PreviewIcon />}
          label='voir la fiche'
          onClick=""
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
    </Box>
  )
}

export default PaymentBalancesList