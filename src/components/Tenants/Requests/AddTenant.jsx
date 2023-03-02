import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';

// Create a POST request FORM to add Tenant
const CreateTenant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le nom est requis'),
      lastname: Yup.string().required('Le prénom est requis'),
      email: Yup.string().email('Email invalide').required('L\'email est requis'),
      phone: Yup.string().required('Le numéro de téléphone est requis').matches(/^[0-9]{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      axios.post('http://localhost:8080/api/tenants', values)
        .then(res => {
          console.log(res.data);
          setSubmitting(false);
          window.location.reload(); // recharger la page après avoir effectué la requête POST
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  });

  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: '70%',
      borderRadius: 2,
      boxShadow: 24,
      background: `${colors.blue[700]} !important`,
      p: 4,
    }}>
      <Typography variant='h2' color={colors.grey[100]} sx={{
        fontWeight: 400,
        mb: 3,
      }}>
        Ajouter un locataire
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          fullWidth
          id="name"
          name="name"
          label="Nom"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin='normal'
          fullWidth
          id="lastname"
          name="lastname"
          label="Prénom"
          variant="outlined"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        <TextField
          margin='normal'
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin='normal'
          fullWidth
          id="phone"
          name="phone"
          label="Telephone"
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formik.isSubmitting}
          >
          {formik.isSubmitting ? 'En cours...' : 'Ajouter'}
          </Button>
          </form>
          </Box>
          );
          };
          
          export default CreateTenant;