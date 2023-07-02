import { useState } from 'react'
import CreateCampaign from './CreateCampaign';

export default function Deploy(props) {

    const [loading, setLoading] = useState(false);
    const [deployed, setDeployed] = useState(false);

    function handleButtonClick() {
        setLoading(true);
        setLoading(false);

    return (
        <div>
            <button onClick={handleButtonClick} disabled={deployed}>deploy with deployer </button>
            {loading && <h1>Loading...</h1>}
            {(props.deployedAddress && !loading) && <h1>Successfully deployed at: {props.deployedAddress}</h1>}
            {deployed && <CreateCampaign
                deployedAddress={props.deployedAddress}
                allAddresses={props.allAddresses}
                campaigns={props.campaigns}
                setCampaigns={props.setCampaigns}
            />}
        </div>
    );
}

