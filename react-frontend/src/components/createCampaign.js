import { useState } from 'react'
import AddressSelect from './AddressSelect';
import useContract from '../hooks/useContract';

export default function CreateCampaign(props) {

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [goal, setGoal] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const contract = useContract(props.contractAddress, selectedAddress);


  const buttonVisibility = name && description && goal && duration && selectedAddress;

  function handleCampaignCreation() {
    if (contract){
      contract.createCharity(name, description, goal, duration)
    }  
  }

  return (
    <section className='campaign-section'>
      <AddressSelect
        labelID='creator-select'
        labelText='Select campaign creator'
        setAddress={setSelectedAddress}
      />

      <input type='text' value={name} placeholder='campaign name' onChange={(e) => { setName(e.target.value) }}></input>
      <input type='text' value={description} placeholder='campaign description' onChange={(e) => { setDescription(e.target.value) }}></input>
      <input type='number' value={goal} placeholder='funding goal' onChange={(e) => { setGoal(e.target.value) }}></input>
      <input type='number' value={duration} placeholder='duration' onChange={(e) => { setDuration(e.target.value) }}></input>
      <button onClick={handleCampaignCreation} disabled={!buttonVisibility}>Create campaign</button>
      {loading && <h1>Loading...</h1>}
    </section>
  );
}

