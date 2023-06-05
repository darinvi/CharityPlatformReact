import { useState } from 'react'

export default function CreateCampaign(props) {

    const [data, setData] = useState(null)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [fundingGoal, setFundingGoal] = useState(null)
    const [duration, setDuration] = useState(null)

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
            <label htmlFor='contributor-select'>Select campaig creator</label>
            <select id='contributor-select'>{render_addresses}</select>
            <input type='text' placeholder='campaign name'></input>
            <input type='text' placeholder='campaign description'></input>
            <input type='number' placeholder='funding goal'></input>
            <input type='number' placeholder='duration'></input>
            <button id='campaignButton'>Create campaign</button>
        </div>
    );
}

