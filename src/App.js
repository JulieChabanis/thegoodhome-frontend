import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';


function App() {

  const [ location, setLocation ] = useState();
  const getlocation = async () => {

    try {
      const response = await api.get('/api/v1/tenants');
      console.log(response.data);
      setLocation(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getlocation();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
