import { useState } from 'react'

export default function Donate(props) {

    const [loading, setLoading] = useState(false);
    const [id, setID] = useState("Not selected");
    const [amount, setAmount] = useState(null);
    const [signer,setSigner] = useState(null);
    

    const render_addresses = props.allAddresses && props.allAddresses.map(e => {
        if (e.length > 1) {
            const replaced = e.replace(/['\,]/g, '');
            return <option value={replaced}>{replaced}</option>
        }
    })

    const render_campaigns = Object.keys(props.campaigns).length > 0 && Object.keys(props.campaigns).map(e => {
        return <option value={e}>{e}</option>
    })


    function handleButtonClick() {
        console.log(props.deployedAddress)
        setLoading(true);
        fetch('http://localhost:5000/donate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                platform: props.deployedAddress.trim(),
                signer: signer.trim(),
                id,
                amount
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Success:", res.output);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }

    return (
        <div>
            <label htmlFor='contributor-select'>Select signer</label>
            <select id='contributor-select' onChange={(e)=>{setSigner(e.target.value)}}>
                <option>Select an address</option>
                {render_addresses}
            </select>
            <label htmlFor='contract-select'>Select campaign id</label>
            <select id='contract-select' onChange={(e) => { setID(e.target.value) }}>
                <option value="Not selected">Select Id</option>
                {render_campaigns}
            </select>
            <label htmlFor='amount'>ETH amount</label>
            <input type='number' placeholder='amount in ETH' onChange={(e)=>{setAmount(e.target.value)}}></input>
            <button className='inlineButton' onClick={handleButtonClick}>Donate</button>
            <p>Address Of campaign: {props.campaigns[id]}</p>
            {loading && <h1>Loading...</h1>}
        </div>
    );
}

