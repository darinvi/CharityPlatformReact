import { useState } from 'react'

export default function FetchAddresses(props) {

    const [loading, setLoading] = useState(false);

    const render_addresses = props.allAddresses && props.allAddresses.map(e => {
        if (e.length > 1) {
            const replaced = e.replace(/['\,]/g, '');
            return <option value={replaced}>{replaced}</option>
        }
    })

    function handleButtonClick() {
        setLoading(true);
        fetch('http://localhost:5000/get-addresses')
            .then((response) => response.json())
            .then((jsonData) => {
                props.setAllAddresses(jsonData.output);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error:', error);
                setLoading(false);
            });
    }

    return (
        <div>
            <button onClick={handleButtonClick} disabled={props.allAddresses ? true : false}>Fetch Hardhat Addresses</button>
            {loading && <h1>Loading...</h1>}
            {(props.allAddresses && !props.currentAddress) && <>
                <label htmlFor='deployer-select'>Select deployer</label>
                <select id='deployer-select' onChange={props.handleAddressSelect}>
                    <option>Select an address</option> 
                    {render_addresses}
                </select>
            </>}
                {props.currentAddress && <h1>Deployer: {props.currentAddress}</h1>}
            </div>
            );
}
