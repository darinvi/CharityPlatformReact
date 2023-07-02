import { useEffect, useState } from "react";

// Returns the abi of a contract given a name
export default function Provider(RpcUrl) {

    const [provider, setProvider] = useState(null)

    useEffect(()=>{
        setProvider(new ethers.providers.JsonRpcProvider(RpcUrl))
    },[])
 
    return {provider}
}