// {"jsonrpc":"2.0","result":{"balances":[{"asset":"AVAX","balance":"324654869940"}]},"id":1}

interface BalanceResponse {
  "balances": [
    { "asset": string, "balance": string }
  ] | []
}

export const getBalance = async (address: string): Promise<BalanceResponse> => {
  // const avax = new Avalanche('https://api.avax.network/', 9650);
  // avax.setRequestConfig("withCredentials", true);
  // const response = await avax.XChain().getAllBalances(address);

  const payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "avm.getAllBalances",
    "params": {
      "address": address
    }
  }
  const response = await (await fetch('https://api.avax.network/ext/bc/X', {
    method: 'POST', headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload)
  })).json();

  console.log(response);
  return response.result;
}
