import './App.css';
import {useState} from 'react'

function App() {

  const [data, setData] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)

  const render_addresses = data && data.map( e => {
    if(e.length > 1){
      const replaced = e.replace(/['\,]/g, '');
      return <option value={replaced}>{replaced}</option>
    }
  })

  function handleButtonClick(){
    fetch('http://localhost:5000/get-addresses')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.output);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function handleAddressSelect (e) {
    setCurrentAddress(e.target.value);
  }

  return (
    <div className="App">
      <button onClick={handleButtonClick}>Fetch HH Addresses</button>
      {data && <select onChange={handleAddressSelect}>{render_addresses}</select>}
      {currentAddress && <h1>{currentAddress}</h1>}
    </div>
  );
}

export default App;
