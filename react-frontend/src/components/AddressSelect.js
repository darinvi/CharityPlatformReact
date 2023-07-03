import { useAccounts } from '../hooks/Accounts';
import { useEffect, useState } from 'react';

export default function AddressSelect(props) {

  const allAddresses = useAccounts()
  
  const render_addresses = allAddresses && allAddresses.map(e => {
    return <option value={e}>{e}</option>
  })

  function handleAddressSelect(e) {
    props.setAddress(e.target.value)
  }

  return (
    <div>
      {allAddresses && <>
        <label htmlFor={props.labelID}>{props.labelText}: </label>
        <select id={props.labelID} onChange={handleAddressSelect}>
          <option value=''>Select an address</option>
          {render_addresses}
        </select>
      </>}
    </div>
  );
}
