import './App.css';
import { useState } from 'react'

import FetchAddresses from './components/fetchAddresses.js';
import Deploy from './components/deploy.js';
import Contribute from './components/contribute.js'

function App() {

  const [currentAddress, setCurrentAddress] = useState(null);
  const [allAddresses, setAllAddresses] = useState(null);
  const [allContracts, setAllContracts] = useState(null);
  const [currentContract, setCurrentContract] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [campaigns, setCampaigns] = useState([]);


  function handleAddressSelect(e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <>
      <container>
        <div>
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
          {(allAddresses && currentAddress && campaigns.length > 0) &&
            <Contribute
              allAddresses={allAddresses}
              currentContract={currentContract}
              setCurrentContract={setCurrentContract}
              allContracts={allContracts}
              campaigns={campaigns}
            />}
        </div>
      </container>
    </>
  );
}

export default App;