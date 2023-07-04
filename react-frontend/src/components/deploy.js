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
      props.handleDeployment[1](deployedContract.address);
    }
  }

  const buttonVisibility = !selectedAddress || props.handleDeployment[0]

  return (
    <>
    <section className='deploy-section'>
      <AddressSelect
        labelID='deployer-select'
        labelText='Select deployer'
        setAddress={setSelectedAddress}
      />
      <button onClick={handleButtonClick} disabled={buttonVisibility}>deploy with deployer </button>
      {props.handleDeployment[0] && <h3>Charity Platform deployed at: {props.handleDeployment[0]}</h3>}
    </section>

    { props.handleDeployment[0] && <CreateCampaign contractAddress={props.handleDeployment[0]} campaignSetter={props.campaignSetter} />}
    </>
  );
}

