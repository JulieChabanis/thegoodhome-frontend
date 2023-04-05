import React, { useEffect, useState, useCallback } from 'react'
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

  // eslint-disable-next-line no-unused-vars
  const [ appartments, setAppartments ] = useState([]); 
  const [ selectedAppartment, setSelectedAppartment ] = useState('');
  const [ tenants, setTenants ] = useState([]);
  const [ selectedTenant, setSelectedTenant ] = useState('');
  const [ leases, setLeases ] = useState([]);
  const [availableAppartments, setAvailableAppartments ] = useState([]);
  const [securityDepositAmount, setSecurityDepositAmount] = useState(0);
  const [securityDepositPaid, setSecurityDepositPaid] = useState(false); 
  const [selectedAppartmentDetails, setSelectedAppartmentDetails] = useState({});
  const [isCheckedBox, setIsCheckedBox] = useState(false);
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  useEffect(() => {
    getTenants();
    getLeases();
  }, []);
  
  const getAppartments = useCallback(() => {
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
  }, [leases]);

  useEffect(() => {
    getAppartments();
  }, [getAppartments]);

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
    setSecurityDepositAmount(selectedAppartmentDetails?.securityDeposit ?? 0);
  };

  const handleConfirmSecurityDepositPaid = (event) => {
    setSecurityDepositPaid(event.target.checked);
    setIsCheckedBox(event.target.checked);
  };

  return (
    <Box m='20px'>
      <Header
        title={"CREER UN NOUVEAU CONTRAT DE LOCATION"}
        subtitle={"Associer un locataire à un appartement"}
      />
      <Box m="50px">
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'sx={{mb: 1}}>
              Choisir un appartement :
          </Typography>
          <FormControl  color="secondary" sx={{ m: 1, minWidth: 280 }}>
            <InputLabel id="appartment-select-label">
              Appartement
            </InputLabel>
            <Select
              labelId="appartment-select-label"
              id="appartment-select"
              value={selectedAppartment}
              onChange={handleAppartmentChange}
              required
            >
              {availableAppartments.map(appartment => (
                <MenuItem key={appartment.id} value={appartment.id}>
                  {appartment.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant='h5' sx={{ mt: 2, mb: 1}}>
              Choisir un locataire à associer : 
          </Typography>
          <FormControl  color="secondary" sx={{ m: 1, minWidth: 280}}>
            <InputLabel id="tenant-select-label">
              Locataires
            </InputLabel>
            <Select
              color="secondary"
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
          <Typography variant='h5' sx={{ mt: 2, mb: 1}}>
              Montant de la caution à payer :
          </Typography>
          <FormControl  color="secondary" sx={{ m: 1, mb: 4, minWidth: 280 }}>
          <TextField 
            id='securityDepositAmount'
            label='Dépôt de sécurité'
            type='number'
            value={securityDepositAmount}
            onChange={handleSecurityDepositAmountChange}
            fullWidth
          />
           <FormControlLabel
           sx={{mt: 3}}
            control={
              <Checkbox
                color='secondary'
                checked={securityDepositPaid}
                onChange={handleConfirmSecurityDepositPaid}
              /> 
            }
            label='Confirmer le paiement du dépôt de sécurité par le locataire ce jour'
          />
          </FormControl>
          <Button 
          sx={{
            fontWeight: 'bold',
          }}
            color='secondary'
            variant="contained" 
            disabled={!isCheckedBox}
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