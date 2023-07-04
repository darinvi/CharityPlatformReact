import { useRef, useState } from "react";
import { ethers } from "ethers";
import Contract from '../contract-artifacts/Campaign.json';
import { useProvider } from "../hooks/Provider";

export default function DonatePopUp(props) {

  const popupRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const provider = useProvider()
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [donators, setDonatros] = useState(null);

  async function getContractInfo() {
    const factory = new ethers.Contract(props.contractAddress, Contract.abi, provider.getSigner())
    setName(await factory.name())
    setDescription(await factory.description())
    setTotalSupply((await factory.totalSupply()).toNumber())
  } 

  async function openPopup() {
    await getContractInfo()
    setIsOpen(true)
  };
  
  function closePopup() {
    setIsOpen(false)
  };

  return (
    <>
      <button onClick={openPopup}>More...</button>
      {isOpen &&
        <div ref={popupRef} style={{ display: isOpen ? "block" : "none" }}>
          <h3>Contract name: {name}</h3>
          <p>Description: {description}</p>
          <p>Supply: {totalSupply}</p>
          <button onClick={closePopup}>Close</button>
      </div>}
    </>
  )
}