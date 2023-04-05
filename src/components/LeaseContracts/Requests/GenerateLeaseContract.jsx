import React, { useEffect, useState } from 'react'
import Header from '../../Global/Header'
import { Box, Button, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, Typography, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AppartmentService from '../../../api/AppartmentService';
import TenantService from '../../../api/TenantService';
import LeaseContractService from '../../../api/LeaseContractService';
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import { toast } from 'react-toastify';

const GenerateLeaseContract = () => {
  const navigate = useNavigate(); 

  const [ appartments, setAppartments ] = useState([]); 
  const [ selectedAppartment, setSelectedAppartment ] = useState('');

  const [ tenants, setTenants ] = useState([]);
  const [ selectedTenant, setSelectedTenant ] = useState('');

  const [ leases, setLeases ] = useState([]);
  const [availableAppartments, setAvailableAppartments ] = useState([]);

  const [securityDepositAmount, setSecurityDepositAmount] = useState(0);
  const [securityDepositPaid, setSecurityDepositPaid] = useState(false); 
  const [selectedAppartmentDetails, setSelectedAppartmentDetails] = useState({});

  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  useEffect(() => {
    getTenants();
    getLeases();
  }, []);
  
  useEffect(() => {
    getAppartments();
  }, [leases]);

  const getAppartments = () => {
    AppartmentService.getAppartments()
      .then(response => {
        const fileteredAppartments = response.data.filter(appartment =>
           !leases.some(lease => lease.appartmentEntity.id === appartment.id));
               setAppartments(fileteredAppartments);
               setAvailableAppartments(fileteredAppartments);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getLeases = () => {
    LeaseContractService.getAllLeaseContracts()
    .then(response => {
      setLeases(response.data);
    })
    .catch (error => {
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
      appartmentEntity: {id: selectedAppartment}, 
      tenantEntity: {id: selectedTenant},
      securityDepositAmount: securityDepositAmount,
      securityDepositPaid: securityDepositPaid,
      createdAt: isoDate,
    }; 

    LeaseContractService.createLeaseContract(leaseContract)
    navigate('/contracts');
    toast.success('Contrat de Location généré avec succés', {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const handleTenantChange = (event) => {
    setSelectedTenant(event.target.value);
  }

  const handleAppartmentChange = (event) => {
    const selectedAppartmentId = event.target.value;
    const selectedAppartmentDetails = availableAppartments.find(appartment => appartment.id === selectedAppartmentId);
    setSelectedAppartment(selectedAppartmentId);
    setSelectedAppartmentDetails(selectedAppartmentDetails);
    setSecurityDepositAmount(selectedAppartmentDetails.securityDeposit);
  };

  const handleSecurityDepositAmountChange = () => {
    setSecurityDepositAmount(selectedAppartmentDetails.securityDeposit);
  };

  const handleConfirmSecurityDepositPaid = (event) => {
    setSecurityDepositPaid(event.target.checked);
  };

  return (
    <Box m='20px'>
      <Header
        title={"CREER UN NOUVEAU CONTRAT DE LOCATION"}
        subtitle={"Associer un locataire à un appartement"}
      />
      <Box m="50px">
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>
              Choisir un appartement :
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 280 }}>
            <InputLabel id="appartment-select-label">
              Appartement
            </InputLabel>
            <Select
              labelId="appartment-select-label"
              id="appartment-select"
              value={selectedAppartment}
              onChange={handleAppartmentChange}
            >
              {availableAppartments.map(appartment => (
                <MenuItem key={appartment.id} value={appartment.id}>
                  {appartment.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant='h5'>
              Choisir un locataire à associer : 
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 280 }}>
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
          <TextField 
            id='securityDepositAmount'
            label='Payer le dépôt de sécurité du logement'
            type='number'
            value={securityDepositAmount}
            onChange={handleSecurityDepositAmountChange}
            fullWidth
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={securityDepositPaid}
                onChange={handleConfirmSecurityDepositPaid}
              /> 
            }
            label='Confirmer le paiement du dépôt de sécurité par le locataire'
          />
          <Button 
          sx={{
            fontWeight: 'bold',
          }}
            variant="contained" 
            startIcon={<AssignmentReturnedOutlinedIcon/>}
            onClick={handleSubmit}>
                Générer le bail de location
          </Button>
      </Box>
      </Box>
    </Box>
  )
}

export default GenerateLeaseContract