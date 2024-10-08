/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/solana.ts
'use client';

import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createMint, getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN, Idl } from '@project-serum/anchor';
import idl from './idl/hello_anchor.json';
// import { Bet } from '../types';

const RPC_URL = "http://localhost:8899";

const programID = new PublicKey("ADK4T3Mn5MrMzbeykG8qxKNJke5iKnBAnN289pSvs7WQ");
const opts: any = {
  preflightCommitment: "processed"
}

let workspace: { provider: AnchorProvider; program: Program } | null = null;
let tokenMint: PublicKey | null = null;

export const initWorkspace = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  if (window.solana) {
    const provider = new AnchorProvider(
      new Connection(RPC_URL, opts.preflightCommitment),
      window?.solana,
      opts.preflightCommitment,
    );
    const program = new Program(idl as Idl, programID, provider);
    workspace = {
      provider,
      program,
    };

    // Create a token mint if it doesn't exist
    if (!tokenMint) {
      const mintAuthority = Keypair.generate();
      tokenMint = await createMint(
        provider.connection,
        mintAuthority,
        mintAuthority.publicKey,
        null,
        9 // 9 decimals
      );
    }
  } else {
    console.error('Solana object not found! Get a Phantom Wallet 👻');
  }
}

export const getWorkspace = () => {
  if (!workspace) initWorkspace();
  return workspace;
}

export const createBet = async (question: string, expiryTime: number): Promise<PublicKey> => {
  const { program, provider } = getWorkspace()!;
  const betKeypair = web3.Keypair.generate();

  // Derive the betVault PDA
  const [betVault] = await PublicKey.findProgramAddress(
    [Buffer.from("bet_vault"), betKeypair.publicKey.toBuffer()],
    programID
  );

  // Ensure tokenMint exists
  if (!tokenMint) {
    throw new Error("Token mint not initialized");
  }

  await program.rpc.createBet(question, new BN(expiryTime), {
    accounts: {
      bet: betKeypair.publicKey,
      creator: provider.wallet.publicKey,
      tokenMint: tokenMint,
      betVault: betVault,
      systemProgram: web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: web3.SYSVAR_RENT_PUBKEY,
    },
    signers: [betKeypair]
  });

  return betKeypair.publicKey;
}

export const placeStake = async (betPublicKey: PublicKey, amount: number, choice: boolean): Promise<void> => {
  const { program, provider } = getWorkspace()!;

  // Derive the betVault PDA
  const [betVault] = await PublicKey.findProgramAddress(
    [Buffer.from("bet_vault"), betPublicKey.toBuffer()],
    programID
  );

  // Get the staker's associated token account
  const stakerTokenAccount = await getAssociatedTokenAddress(
    tokenMint!,
    provider.wallet.publicKey
  );

  await program.rpc.placeStake(new BN(amount), choice, {
    accounts: {
      bet: betPublicKey,
      staker: provider.wallet.publicKey,
      stakerTokenAccount: stakerTokenAccount,
      betVault: betVault,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
}

export const resolveBet = async (betPublicKey: PublicKey, outcome: boolean): Promise<void> => {
  const { program, provider } = getWorkspace()!;

  // Derive the betVault PDA
  const [betVault] = await PublicKey.findProgramAddress(
    [Buffer.from("bet_vault"), betPublicKey.toBuffer()],
    programID
  );

  // For this example, we're assuming the creator is the winner
  // In a real application, you'd need to determine the winner based on the outcome
  const winner = provider.wallet.publicKey;

  // Get the winner's associated token account
  const winnerTokenAccount = await getAssociatedTokenAddress(
    tokenMint!,
    winner
  );

  await program.rpc.resolveBet(outcome, {
    accounts: {
      bet: betPublicKey,
      creator: provider.wallet.publicKey,
      winner: winner,
      winnerTokenAccount: winnerTokenAccount,
      betVault: betVault,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
}