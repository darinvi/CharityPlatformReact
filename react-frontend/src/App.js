import './App.css';
import {useState} from 'react'

import FetchAddresses from './components/fetchAddresses.js';
import Test from './components/test.js';

function App() {

  const [currentAddress, setCurrentAddress] = useState(null)

  function handleAddressSelect (e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <div>
      <FetchAddresses currentAddress={currentAddress} handleAddressSelect={handleAddressSelect}/>
      <Test />
    </div>
  );
}

export default App;
