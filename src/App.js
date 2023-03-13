import './App.css';
import { useState } from'react';
import { Routes, Route } from'react-router-dom';
import { ColorModeContext, useMode } from './components/UI/Themes/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

// Import Global Components
import Topbar from './components/Global/Topbar';
import MyProSidebar from './components/Global/Sidebar';
import Dashboard from './components/Dashboard';

// Import API Data from Data Grid
import AgenciesList from './components/Agencies/Index';
import TenantsList from './components/Tenants';
import UpdateTenant from './components/Tenants/Requests/UpdateTenant';
import DeleteTenant from './components/Tenants/Requests/DeleteTenant';


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
              <Route path='/tenants/:id' element={<UpdateTenant />} />
              <Route path='/tenants/:id' element={<DeleteTenant />} />
              <Route path='/agences' element={<AgenciesList />} />
            </Routes>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  ); 
}

export default App;
