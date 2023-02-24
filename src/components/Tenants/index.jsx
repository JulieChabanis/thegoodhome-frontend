import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../UI/Themes/theme';
import TenantService from '../../api/TenantService';
import Header from '../Global/Header';
import AddModal from './AddModal';

function TenantsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    getTenants()
  }, []);

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
      headerName: 'Nom',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
    },
    { 
      field: 'lastname',
      headerName: 'Prénom',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
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
      flex: 1,
     },
     {
      field: '',
      headerName: 'Action',
      flex: 1,
      renderCell: () => {
        return (
          < AddModal />
        )
     },
    },
  ];

  return (
    <Box m='20px'>
      <Header 
        title="MES LOCATAIRES"
        subtitle="Gestion de mes locataires"
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
        ' & .MuiDataGrid-toolbarContainer . MuiButton-text' : {
          color: `${colors.grey[100]} !important`,
        },  
    }}>
       <DataGrid 
       rows={tenants}
       columns={columns}
       />
    </Box>
    </Box>
  )
}

export default TenantsList;