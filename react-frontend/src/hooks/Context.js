import { Provider } from "./Provider";
import { Accounts } from "./Accounts";

export function UseContext({ RpcUrl, children }) {
  return (
    <Provider RpcUrl={RpcUrl}>
      <Accounts>
        {children}
      </Accounts>
    </Provider>
  );
}