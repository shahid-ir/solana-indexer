import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import axios from 'axios';

// Replace with your preferred Solana RPC endpoint
const RPC_URL = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL);


async function getTokenMetadata(mintAddress: string) {
  try {
    const metaplex = Metaplex.make(connection);
    const mint = new PublicKey(mintAddress);
    const metadata = await metaplex.nfts().findByMint({ mintAddress: mint });
    console.log(`Token Name: ${metadata.name}`);
    console.log(`Token Symbol: ${metadata.symbol}`);
    if (metadata.uri) {
      console.log(`Metadata URI: ${metadata.uri}`);
      try {
        const response = await axios.get(metadata.uri);
        const metaJson = response.data;
        if (metaJson.image) {
          console.log(`Image URL: ${metaJson.image}`);
        } else {
          console.log('No image field found in metadata JSON.');
        }
        if (metaJson.twitter) {
          console.log(`Twitter: ${metaJson.twitter}`);
        }
        if (metaJson.website) {
          console.log(`Website: ${metaJson.website}`);
        }
      } catch (err) {
        console.error('Error fetching metadata JSON:', err);
      }
    }
  } catch (error) {
    console.error('Error fetching token metadata:', error);
  }
}


const sampleMintAddress = '6umDHJkfz5QKQQyQi5VuCwJAjLygqgWnrsQ4vE2dfzoL';
getTokenMetadata(sampleMintAddress);

