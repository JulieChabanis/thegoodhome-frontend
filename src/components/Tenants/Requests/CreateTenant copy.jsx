import React, { useState } from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';


const CreateTenantCopy = () => {
  
  const validateSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
    lastname: yup.string().required('Lastname is required').min(2, 'Lastname must be at least 2 characters long'),
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    phone: yup.integer().required('Phone is required').min(10, 'Phone must be at least 10 characters long').max(10, 'Phone must be at most 10 characters long'),
  })

  const TextFieldProps = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <TextField
        label={label}
        {...field}
        {...props}
        error={meta.touched && meta.error}
        helperText={meta.touched && meta.error}
      />
    );
  }

  return (
    <Formik 
      initialValues= {{
        name:'',
        lastname:'',
        email:'',
        phone:'',
      }} 
      validationSchema= {validateSchema}
      onSubmit={ data => {
        console.log(data);

        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastname', data.lastname);
        formData.append('email', data.email);
        formData.append('phone', data.phone);

        axios ({
          method: 'post',
          url: 'http://localhost:5000/api/v1/tenants',
          data: formData,
          headers: {
            'Content-Type':'multipart/form-data'
          }
        })
        .then(function (response) {
          // handle success
          console.log(response);
          alert('Tenant Created Successfully');
        })
        .catch (function (response) {
          // handle error
          console.log(response);
        });
      }}>
      { formik => (
        <Form>
        <Field>
          <TextField TextFieldProps>
          </TextField>
        </Field>
      </Form>
     )}
    </Formik>
  )
}

export default CreateTenantCopy;
