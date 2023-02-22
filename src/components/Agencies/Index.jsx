import React, { useState, useEffect} from 'react';
import { Box, useTheme } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../UI/Themes/theme";
import AgencyService from '../../api/AgencyService';
import Header from '../Global/Header';

function AgenciesList() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    getAgencies()
  }, []);

  const getAgencies = () => {
    AgencyService.getAgencies()
    .then(response => {
        setAgencies(response.data)
        console.log(response.data);
      })
    .catch(error => {
        console.log(error);
      });
  }; 

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { 
      field: 'name', 
      headerName: 'Agence',
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { 
      field: 'address',
       headerName: 'Adresse',
       headerAlign: 'left', 
       align: 'left',
       },
    { 
      field: 'address',
      headerName: 'Complément Adresse',
      headerAlign: 'left', 
      align: 'left',
    },
    { 
      field: 'city',
      headerName: 'Ville',
      headerAlign: 'left', 
      align: 'left',
     },
    { 
      field: 'zipcode',
      headerName: 'Code Postal',
      type: 'number',
      headerAlign: 'left', 
      align: 'left',
     },
    { 
      field: 'description',
      headerName: 'Infos',
      headerAlign: 'left', 
      align: 'left',
    },
  ];

  return (
    <Box m='20px'>
      <Header title="AGENCES" subtitle="Agences Partenaires" />
      <Box ù='40px 0 0 0' height='75vh' sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        }, 
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
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
       rows={agencies}
       columns={columns}
       />
       
      </Box>
      <Box>
        {
          agencies.map(
            agencies =>
            <Box key={agencies.id}>
              <Box key={agencies.id} />
              <Box key={agencies.name} />
              <Box key={agencies.address} />
              <Box key={agencies.additional_address} />
              <Box key={agencies.city} />
              <Box key={agencies.zipcode} />
            </Box>
          )
        }
      </Box>
    </Box>
  )

}





export default AgenciesList;