import React, { useEffect} from "react"; 
import { FormControl } from "@mui/material";
import { Box, Switch, Card, Button, CardActionArea, CardActions, useTheme } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TenantService from "../../api/TenantService";
import { tokens } from "../UI/Themes/theme";


export default function TenantCard(props) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tenants, setTenants] = useState([])

  useEffect(() => {
    getAgencies()
  }, []);

  const getTenants = () => {
      TenantService.getTenants()
      .then(response => {
        setAgencies(response.data)
        console.log(response.data);
      })
    .catch(error => {
        console.log(error);
      });
  }; 

  const tenant = {
    id,
    name, 
    lastname, 
    email, 
    phone
  } = props; 

console.log('TenantCard rowSelected', rowSelected);

useEffect(() => {
  if (rowSelected > 1) {
    window.scrollTo(0, 595 * (rowSelected - 1) + 240);
  }
}, [rowSelected]);
    
return  (
  <Box>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
        <Box>
          {
           tenant.map(
              tenants =>
              <Box key={ tenants.id}>
                <Box key={tenants.id} />
                <Box key={tenants.name} />
                <Box key={tenants.lastname} />
                <Box key={tenants.email} />
                <Box key={tenants.phone} />
              </Box>
          )}
        </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  </Box>

)

}
