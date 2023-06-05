import './App.css';
import {useState} from 'react'

import FetchAddresses from './components/fetchAddresses.js';
import Deploy from './components/deploy.js';

function App() {

  const [currentAddress, setCurrentAddress] = useState(null)

  function handleAddressSelect (e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <div>
      <FetchAddresses currentAddress={currentAddress} handleAddressSelect={handleAddressSelect}/>
      {currentAddress && <Deploy deployer={currentAddress}/>}
    </div>
  );
}

export default App;