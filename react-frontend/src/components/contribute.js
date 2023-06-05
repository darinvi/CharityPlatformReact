import { useState } from 'react'

export default function Contribute(props) {

    const [data, setData] = useState(null)

    const render_addresses = props.allAddresses && props.allAddresses.map(e => {
        if (e.length > 1) {
            const replaced = e.replace(/['\,]/g, '');
            return <option value={replaced}>{replaced}</option>
        }
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
            <select id='contributor-select'>{render_addresses}</select>
            <label htmlFor='contract-select'>Select campaign</label>
            <select id='contract-select' ></select>
        </div>
    );
}

