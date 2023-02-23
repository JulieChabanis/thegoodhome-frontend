import React, { useState, useEffect} from 'react';
import { Box, useTheme } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../UI/Themes/theme";
import AgencyService from '../../api/AgencyService';

// Import Map components
import Header from '../Global/Header';
import Requests from '../Global/Requests';

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
    { 
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
      headerAlign: 'center', 
      align: 'center',
    },
    { 
      field: 'name', 
      headerName: 'Agence',
      cellClassName: "name-column--cell",
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
    },
    { 
      field: 'address',
      headerName: 'Adresse',
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
      },
    { 
      field: 'additionalAddress',
      headerName: 'Comp.',
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
    },
    { 
      field: 'city',
      headerName: 'Ville',
      headerAlign: 'left', 
      align: 'left',
      flex: 1,
     },
    { 
      field: 'zipcode',
      headerName: 'CP',
      type: 'number',
      headerAlign: 'left', 
      align: 'left',
      flex: 0.5,
     },
    { 
      field: 'description',
      headerName: 'Infos',
      headerAlign: 'left', 
      align: 'left',
      flex: 2,
    },
  ];

  return (
    <Box m='20px'>
      <Header title="AGENCES" subtitle="Agences Partenaires" />
      <Requests title="Que voulez-vous faire ?"/>
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
      < TabPanel />
       <DataGrid 
       getRowHeight={() => 'auto'} 
       getEstimatedRowHeight={() => 200} 
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