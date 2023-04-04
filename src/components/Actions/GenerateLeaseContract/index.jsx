import React from 'react'
import Header from '../../Global/Header'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const LeaseContract = () => {
  const navigate = useNavigate(); 

  return (
    <Box m='20px'>
      <Header
        title={"CREER UN NOUVEAU CONTRAT DE LOCATION"}
        subtitle={"Associer un locataire à un appartement"}
      />
    </Box>
  )
}

export default LeaseContract