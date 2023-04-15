import React, { forwardRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import AgencyService from '../../../api/AgencyService';

// Create a POST request FORM to add Agency
const CreateAgency = forwardRef((props, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      additionalAddress: '',
      city: '',
      zipcode: '',
      description: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le nom est requis'),
      address: Yup.string().required('Adresse requise'),
      additionalAddress: Yup.string().required('Adresse additionnelle requise'),
      city: Yup.string().required('La ville est requise'),
      zipcode: Yup.string().required('Le Code Postal est requis').matches(/^\d{5}$/, 'le code postal doit contenir 5 chiffres'),
      description: Yup.string().required('La description est requise')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      AgencyService.createAgency(values)
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
        Ajouter une Agence
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          fullWidth
          id="name"
          name="name"
          label="Nom de l'Agence"
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
          id="address"
          name="address"
          label="Adresse"
          variant="outlined"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          margin='normal'
          fullWidth
          id="additionalAddress"
          name="additionalAddress"
          label="Adresse additionnelle"
          variant="outlined"
          value={formik.values.additionalAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.additionalAddress && Boolean(formik.errors.additionalAddress)}
          helperText={formik.touched.additionalAddress && formik.errors.additionalAddress}
        />
        <TextField
          margin='normal'
          fullWidth
          id="city"
          name="city"
          label="Ville"
          variant="outlined"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          margin='normal'
          fullWidth
          id="zipcode"
          name="zipcode"
          label="Code Postal"
          variant="outlined"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
          helperText={formik.touched.zipcode && formik.errors.zipcode}
        />
                <TextField
          margin='normal'
          fullWidth
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
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
          });
          
          export default CreateAgency;