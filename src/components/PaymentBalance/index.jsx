import React from 'react'
import { Box, useTheme } from '@mui/material';
import Header from '../Global/Header';
import { tokens } from "../UI/Themes/theme";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

function PaymentBalancesList() {
const theme = useTheme();
const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px'>
      <Header 
        title="SUIVI DES PAIEMENTS" 
        subtitle="Gérer les paiements des locataires"
      />
    </Box>
  )
}

export default PaymentBalancesList