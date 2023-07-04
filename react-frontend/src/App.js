import './App.css';
import { useState, useEffect } from 'react'
import Donate from './components/Donate.js';
import Readme from './components/readme.js';
import Deploy from './components/Deploy.js';
import CreateCampaign from './components/CreateCampaign';

function App() {

  const [currentAddress, setCurrentAddress] = useState(null);
  const [allContracts, setAllContracts] = useState(null);
  const [currentContract, setCurrentContract] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [campaigns, setCampaigns] = useState({});


  function handleAddressSelect(e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <section className='main-input'>
      <Readme />
      <Deploy />

      {/* {(allAddresses && currentAddress && Object.keys(campaigns).length > 0) &&
        <Donate
          deployedAddress={deployedAddress}
          allAddresses={allAddresses}
          currentContract={currentContract}
          setCurrentContract={setCurrentContract}
          allContracts={allContracts}
          campaigns={campaigns}
        />}
      {Object.keys(campaigns).length > 0 && <ListCampaigns campaigns={campaigns} />} */} 
    </section>
  );
}

export default App;