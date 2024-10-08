// types/index.ts
import { PublicKey } from '@solana/web3.js';

export interface Bet {
  publicKey: PublicKey;
  account: {
    question: string;
    // Add other fields as needed
  };
}