import React, {forwardRef} from 'react'; 
import { TextField, Box, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import AppartmentService from '../../../api/AppartmentService';
import Header from '../../Global/Header';


const CreateAppartment = forwardRef ((props, ref) => {

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
      available: '',
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
      available: Yup.boolean(),
      image: Yup.mixed().required("Une image est requise"),
    }), 

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      AppartmentService.createAppartment(values)
        .then(res => {
          console.log(res.data);
          setSubmitting(false);
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
          display="grid"
          gap="20px"
          gridTemplateColums="repeat(4,minmax(0, 1fr)"
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
          sx={{ gridColumn: "span 1" }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          sx={{ gridColumn: "span 2" }}
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
          sx={{ gridColumn: "span 1" }}
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
          sx={{ gridColumn: "span 1" }}
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
          sx={{ gridColumn: "span 1" }}
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
          sx={{ gridColumn: "span 1" }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="rental"
          name="rental"
          label="rental"
          value={formik.values.rental}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rental && Boolean(formik.errors.rental)}
          helperText={formik.touched.rental && formik.errors.rental}
          sx={{ gridColumn: "span 3" }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="rentalCharges"
          name="rentalCharges"
          label="rentalCharges"
          value={formik.values.rentalCharges}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rentalCharges && Boolean(formik.errors.rentalCharges)}
          helperText={formik.touched.rentalCharges && formik.errors.rentalCharges}
          sx={{ gridColumn: "span 3" }}
          />
          <TextField
          fullWidth
          variant="filled"
          id="securityDeposit"
          name="securityDeposit"
          label="securityDeposit"
          value={formik.values.securityDeposit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.securityDeposit && Boolean(formik.errors.securityDeposit)}
          helperText={formik.touched.securityDeposit && formik.errors.securityDeposit}
          sx={{ gridColumn: "span 3" }}
          />
          <FormControl variant="filled" fullWidth>
            <InputLabel hmtlFor="available">Le bien est-il disponible à la location ?</InputLabel>
            <Select
              id="available"
              name="available"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.available && Boolean(formik.errors.available)}
              label="Disponibilité"
            >
              <MenuItem value={true}>Disponible</MenuItem>
              <MenuItem value={false}>Non disponible</MenuItem>
            </Select>
          </FormControl>

          
          <input
          type='file'
          name='image'
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
          />
          <Button
          type="submit"
          fullWidth
          variant="contained"
          >
            {formik.isSubmitting ? 'En cours...' : 'Ajouter'}
          </Button>
        </Box>
      </form>
    </Box>
  )
});

export default CreateAppartment; 