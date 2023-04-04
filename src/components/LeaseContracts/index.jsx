import React, { useState, useEffect } from 'react'
import Header from '../Global/Header';
import { DataGrid } from '@mui/x-data-grid';
import LeaseContractService from '../../api/LeaseContractService';
import { Box, useTheme } from '@mui/material';
import { tokens } from "../UI/Themes/theme";

function LeaseContractsList() {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [leaseContracts, setLeaseContracts] = useState([]); 

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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    flex: 0.5
  }, 
  {
    field: 'tenantEntity.name',
    headerName: 'Locataire',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => `${params.row.tenantEntity.name} ${params.row.tenantEntity.lastName}`,
    flex: 1
  },
  {
    field: 'appartmentEntity.title',
    headerName: 'Appartement',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.title,
    flex: 1
  },
  {
    field: 'appartmentEntity.city',
    headerName: 'Ville',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.city,
    flex: 1
  },
  {
    field: 'appartmentEntity.rental',
    headerName: 'Prix',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    valueGetter: (params) => params.row.appartmentEntity.rental + " €",
    flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Début Bail',
    cellClassName: "name-column--cell",
    headerAlign: 'left',
    align: 'left',
    flex: 1
  },
];

  return (
    <Box m='20px'>
      <Header title="CONTRATS DE LOCATION" subtitle="Mes contrats de location"/>
      <Box>
      </Box> 
      <Box m='40px 0 40px 0' height='50vh' sx={{
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
       rows={leaseContracts}
       columns={columns}
       />
      </Box>
    </Box>
  )
}

export default LeaseContractsList; 