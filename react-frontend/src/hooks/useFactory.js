import { ethers } from "ethers";
import Contract from '../contract-artifacts/MockCharityPlatform.json';
import { useEffect, useState } from "react";
import { useProvider } from "./Provider";

export default function useFactory(account) {

    const [factory, setFactory] = useState(null);
    const provider = useProvider()
    const signer = provider && provider.getSigner(account)

    const abi = Contract.abi;
    const bytecode = Contract.bytecode;

    useEffect(() => {
        if (signer) {
            setFactory(new ethers.ContractFactory(abi, bytecode, signer))
        }
    }, [account])


    return factory
}