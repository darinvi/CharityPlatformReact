import {useState} from 'react'

export default function Deploy(props) {

  const [data, setData] = useState(null)
  
  function handleButtonClick(){
    fetch(`http://localhost:5000/deploy?address=${props.deployer}`)
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
      <button onClick={handleButtonClick}>deploy with curr address</button>
      {data && <h1>Successfully deployed at: {data}</h1>}
    </div>
  );
}

