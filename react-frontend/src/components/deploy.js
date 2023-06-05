import { useState } from 'react'
import CreateCampaign from './createCampaign';

export default function Deploy(props) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [deployed, setDeployed] = useState(false);

    function handleButtonClick() {
        setLoading(true);
        fetch(`http://localhost:5000/deploy-contract?address=${props.deployer}`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData.output);
                setLoading(false);
                setDeployed(true);
            })
            .catch((error) => {
                console.log('Error:', error);
                setLoading(false);
            });
    }

    return (
        <div>
            <button onClick={handleButtonClick} disabled={deployed}>deploy with deployer </button>
            {loading && <h1>Loading...</h1>}
            {(data && !loading) && <h1>Successfully deployed at: {data}</h1>}
            {deployed && <CreateCampaign allAddresses={props.allAddresses}/>}
        </div>
    );
}

