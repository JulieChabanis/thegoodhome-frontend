import './App.css';
import { useState } from'react';
import { Routes, Route } from'react-router-dom';
import { ColorModeContext, useMode } from './components/UI/Themes/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Global Components
import Topbar from './components/Global/Topbar';
import MyProSidebar from './components/Global/Sidebar';
import Dashboard from './components/Dashboard';

// Import API Data from Data Grid
import AgenciesList from './components/Agencies/index';
import TenantsList from './components/Tenants/index';
import AppartmentsList from './components/Appartments/index';
import LeaseContractsList from './components/LeaseContracts/index';
import PaymentBalancesList from './components/PaymentBalance/index';

import CreateAppartment from './components/Appartments/Requests/CreateAppartment';
import CardInfosAppart from './components/Appartments/CardInfosAppart';
import GenerateLeaseContract from './components/LeaseContracts/Requests/GenerateLeaseContract';
import ValidatePaymentBalance from './components/PaymentBalance/Requests/ValidatePaymentBalance';


function App() {
  const [theme, colorMode] = useMode(); 
  const [isSidebar, SetIsSidebar] = useState(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className='app'> 
          <MyProSidebar isSidebar={isSidebar}/>
          <main className='content'>
            <Topbar SetIsSidebar={SetIsSidebar} />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/tenants' element={<TenantsList />} />
              <Route path='/appartments' element={<AppartmentsList />} />
              <Route path='/appartments/ajouter' element={<CreateAppartment />} />
              <Route path='/appartments/:id' element={<CardInfosAppart />} />
              <Route path='/ajouter-contrat' element={<GenerateLeaseContract/>} />
              <Route path='/contracts' element={<LeaseContractsList/>} />
              <Route path='/soldes-paiements' element={<PaymentBalancesList />} />
              <Route path='/valider-paiement' element={<ValidatePaymentBalance />} />
              <Route path='/agencies' element={<AgenciesList />} />
            </Routes>
          </main>
        </div>
        </ThemeProvider>
        <ToastContainer />
    </ColorModeContext.Provider>
  ); 
}

export default App;
