import { createContext, useContext, useEffect, useState } from "react";
import { useProvider } from "./Provider";

const AccountsContext = createContext(null);

export function Accounts({ children }) {
  const [accounts, setAccounts] = useState(null);

  const provider = useProvider()

  useEffect(() => {
    const fetchAccounts = async () => {
      provider && setAccounts(await provider.listAccounts())
    }
    fetchAccounts()
  }, [provider]);

  return (
    <AccountsContext.Provider value={accounts}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  return useContext(AccountsContext);
}