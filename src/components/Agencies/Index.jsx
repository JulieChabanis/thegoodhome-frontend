import React, { useState, useEffect} from 'react';
import { Box, useTheme } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../UI/Themes/theme";
import AgencyService from '../../api/AgencyService';
import Header from '../Global/Header';
// import MultiActionAreaCard from '../Agencies/card'
import TabPanel from './Tabs';

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
    { field: 'id', headerName: 'ID', width: 5 },
    { 
      field: 'name', 
      headerName: 'Agence',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      width: 200,
    },
    { 
      field: 'address',
      headerName: 'Adresse',
      headerAlign: 'left', 
      align: 'left',
      width: 150,
      },
    { 
      field: 'additionalAddress',
      headerName: 'Comp.',
      headerAlign: 'left', 
      align: 'left',
      width: 150,
    },
    { 
      field: 'city',
      headerName: 'Ville',
      headerAlign: 'left', 
      align: 'left',
      width: 100,
     },
    { 
      field: 'zipcode',
      headerName: 'CP',
      type: 'number',
      headerAlign: 'left', 
      align: 'left',
      width: 60,
     },
    { 
      field: 'description',
      headerName: 'Infos',
      headerAlign: 'left', 
      align: 'left',
      width: 300,
    },
  ];

  return (
    <Box m='20px'>
      <Header title="AGENCES" subtitle="Agences Partenaires" />
      <Box m='40px 0 40px 0' height='50vh' sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        }, 
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
          py: 2,
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
      < TabPanel />
       <DataGrid getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200} 
       rows={agencies}
       columns={columns}
       />
       
      </Box>
      
      {/*< MultiActionAreaCard/>*/}
      {/*<Box>
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
      </Box>*/}
    </Box>
  )
}

export default AgenciesList;