import './App.css';
import { useState } from 'react'

import FetchAddresses from './components/fetchAddresses.js';
import Deploy from './components/deploy.js';
import Donate from './components/Donate.js';
import Readme from './components/readme.js';
import ListCampaigns from './components/listCampaigns.js'

function App() {

  const [currentAddress, setCurrentAddress] = useState(null);
  const [allAddresses, setAllAddresses] = useState(null);
  const [allContracts, setAllContracts] = useState(null);
  const [currentContract, setCurrentContract] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [campaigns, setCampaigns] = useState({});


  function handleAddressSelect(e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <div>
      <Readme />
      <FetchAddresses
        currentAddress={currentAddress}
        handleAddressSelect={handleAddressSelect}
        allAddresses={allAddresses}
        setAllAddresses={setAllAddresses}
      />
      {currentAddress &&
        <Deploy
          deployedAddress={deployedAddress}
          setDeployedAddress={setDeployedAddress}
          deployer={currentAddress}
          allAddresses={allAddresses}
          allContracts={allContracts}
          setAllContracts={setAllContracts}
          campaigns={campaigns}
          setCampaigns={setCampaigns}
        />}
      {(allAddresses && currentAddress && Object.keys(campaigns).length > 0) &&
        <Donate
          deployedAddress={deployedAddress}
          allAddresses={allAddresses}
          currentContract={currentContract}
          setCurrentContract={setCurrentContract}
          allContracts={allContracts}
          campaigns={campaigns}
        />}
        {Object.keys(campaigns).length > 0 && <ListCampaigns campaigns={campaigns}/>}
    </div>
  );
}

export default App;