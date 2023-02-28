import React, { useState, useRef, useEffect } from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

const EMAIL_REGEX = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
const PHONE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/; 

const CreateTenant = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState('');
  const [lastname,setLastname] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [ phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const validateSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
    lastname: yup.string().required('Lastname is required').min(2, 'Lastname must be at least 2 characters long'),
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters long').max(10, 'Phone must be at most 10 characters long'),
  })

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email)); 
  }, [email])

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone])

  useEffect(() => {
    setErrMsg('');
  }, [name, lastname, email, phone])


  const HandleSubmit = async (e) => {
    e.preventDefault();
      const values = {
      name: name,
      lastname: lastname,
      email: email,
      phone: phone
    }; 

    axios.post('http://localhost:8080/api/v1/tenants', values)
      .then(res => {
        setName('');
        setLastname('');
        setEmail('');
        setValidEmail('');
        setEmailFocus('');
        setPhone('');
        setValidPhone('');
        setPhoneFocus('');
        setErrMsg('');
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response.status === 400) {
           setErrMsg('Bad Request');
        } else {
          setErrMsg('Locataire non enregistré');
        }
        errRef.current.focus();
      }); 
  }
    
  return (
    <Box sx={{
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
        }}>
      <Typography variant='h2' color={colors.grey[100]} sx={{
        fontWeight: 400,
        mb: 3,
      }}>
        Ajouter un locataire
      </Typography>
      <Formik
       validationSchema={validateSchema}
       onSubmit= { values => HandleSubmit() }
       >
      <Box
        component='form'
      >
        <Form>
        <FormControl fullWidth>
            <TextField 
            margin='normal'
            required={true}
            value={name}
            ref={nameRef}
            id="name"
            label="Prénom" 
            variant="outlined"
            onChange={e => setName(e.target.value)}
            >
            </TextField>
            <br /> 
            <TextField 
              required={true}
              value={lastname} 
              onChange={e => setLastname(e.target.value)} 
              id="outlined-basid" 
              label="Nom de Famille" 
              variant="outlined">
              </TextField>
            <br /> 
            <TextField 
              required={true}
              value={email} 
              onChange={e => setEmail(e.target.value)}
              id="outlined-basid" 
              label="Email" 
              variant="outlined"
              onFocus={() => validEmail? setValidEmail(false) : setValidEmail(true)}
              onBlur={() => setEmailFocus(false)}
            >
            </TextField>
            <br /> 
            <TextField required value={phone} onChange={e => setPhone(e.target.value)} id="outlined-basid" label="Telephone" variant="outlined"></TextField>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
          onClick={HandleSubmit}
          disabled={!name || !lastname || !email || !phone ? true : false}
        > AJOUTER
        </Button>
        </Form>
        </Box>
      </Formik> 
      </Box>
    )
}

export default CreateTenant;
