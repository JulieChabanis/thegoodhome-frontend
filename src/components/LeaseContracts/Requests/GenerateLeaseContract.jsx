import React, { useEffect, useState } from 'react'
import Header from '../../Global/Header'
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AppartmentService from '../../../api/AppartmentService';
import TenantService from '../../../api/TenantService';
import LeaseContractService from '../../../api/LeaseContractService';

const GenerateLeaseContract = () => {
  const navigate = useNavigate(); 
  const [ appartments, setAppartments ] = useState([]); 
  const [ selectedAppartment, setSelectedAppartment ] = useState('');
  const [ tenants, setTenants ] = useState([]);
  const [ selectedTenant, setSelectedTenant ] = useState('');
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  useEffect(() => {
    getAppartments();
    getTenants();
  }, []); 

  const getAppartments = () => {
    AppartmentService.getAppartments()
      .then(response => {
        setAppartments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getTenants = () => {
    TenantService.getTenants()
    .then(response => {
      setTenants(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleSubmit = () => {
    const leaseContract = {
      appartmentEntity: {id : selectedAppartment}, 
      tenantEntity: {id : selectedTenant},
      createdAt: isoDate,
    }; 

    LeaseContractService.createLeaseContract(leaseContract)
  }

  const handleTenantChange = (event) => {
    setSelectedTenant(event.target.value);
  }

  const handleAppartmentChange = (event) => {
    setSelectedAppartment(event.target.value);
  }

  return (
    <Box m='20px'>
      <Header
        title={"CREER UN NOUVEAU CONTRAT DE LOCATION"}
        subtitle={"Associer un locataire à un appartement"}
      />
      <Box>
      <Typography>
          Choisir un appartement
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="appartment-select-label">
          Appartement
        </InputLabel>
        <Select
          labelId="appartment-select-label"
          id="appartment-select"
          value={selectedAppartment}
          onChange={handleAppartmentChange}
        >
          {appartments.map(appartment => (
            <MenuItem key={appartment.id} value={appartment.id}>
              {appartment.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      <Box>
      <Typography>
          Choisir un locataire à associer
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="tenant-select-label">
          Locataires
        </InputLabel>
        <Select
          labelId="tenant-select-label"
          id="tenant-select"
          value={selectedTenant}
          onChange={handleTenantChange}
        >
          {tenants.map(tenant => (
            <MenuItem key={tenant.id} value={tenant.id}>
              {`${tenant.name} ${tenant.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
            Créer le bail de location
      </Button>
      </Box>
    </Box>
  )
}

export default GenerateLeaseContract