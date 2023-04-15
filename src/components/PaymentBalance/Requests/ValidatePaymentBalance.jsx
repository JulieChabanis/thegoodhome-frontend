import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Global/Header';
import PaymentBalanceService from '../../../api/PaymentBalanceService';
import LeaseContractService from '../../../api/LeaseContractService';
import { Paper, Button, FormControlLabel, TextField, Checkbox, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PaidIcon from '@mui/icons-material/Paid';

const ValidatePaymentBalance = () => {
  const navigate = useNavigate(); 
  const [leaseContracts, setLeaseContracts] = useState([]);
  const [selectedLeaseContract, setSelectedLeaseContract] = useState('');
  const [leaseContractDetails, setLeaseContractDetails] = useState(null);

  const [rentalPaymentAmount, setRentalPaymentAmount] = useState(0);
  const [rentalPaymentAmountWithTax, setRentalPaymentAmountWithTax] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isCheckedBox, setIsCheckedBox] = useState(false);

  const currentDate = new Date(); 
  const isoDate = currentDate.toISOString();

  const getLeaseContracts = useCallback(() => {
    LeaseContractService.getAllLeaseContracts()
      .then(response => {
        setLeaseContracts(response.data.filter(contract => !contract.isPaid));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getLeaseContracts();
  }, [getLeaseContracts]);

  const getLeaseContractDetails = useCallback((id) => {
    LeaseContractService.getLeaseContractById(id)
      .then(response => {
        setLeaseContractDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      
  }, []);

  useEffect(() => {
    if (selectedLeaseContract) {
      getLeaseContractDetails(selectedLeaseContract);
    }
  }, [selectedLeaseContract, getLeaseContractDetails]);

  const calculateRentalPaymentAmountWithTax = (rental) => {
    return rental * 0.08; 
  }

  const handleRentalPaymentAmount = useCallback(() => {
    const rental = leaseContractDetails.appartmentEntity?.rental ?? 0;
    setRentalPaymentAmount(rental);

    const rentalWithTax = calculateRentalPaymentAmountWithTax(rental);
    setRentalPaymentAmountWithTax(rentalWithTax)
  }, [leaseContractDetails]);

  useEffect(() => {
    if (leaseContractDetails) {
      handleRentalPaymentAmount();
    }
  }, [leaseContractDetails, handleRentalPaymentAmount]);

  const handleConfirmRentalPayment = (event) => {
    setIsPaid(event.target.checked);
    setIsCheckedBox(event.target.checked);
  }

  const handleSubmit = () => {
    const paymentBalance = {
      leaseContractEntity: { id: selectedLeaseContract },
      rentalPaymentAmount : rentalPaymentAmount,
      isPaid: isPaid,
      rentalPaymentAmountWithTax : rentalPaymentAmountWithTax,
      paymentDate: isoDate,
    };
    
    PaymentBalanceService.createPaymentBalance(paymentBalance)
    .then(() => {
      navigate('/soldes-paiements');
      toast.success('Paiement de la Quittance du mois confirmé', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch(error => {
      console.log(error)
    })
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
                          {`${leaseContractDetails.appartmentEntity.title}`}
                      </Typography>
                      <Typography variant='h6'>
                          {`Prix du loyer/mois CC : ${leaseContractDetails.appartmentEntity.rental}€`}
                      </Typography>
                      <Typography variant='h6'>
                          {`Addresse : ${leaseContractDetails.appartmentEntity.address} ${leaseContractDetails.appartmentEntity.zipcode} ${leaseContractDetails.appartmentEntity.city}`}
                      </Typography>
                      <Typography variant='h6'>
                          {`Locataire depuis le : ${leaseContractDetails.createdAt}`}
                      </Typography>
                  </Paper>
              </Box>
          </Box>
          )}
        </Box>
        <FormControl fullWidth color="secondary" sx={{ ml: 1, mt: 4, mb: 4, minWidth: 280 }}>
          <TextField 
            id='rental-payment-amount'
            label='Loyer à payer CC '
            type='number'
            value={rentalPaymentAmount}
            onChange={handleRentalPaymentAmount}
          />
          <Typography>
          {`Vous allez prelever 8% de frais d'agence sur ce loyer, soit : ${rentalPaymentAmountWithTax} € ajouté à vos comptes.`}
          </Typography>
           <FormControlLabel
           sx={{mt: 3}}
            control={
              <Checkbox
                color='secondary'
                checked={isPaid}
                onChange={handleConfirmRentalPayment}
              /> 
            }
            label='Confirmer la reception paiement du loyer de ce mois-ci ?'
          />
          </FormControl>
          <Button 
            sx={{
              fontWeight: 'bold',
            }}
              color='secondary'
              variant="contained" 
              disabled={!isCheckedBox}
              startIcon={<PaidIcon/>}
              onClick={handleSubmit}
            >
                  Confirmer le paiement pour ce mois-ci
          </Button>

      </Box>
    </Box>
  );
};

export default ValidatePaymentBalance;
