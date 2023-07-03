import { useAccounts } from '../hooks/Accounts';

export default function SelectDeployer(props) {

  const allAddresses = useAccounts()

  const render_addresses = allAddresses && allAddresses.map(e => {
    return <option value={e}>{e}</option>
  })

  return (
    <div>
      {allAddresses && <>
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
