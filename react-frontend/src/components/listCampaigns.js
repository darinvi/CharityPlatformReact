import { useState } from "react";
import AddressSelect from "./AddressSelect";
import useContract from "../hooks/useContract";
import Donate from "./Donate";

export default function ListCampaigns(props) {

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [campaigns, setCampaigns] = useState({})

  const contract = useContract(props.contractAddress, selectedAddress)

  async function handleButtonClick() {
    const campaignsCounter = (await contract.currCharity()).toNumber()
    const updateCampaigns = {}
    for (let i = 0; i < campaignsCounter; i++) {
      const campaignAddress = await contract.getCampaignAddress(i)
      updateCampaigns[i] = campaignAddress
    }
    setCampaigns({...updateCampaigns})
  }

  const renderCampaigns = campaigns && Object.entries(campaigns).map( e => {
    return <Donate index={e[0]} address={e[1]} platformAddress={props.contractAddress} signer={selectedAddress} />
  })

  return (
    <>
      <AddressSelect
        labelID='signer-select'
        labelText='Select signer'
        setAddress={setSelectedAddress}
      />
      <button onClick={handleButtonClick}>Refresh campaigns</button>
      {Object.entries(campaigns).length > 0 ? renderCampaigns : <p>No campaigns yet</p>}
    </>
  );
}

