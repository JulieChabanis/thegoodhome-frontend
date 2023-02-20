import React, { useState, useEffect} from 'react';
import AgencyService from '../services/AgencyService';

function AgencyComponent() {

  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    getAgencies()
  }, []);

  const getAgencies = () => {
    AgencyService.getAgencies()
    .then(response => {
        setAgencies(response.data)
        console.log(response.data);
      })
    .catch(error => {
        console.log(error);
      });
  }; 

  return (
    <div className="container">
      <h1 className="text-center">Agencies List</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Agency Id</th>
            <th>Agency Name</th>
            <th>Agency Address</th>
            <th>Agency Additional Address</th>
            <th>Agency City</th>
            <th>Agency ZipCode</th>
          </tr>
        </thead>
        <tbody>
          {
            agencies.map(
              agencies => 
              <tr key={agencies.id}>
                <td>{agencies.id}</td>
                <td>{agencies.name}</td>
                <td>{agencies.address}</td>
                <td>{agencies.city}</td>
                <td>{agencies.zipcode}</td>
              </tr>
            )
          }
     
        </tbody>

      </table>

    </div>
  )
}

export default AgencyComponent



