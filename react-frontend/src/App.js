import './App.css';
import {useState} from 'react'

function App() {

  const [data, setData] = useState(null)

  const render_addresses = data.map( e => {
    if(e.length > 1){
      return <option>{e}</option>
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
    <div className="App">
      <button onClick={handleButtonClick}>Fetch</button>
      {data && <select>{render_addresses}</select>}
    </div>
  );
}

export default App;
