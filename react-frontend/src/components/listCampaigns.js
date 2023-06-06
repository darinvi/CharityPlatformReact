export default function ListCampaigns(props) {

    const render_campaigns = Object.keys(props.campaigns).length > 0 && Object.entries(props.campaigns).map(([key,value]) => {
        return <p>Campaign Id: {key} with address: {value}</p>
    });

    return (
        <div>
        {render_campaigns && <h1>Campaigns:</h1>}
        {render_campaigns}
        </div>
    );
}

