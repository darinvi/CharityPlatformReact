import './App.css';
import { useState, useEffect } from 'react'
import Deploy from './components/Deploy.js';
import ListCampaigns from './components/ListCampaigns'

function App() {

  const [deployedAddress, setDeployedAddress] = useState(null);

  return (
    <section className='App'>
      <div className='background'></div>
      <section className='main-section'>
        <Deploy deploymentAddress={deployedAddress} setDeploymentAddress={setDeployedAddress} />
      </section>
      {deployedAddress &&
        <div className='list-campaigns'>
          <ListCampaigns contractAddress={deployedAddress} />
        </div>
      }
    </section>
  );
}

export default App;