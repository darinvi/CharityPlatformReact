import { useState } from 'react'
import AddressSelect from './AddressSelect';
import useFactory from '../hooks/useFactory';
import CreateCampaign from './CreateCampaign';

export default function Deploy(props) {

  const [selectedAddress, setSelectedAddress] = useState(null);
  
  // const [loading, setLoading] = useState(null)
  const factory = useFactory(selectedAddress)

  async function handleButtonClick() {
    if (factory){
      const deployedContract = await factory.deploy();
      await deployedContract.deployed();
      props.setDeploymentAddress(deployedContract.address);
    }
  }

  const buttonVisibility = !selectedAddress || props.deploymentAddress

  return (
    <>
    <section className='deploy-section'>
      <AddressSelect
        labelID='deployer-select'
        labelText='Select deployer'
        setAddress={setSelectedAddress}
      />
      <button onClick={handleButtonClick} disabled={buttonVisibility}>deploy with deployer </button>
      {props.deploymentAddress && <h3>Charity Platform deployed at: {props.deploymentAddress}</h3>}
    </section>

    { props.deploymentAddress && <CreateCampaign contractAddress={props.deploymentAddress} campaignSetter={props.campaignSetter} />}
    </>
  );
}

