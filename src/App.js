import './App.css';
import { useState } from'react';
import { Routes, Route } from'react-router-dom';
import AgencyComponent from './components/AgencyComponent';
import { ColorModeContext, useMode } from './components/UI/Themes/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './components/Global/Topbar';
import Sidebar from './components/Global/Sidebar';




function App() {
  const [theme, colorMode] = useMode(); 
  const [isSidebar, SetIsSidebar] = useState(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className='app'> 
       <Sidebar isSidebar={isSidebar}/>
          <main className='content'>
            <Topbar SetIsSidebar={SetIsSidebar} />
            <Routes>
              <Route path='/' element={<AgencyComponent />} />
            </Routes>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  ); 
}

export default App;
