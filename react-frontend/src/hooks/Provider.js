import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const ProviderContext = createContext(null);

export function Provider({ RpcUrl, children }) {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    setProvider(new ethers.providers.JsonRpcProvider(RpcUrl));
  }, [RpcUrl]);

  return (
    <ProviderContext.Provider value={provider}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  return useContext(ProviderContext);
}