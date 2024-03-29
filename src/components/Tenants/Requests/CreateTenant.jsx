import React, { forwardRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import * as Yup from 'yup';
import { tokens } from '../../UI/Themes/theme';
import TenantService from '../../../api/TenantService';
import { toast } from 'react-toastify';


// Create a POST request FORM to add Tenant
const CreateTenant = forwardRef((props, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le nom est requis'),
      lastName: Yup.string().required('Le prénom est requis'),
      email: Yup.string().email('Email invalide').required('L\'email est requis'),
      phone: Yup.string()
        .required('Le numéro de téléphone est requis')
        .matches(/^[0-9]{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      TenantService.createTenant(values)
        .then(res => {
          console.log(res.data);
          setSubmitting(false);
          navigate ('/ajouter-contrat');
          toast.success('Locataire ajouté avec succès', {
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
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  });

  return (
    <Box ref={ref} sx={{
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
          onChange={(e) => {
            const inputVal = e.target.value;
            const regex = /^[a-zA-ZÀ-ÿ]+$/; // A-Z Alphabet
            if (regex.test(inputVal)) {
              const formattedVal = inputVal.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
              formik.setFieldValue('name', formattedVal);
            }
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin='normal'
          fullWidth
          id="lastName"
          name="lastName"
          label="Prénom"
          variant="outlined"
          value={formik.values.lastName}
          onChange={(e) => {
            const inputVal = e.target.value;
            const regex = /^[a-zA-ZÀ-ÿ]+$/; // permet uniquement les lettres de A à Z et les accents
            if (regex.test(inputVal)) {
              const formattedVal = inputVal.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
              formik.setFieldValue('lastName', formattedVal);
            }
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          margin='normal'
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={(event) => {
            formik.setFieldValue(
              "email",
              event.target.value.toLowerCase()           
            );
          }}
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
          onChange={(event) => {
            const phoneNumber = event.target.value.replace(/\D/g, '').slice(0, 10);
            formik.setFieldValue('phone', phoneNumber);
          }}
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
})
          
export default CreateTenant;