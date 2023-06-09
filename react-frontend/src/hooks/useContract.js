import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Contract from '../contract-artifacts/MockCharityPlatform.json';
import { useProvider } from "./Provider";

export default function useContract(contractAddress, signer) {

    const [contract, setContract] = useState(null);

    const abi = Contract.abi;
    const provider = useProvider()

    useEffect(() => {
        if (provider) {
            setContract(new ethers.Contract(contractAddress, abi, provider.getSigner(signer)))
        }
    }, [contractAddress, signer])


    return contract
}