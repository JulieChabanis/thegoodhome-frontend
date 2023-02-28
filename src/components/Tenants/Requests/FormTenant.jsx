import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material'
import * as yup from 'yup';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import Header from '../../../components/Global/Header'
import { Formik } from 'formik';

const FormTenant = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [name, setName] = useState('');
  const [lastname,setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [ phone, setPhone] = useState('');
  const [data, setData] = useState(null);

  const handleFormSubmit = (values) => {

    axios.post('http://localhost:8080/api/v1/tenants', values)
    .then(res => {
      setData(res.data);
      setName('');
      setLastname('');
      setEmail('');
      setPhone('');
    })
    .catch(err => {
    }); 
  }; 

  return (
    <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: '70%',
      borderRadius :2,
      boxShadow: 24,
      background: `${colors.blue[700]} !important`,
      p: 4,
        }}
    >
      <Header title='CREATE UN LOCATAIRE' subtitle="Ajouter la fiche locataire"/>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validForm}
      >
        {({ 
          values,
          errors,
          touched,
          handleChange, 
          handleBlur, 
          handleSubmit 
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Box>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={name}
                error={!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              >
              </TextField>
              </Box>
              <br />
              <Box>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Nom de Famille"
                onBlur={handleBlur}
                onChange={handleChange}
                value={lastname}
                error={!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}>
              </TextField>
              </Box>
              <br/>
              <Box>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={email}
                error={!touched.email && !!errors.email}
                helperText={touched.email && errors.email}>
              </TextField>
              </Box>
              <br/>
              <Box>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={phone}
                error={!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              >
              </TextField>
              </Box>
            </Box>
            <Box>
              <Button 
                type='submit' 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
              >
              Ajouter un Locataire
              </Button>
            </Box>
          </form> 
        )}
      </Formik>
    </Box>
  );
}; 

const phoneRegex = 
/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;


const validForm = yup.object().shape({
  name: yup.string().required('Le Prénom est requis'),
  lastname: yup.string().required('Le Nom de famille est requis'),
  email: yup.string().required('Un Email est requis').email('Invalid email'),
  phone: yup.string().required('Un Téléphone est requis').max(10, '10 Chiffres').matches(phoneRegex, 'Invalid phone number'),
}); 

const initialValues = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
};

export default FormTenant