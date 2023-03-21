import React, { useState, useEffect } from 'react'
import { Box, Button, TextField} from "@mui/material";
import Header from '../../Global/Header';
import { useFormik } from 'formik';
import TenantService from '../../../api/TenantService';

const UpdateTenant = ({match}) => {
  const [tenant, setTenant] = useState(null);


  useEffect(() => {
    TenantService.getTenants(match.params.id)
    .then (response => {
      setTenant({ ...response.data, id: match.params.id });
    })
    .catch (error => console.log(error));
  }, [match.params.id]);

  const formik = useFormik({
    initialValues: {
      name: "", 
      lastname: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      TenantService.updateTenant(tenant.id, values)
      .then (response => console.log(response))
      .catch (error => console.log(error));
    }
    })

  return (
    <Box m="20px">
      <Header 
        title="MODIFIER UN LOCATAIRE"
        subtitle="Mise à jour du locataire"
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColums="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            id="name"
            name="name"
            label="Prénom"
            value={formik.values.name || tenant.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            id="lastname"
            name="lastname"
            label="Nom de Famille"
            value={formik.values.lastname || tenant.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email || tenant.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            id="phone"
            name="phone"
            label="Telephone"
            value={formik.values.phone || tenant.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
            Mettre à jour la fiche locataire
        </Button>
        </Box>
      </form>
    </Box>
  )
}

export default UpdateTenant