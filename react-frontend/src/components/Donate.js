import { useState } from 'react'
import DonatePopUp from './DonatePopUp'
import useContract from '../hooks/useContract'

export default function Donate(props) {

    const [amount, setAmount] = useState(0)
    const currId = props.index
    const contract = useContract(props.platformAddress, props.signer)

    async function handleDonateButton() {
        await contract.donate(currId,{value:amount});
        setAmount(0);
    }

    function handleInputChange(e) {
        if (e.target.value > 0) {
            setAmount(e.target.value)
        }
    }


    return (
        <div className='donate'>
            <div className='donate-background'></div>
            <p>Id: {currId} with address: {props.address}</p>
            <label htmlFor='eth-input'>donations in WEI: </label>
            <input id='eth-input' type='number' value={amount} onChange={handleInputChange} />
            <button onClick={handleDonateButton}>Donate</button>
            <DonatePopUp contractAddress={props.address} />
        </div>
    );
}

