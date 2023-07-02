import './App.css';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import FetchAddresses from './components/FetchAddresses.js';
import Deploy from './components/Deploy.js';
import Donate from './components/Donate.js';
import Readme from './components/readme.js';
import ListCampaigns from './components/ListCampaigns.js'

function App() {

  const [currentAddress, setCurrentAddress] = useState(null);
  const [allContracts, setAllContracts] = useState(null);
  const [currentContract, setCurrentContract] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [campaigns, setCampaigns] = useState({});
  
  const [provider, setProvider] = useState(null);
  const [allAddresses, setAllAddresses] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
        const accounts = await provider.listAccounts();
        setProvider(provider);
        setAllAddresses(accounts)
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounts();
  }, []);


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
        {Object.keys(campaigns).length > 0 && <ListCampaigns campaigns={campaigns}/>}
    </div>
  );
}

export default App;