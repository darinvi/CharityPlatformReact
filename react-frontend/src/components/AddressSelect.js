import { useAccounts } from '../hooks/Accounts';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function AddressSelect(props) {

  const allAddresses = useAccounts()
  
  const render_addresses = allAddresses && allAddresses.map(e => {
    return <option value={e}>{abbreviateAddress(e)}</option>
  })

  function abbreviateAddress(address) {
    return ethers.utils.isAddress(address) && `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

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
