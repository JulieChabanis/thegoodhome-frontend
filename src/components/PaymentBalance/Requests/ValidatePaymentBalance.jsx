import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Global/Header';
import PaymentBalanceService from '../../../api/PaymentBalanceService';
import LeaseContractService from '../../../api/LeaseContractService';
import { Paper, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';


const ValidatePaymentBalance = () => {
  const navigate = useNavigate(); 
  const [leaseContracts, setLeaseContracts] = useState([]);
  const [selectedLeaseContract, setSelectedLeaseContract] = useState('');
  const [leaseContractDetails, setLeaseContractDetails] = useState(null);
  const currentDate = new Date(); 
  const isoDate = currentDate.toISOString();

  useEffect(() => {
    getLeaseContracts();
  }, []);

  useEffect(() => {
    if (selectedLeaseContract) {
      getLeaseContractDetails(selectedLeaseContract);
    }
  }, [selectedLeaseContract]);

  const getLeaseContracts = () => {
    LeaseContractService.getAllLeaseContracts()
      .then(response => {
        setLeaseContracts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getLeaseContractDetails = (id) => {
    LeaseContractService.getLeaseContractById(id)
      .then(response => {
        setLeaseContractDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    const paymentBalance = {
      leaseContractsEntity: { id: selectedLeaseContract },
      isPaid: false,
      paymentDate: isoDate,
    };
    // TODO: Save payment balance to backend
  };


  return (
    <Box m='20px'>
      <Header
        title={"Compléter un suivi de paiement"}
        subtitle={"Compléter un suivi de paiement"}
      />
      <Box m="50px">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5' sx={{ mb: 1 }}>
            Sélectionner un contrat de location :
          </Typography>
          <FormControl color="secondary" sx={{ m: 1, minWidth: 280 }}>
            <InputLabel id="appartment-select-label">
              Contrats de location
            </InputLabel>
            <Select
              labelId="lease-contracts-select-label"
              id="lease-contracts-select"
              value={selectedLeaseContract}
              onChange={(event) => setSelectedLeaseContract(event.target.value)}
            >
              {leaseContracts.map(leaseContract => (
                <MenuItem key={leaseContract.id} value={leaseContract.id}>
                  {leaseContract.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {leaseContractDetails && (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
        <Typography variant='h3'>
            Informations du contrat de location sélectionné :
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Paper elevation={3} sx={{ m:2, p: 2, borderRadius: 2, border: '1px solid #f2f0f0', color: '#3d3d3d', bgcolor: '#f2f0f0' }}>
                <Typography variant='h4' mb='10px' fontWeight='bold'>
                    Locataire actuel :
                </Typography>
                <Typography variant='h5'fontWeight='bold'>
                    {`${leaseContractDetails.tenantEntity.name} ${leaseContractDetails.tenantEntity.lastName}` }
                </Typography>
                <Typography variant='h6'>
                    {`${leaseContractDetails.tenantEntity.email}` }
                </Typography>
                <Typography variant='h6'>
                    {`Tel : ${leaseContractDetails.tenantEntity.phone}` }
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ m:2, p: 2, borderRadius: 2, border: '1px solid #f2f0f0', color: '#3d3d3d', bgcolor: '#f2f0f0' }}>
                <Typography variant='h4' mb='10px' fontWeight='bold'>
                    Bien Loué :
                </Typography>
                <Typography variant='h5'fontWeight='bold'>
                    {`Appartement: ${leaseContractDetails.appartmentEntity.title}`}
                </Typography>
                <Typography variant='h6'>
                    {`Prix du loyer/mois CC : ${leaseContractDetails.appartmentEntity.rental}€`}
                </Typography>
                <Typography variant='h6'>
                    {`Addresse : ${leaseContractDetails.appartmentEntity.address} ${leaseContractDetails.appartmentEntity.zipcode} ${leaseContractDetails.appartmentEntity.city}`}
                </Typography>
            </Paper>
        </Box>
    </Box>
)}


        </Box>
      </Box>
    </Box>
  );
};

export default ValidatePaymentBalance;
