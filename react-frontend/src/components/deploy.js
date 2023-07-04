import { useState } from 'react'
import AddressSelect from './AddressSelect';
import useFactory from '../hooks/useFactory';
import CreateCampaign from './CreateCampaign';

export default function Deploy(props) {

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  // const [loading, setLoading] = useState(null)
  const factory = useFactory(selectedAddress)

  async function handleButtonClick() {
    if (factory){
      const deployedContract = await factory.deploy();
      await deployedContract.deployed();
      setDeployedAddress(deployedContract.address);
    }
  }

  const buttonVisibility = !selectedAddress || deployedAddress

  return (
    <>
    <section className='deploy-section'>
      <AddressSelect
        labelID='deployer-select'
        labelText='Select deployer'
        setAddress={setSelectedAddress}
      />
      <button onClick={handleButtonClick} disabled={buttonVisibility}>deploy with deployer </button>
      {deployedAddress && <h3>Charity Platform deployed at: {deployedAddress}</h3>}
    </section>

    { deployedAddress && <CreateCampaign contractAddress={deployedAddress} />}
    </>
  );
}

