import React, {forwardRef } from 'react'; 
import { InputAdornment, TextField, Box, Button, useTheme} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 
import AppartmentService from '../../../api/AppartmentService';
import Header from '../../Global/Header';
import { toast } from 'react-toastify';
import { tokens } from '../../UI/Themes/theme';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';


const CreateAppartment = forwardRef ((props, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      address: '',
      additionalAddress: '', 
      city: '',
      zipcode: '',
      rental: '',
      rentalCharges: '',
      securityDeposit: '',
    }, 

    validationSchema: Yup.object({
      title: Yup.string().required('Le Titre est requis'),
      description: Yup.string().required('La Description est requise'),
      address: Yup.string().required('Addresse requise'),
      additionalAddress: Yup.string(),
      city: Yup.string().required('la Ville est requise'),
      zipcode: Yup.string().required('Le code postal est requis'),
      rental: Yup.number().required('le prix du loyer est requis'),
      rentalCharges: Yup.number().required('les Charges du loyer sont requises'),
      securityDeposit: Yup.number().required('Les frais sont requis'),
    }), 

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      AppartmentService.createAppartment(values)
        .then(res => {
          console.log(res.data);
          setSubmitting(false);
          navigate('/appartments')
          toast.success('Appartement ajouté avec succès', {
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
        })
    }
  }); 

  return (
    <Box ref={ref} m="20px">
      <Header 
        title="AJOUTER UN APPARTEMENT"
        subtitle="Mettre en ligne un appartement à la location"
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          m="30px"
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(5,minmax(0, 1fr)"
          gridTemplateRows="repeat(2, auto)"
          sx={{ display: matches ? 'grid' : 'column',}}
        >
          <TextField
          fullWidth
          variant="filled"
          id="title"
          name="title"
          label="Titre"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ 
            gridColumn: "span 6", gridRow: "1", 
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          multiline
          rows={5}
          variant="filled"
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          sx={{ 
            gridColumn: "span 6", gridRow: "2",
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          sx={{ 
            gridColumn: "span 3", gridRow: "3",
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="additionalAddress"
          name="additionalAddress"
          label="Addresse Complémentaire"
          value={formik.values.additionalAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.additionalAddress && Boolean(formik.errors.additionalAddress)}
          helperText={formik.touched.additionalAddress && formik.errors.additionalAddress}
          sx={{ 
            gridColumn: "span 3", gridRow: "3",
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="city"
          name="city"
          label="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          sx={{ 
            gridColumn: "span 3", gridRow: "4",
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="zipcode"
          name="zipcode"
          label="zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
          helperText={formik.touched.zipcode && formik.errors.zipcode}
          sx={{ 
            gridColumn: "span 3", gridRow: "4",
            marginBottom: matches ? 'none' : '15px',
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="rental"
          name="rental"
          label="rental"
          type="number"
          value={formik.values.rental}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rental && Boolean(formik.errors.rental)}
          helperText={formik.touched.rental && formik.errors.rental}
          sx={{ 
            gridColumn: "span 3", gridRow: "5",
            marginBottom: matches ? 'none' : '15px',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="rentalCharges"
          name="rentalCharges"
          label="rentalCharges"
          type="number"
          value={formik.values.rentalCharges}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rentalCharges && Boolean(formik.errors.rentalCharges)}
          helperText={formik.touched.rentalCharges && formik.errors.rentalCharges}
          sx={{ 
            gridColumn: "span 3", gridRow: "5",
            marginBottom: matches ? 'none' : '15px',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="securityDeposit"
          type="number"
          name="securityDeposit"
          label="securityDeposit"
          value={formik.values.securityDeposit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.securityDeposit && Boolean(formik.errors.securityDeposit)}
          helperText={formik.touched.securityDeposit && formik.errors.securityDeposit}
          sx={{ 
            gridColumn: "span 3", gridRow: "6",
            marginBottom: matches ? 'none' : '15px',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          />
          <Button
          type="submit"
          fullWidth
          variant="outlined"
          startIcon={<AddIcon/>}
          sx={{
            gridColumn: "span 3", gridRow: "6",
            height: "50px",
            width: "200px",
            background: 'none',
            color: `${colors.green[400]} !important`, 
            fontWeight: 'bold',
            borderColor: `${colors.green[400]}!important`, 
            '&:hover': {
              background: `${colors.green[400]}!important`,
              color: `${colors.primary[500]}!important`, 
            }
          }}
          disabled={formik.isSubmitting}
          >
          {formik.isSubmitting ? 'En cours...' : 'Ajouter'}
          </Button>
        </Box>
      </form>
    </Box>
  )
});

export default CreateAppartment; 