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


  function handleAddressSelect(e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <div>
      <FetchAddresses
        currentAddress={currentAddress}
        handleAddressSelect={handleAddressSelect}
        allAddresses={allAddresses}
        setAllAddresses={setAllAddresses}
      />
      {currentAddress &&
        <Deploy
          deployer={currentAddress}
          allAddresses={allAddresses}
          allContracts={allContracts}
          setAllContracts={setAllContracts}
        />}
      {}
      {(allAddresses && currentAddress) &&
        <Contribute
          allAddresses={allAddresses}
          currentContract={currentContract}
          setCurrentContract={setCurrentContract}
          allContracts={allContracts}
        />}
    </div>
  );
}

export default App;