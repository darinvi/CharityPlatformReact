import { useState } from 'react'
import DonatePopUp from './DonatePopUp'

export default function Donate(props) {

    const [amount, setAmount] = useState(0)

    

    function handleDonateButton() {
        return
    }

    function handleInputChange(e) {
        if (e.target.value > 0) {
            setAmount(e.target.value)
        }
    }


    return (
        <div className='donate'>
            <div className='donate-background'></div>
            <p>Id: {props.index} with address: {props.address}</p>
            <label htmlFor='eth-input'>donations in ETH: </label>
            <input id='eth-input' type='number' value={amount} onChange={handleInputChange} />
            <button onClick={handleDonateButton}>Donate</button>
            <DonatePopUp contractAddress={props.address} />
        </div>
    );
}

