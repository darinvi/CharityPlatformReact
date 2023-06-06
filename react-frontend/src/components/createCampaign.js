import { useState } from 'react'

export default function CreateCampaign(props) {

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [goal, setGoal] = useState(null);
    const [duration, setDuration] = useState(null);
    const [signer, setSigner] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [campaignCounter, setCampaignCounter] = useState(0);

    const render_addresses = props.allAddresses && props.allAddresses.map(e => {
        if (e.length > 1) {
            const replaced = e.replace(/['\,]/g, '');
            return <option value={replaced}>{replaced}</option>
        }
    })

    const campaignData = name && description && goal && duration && signer;

    function handleCampaignCreation() {
        setLoading(true);
        fetch('http://localhost:5000/create-campaign', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                platform: (props.deployedAddress).trim(),
                signer: signer.trim(),
                name,
                description,
                goal,
                duration
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Success:", res.output);
                const count = Object.keys(props.campaigns).length;
                console.log("count",count)
                props.setCampaigns({...props.campaigns, [parseInt(count)] : res.output})
                // setCampaignCounter(prev => prev + 1)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
        setName("");
        setDescription("");
        setGoal("");
        setDuration("");
    }

    return (
        <div>
            <label htmlFor='contributor-select'>Select campaig creator</label>
            <select value={signer} id='contributor-select' onChange={(e) => { setSigner(e.target.value) }}>
                <option>Select an address</option>{render_addresses}
            </select>
            <input type='text' value={name} placeholder='campaign name' onChange={(e) => { setName(e.target.value) }}></input>
            <input type='text' value={description} placeholder='campaign description' onChange={(e) => { setDescription(e.target.value) }}></input>
            <input type='number' value={goal} placeholder='funding goal' onChange={(e) => { setGoal(e.target.value) }}></input>
            <input type='number' value={duration} placeholder='duration' onChange={(e) => { setDuration(e.target.value) }}></input>
            <button className='inlineButton' onClick={handleCampaignCreation} disabled={!campaignData}>Create campaign</button>
            {loading && <h1>Loading...</h1>}
        </div>
    );
}

