import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import TenantService from '../../../api/TenantService';

// UPDATE a tenant with a PUT request
const UpdateTenant = ({ tenant }) => {
  const [values, setValues] = useState ({
    name: tenant.name,
    lastname: tenant.lastname,
    email: tenant.email,
    phone: tenant.phone,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setValues ({
      name: tenant.name,
      lastname: tenant.lastname,
      email: tenant.email,
      phone: tenant.phone,
    });
  }, [tenant]);

  const formik = useFormik({
    initialValues: {values},
    validationSchema: Yup.object({
      name: Yup.string().required('Le nom est requis'),
      lastname: Yup.string().required('Le prénom est requis'),
      email: Yup.string().email('Email invalide').required("L'email est requis"),
      phone: Yup.string().required("Le numéro de téléphone est requis").matches(/^[0-9]{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      TenantService.updateTenant(values)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(false);
        })
    }
  });

  const handleUpdateTenant = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  }


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
        Modifier le locataire {tenant.name} {tenant.lastname}
      </Typography>
      <form onSubmit={handleUpdateTenant}>
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
          label="Téléphone"
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          sx={{ mt: 3 }}
        >
          {formik.isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
        </Button>
      </form>
    </Box>
);
};

export default UpdateTenant;