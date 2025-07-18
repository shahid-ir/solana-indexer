import axios from 'axios';

const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/';
const API_KEY ='29c1bedf-6af2-4f78-bdf5-bf4765e0a741';
const TOKEN_MINT = "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN"; // Replace with your mint

async function getTokenAccounts(mint: string, cursor?: string) {
  const body: any = {
    jsonrpc: "2.0",
    id: "1",
    method: "getTokenAccounts",
    params: {
      mint,
      limit: 1000, // max allowed by Helius
    }
  };
  if (cursor) body.params.cursor = cursor;

  const { data } = await axios.post(
    `${HELIUS_RPC_URL}?api-key=${API_KEY}`,
    body,
    { headers: { "Content-Type": "application/json" } }
  );
  return data.result;
}

(async () => {
  let cursor: string | undefined = undefined;
  let total = 0;
  let holders = 0;
  do {
    const result = await getTokenAccounts(TOKEN_MINT, cursor);
    if (!result || !result.token_accounts) break;
    for (const acc of result.token_accounts) {
      const owner = acc.owner;
      const amount = acc.amount;
      total += Number(amount);
      holders++;
      console.log(`Holder: ${owner} | Amount: ${amount}`);
    }
    cursor = result.cursor;
  } while (cursor);

  console.log(`\nTotal holders: ${holders}`);
  console.log(`Total tokens held: ${total}`);
})();