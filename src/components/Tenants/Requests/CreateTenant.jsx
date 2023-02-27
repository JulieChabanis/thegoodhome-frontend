import React, { useState } from 'react'; 
import { FormControl, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { tokens } from '../../UI/Themes/theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';

const CreateTenant = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [name, setName] = useState('');
  const [lastname,setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [ phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const HandleSubmit = () => {
    setLoading(true);
    const data = {
      name: name,
      lastname: lastname,
      email: email,
      phone: phone
    }
    
    axios.post('http://localhost:8080/api/v1/tenants', data)
      .then(res => {
        setData(res.data);
        setName('');
        setLastname('');
        setEmail('');
        setPhone('');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
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
      <Box
        component='form'
      >
        <form>
        <FormControl fullWidth>
            <TextField 
            margin='normal'
            required
            value={name}
            id="name"
            label="Nom" 
            variant="outlined"
            onChange={e => setName(e.target.value)}
            >
            </TextField>
            <br /> 
            <TextField required value={lastname} onChange={e => setLastname(e.target.value)} id="outlined-basid" label="Prénom" variant="outlined"></TextField>
            <br /> 
            <TextField required value={email} onChange={e => setEmail(e.target.value)} id="outlined-basid" label="Email" variant="outlined"></TextField>
            <br /> 
            <TextField required value={phone} onChange={e => setPhone(e.target.value)} id="outlined-basid" label="Telephone" variant="outlined"></TextField>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
          onClick={HandleSubmit}
          disabled={loading}
        > {loading ? 'Loading...' : 'Submit'}
        </Button>
        </form>
        </Box>
      </Box>
    )
}

export default CreateTenant;
