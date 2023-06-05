import {useState} from 'react'

export default function FetchAddresses(props) {

  const [data, setData] = useState(null)
  

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

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch HH Addresses</button>
      {data && <select onChange={props.handleAddressSelect}>{render_addresses}</select>}
      {props.currentAddress && <h1>Current Address: {props.currentAddress}</h1>}
    </div>
  );
}

