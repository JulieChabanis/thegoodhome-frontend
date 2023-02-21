import './App.css';
import AgencyComponent from './components/AgencyComponent';
import { ColorModeContext, useMode } from './components/UI/Themes/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const [theme, colorMode] = useMode(); 

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className='app'> 
          <main className='content'>
          <AgencyComponent/>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  ); 
}

export default App;
