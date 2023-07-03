import './App.css';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import AddressSelect from './components/AddressSelect.js';
import Donate from './components/Donate.js';
import Readme from './components/readme.js';
import ListCampaigns from './components/ListCampaigns.js'
import Deploy from './components/Deploy.js';
import { useProvider } from './hooks/Provider';
import { useAccounts } from './hooks/Accounts';

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
    <div>
      <Readme />
      <Deploy />

      {/* {currentAddress &&
        <Deploy
          deployedAddress={deployedAddress}
          setDeployedAddress={setDeployedAddress}
          deployer={currentAddress}
          allAddresses={allAddresses}
          allContracts={allContracts}
          setAllContracts={setAllContracts}
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          Provider={provider}
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
      {Object.keys(campaigns).length > 0 && <ListCampaigns campaigns={campaigns} />} */}
    </div>
  );
}

export default App;