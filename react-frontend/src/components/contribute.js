import { useState } from 'react'

export default function Contribute(props) {

    const [ID, setID] = useState(null);

    const render_addresses = props.allAddresses && props.allAddresses.map(e => {
        if (e.length > 1) {
            const replaced = e.replace(/['\,]/g, '');
            return <option value={replaced}>{replaced}</option>
        }
    })

    const render_campaigns = Object.keys(props.campaigns).length > 0 && Object.keys(props.campaigns).map(e => {
            return <option value={e}>{e}</option>
    })


    //   function Contribute(props){
    //     fetch(`http://localhost:5000/contribute?address=${props.contributor}`)
    //       .then((response) => response.json())
    //       .then((jsonData) => {
    //         setData(jsonData.output);
    //       })
    //       .catch((error) => {
    //         console.log('Error:', error);
    //       });
    //   }

    return (
        <div>
            <label htmlFor='contributor-select'>Select signer</label>
            <select id='contributor-select'>
                <option>Select an address</option>
                {render_addresses}
            </select>
            <label htmlFor='contract-select'>Select campaign ID</label>
            <select id='contract-select' onChange={(e)=>{setID(e.target.value)}}>
                <option value="">Select Id</option>
                {render_campaigns}
            </select>
            <label htmlFor='amount'>ETH amount</label>
            <input type='number' placeholder='amount in ETH'></input>
            <button className='inlineButton'>Contribute</button>
            {ID != "" && <p>Address Of campaign: {props.campaigns[ID]}</p>}
        </div>
    );
}

