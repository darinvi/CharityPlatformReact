import { useState } from 'react'
import AddressSelect from './AddressSelect';
import { useProvider } from '../hooks/Provider';
import Contract from '../contract-artifacts/CharityPlatform.json';
import { ethers } from 'ethers';


export default function Deploy(props) {

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const provider = useProvider()
  const abi = Contract.abi;
  const bytecode = Contract.bytecode;
  const contractFactory = deployedAddress && new ethers.ContractFactory(abi, bytecode, provider.getSigner(selectedAddress))
  let deployedContract;

  async function handleButtonClick() {
    deployedContract = await contractFactory.deploy()
    await deployedContract.deployed();
    setDeployedAddress(deployedContract.address)
  }

  return (
    <div>
      <AddressSelect
        labelID='deployer-select'
        labelText='Select deployer'
        setAddress={setSelectedAddress}
      />

      <button onClick={handleButtonClick} disabled={false}>deploy with deployer </button>
    </div>
  );
}

