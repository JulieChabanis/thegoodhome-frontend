import { Button, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const HeroPage = () => {
  const theme = useTheme();

  return (
    <Box height='100%'>
      <Box
        sx={{
          position: 'relative',
          height: '90%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL}../../assets/appartment8.jpg)`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'inherit',
            zIndex: '2',
          }}
        >
          <Typography
            fontSize='7rem'
            fontWeight='bold'
            color='text.primary'
            sx={{ letterSpacing: '-3px', lineHeight: '0.9' }}
          >
            The _
          </Typography>
          <Typography
            fontSize='10rem'
            fontWeight='bold'
            color='text.primary'
            sx={{ letterSpacing: '-8px', lineHeight: '0.7' }}
          >
            Good
          </Typography>
          <Typography
            fontSize='9rem'
            fontWeight='bold'
            color='text.primary'
            sx={{ letterSpacing: '-8px', lineHeight: '0.8' }}
          >
            home
          </Typography>
          <Button
            variant='outlined'
            size='large'
            component={Link}
            to='/appartments'
            sx={{
              marginTop: '3rem',
              color: theme.palette.mode === 'light' ? 'primary' : 'white',
              backgroundColor: theme.palette.mode === 'light' ? 'transparant' : 'transparent',
              border: theme.palette.mode === 'light' ? '1px solid primary' : '1px solid white',
              fontWeight: 'bold',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                border: theme.palette.mode === 'light' ? '1px solid primary' : '1px solid white',
              },
            }}
          >
            Tester l'application en tant qu'agence
          </Button>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            zIndex: '1',
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroPage;


