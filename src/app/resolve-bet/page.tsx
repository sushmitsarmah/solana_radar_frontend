// app/resolve-bet/page.tsx
import React from 'react';
import ResolveBetForm from '../../components/ResolveBetForm';
import { Bet } from '../../types';
// import { PublicKey } from '@solana/web3.js';

const ResolveBet: React.FC = () => {
  // In a real application, you would fetch the bets from your Solana program here
  const bets: Bet[] = [
    // { publicKey: new PublicKey('dummy1'), account: { question: 'Will BTC reach 100k by end of 2023?' } },
    // { publicKey: new PublicKey('dummy2'), account: { question: 'Will ETH 2.0 launch successfully?' } },
  ];

  return (
    <div>
      <h1>Resolve a Bet</h1>
      {bets.map(bet => (
        <div key={bet.publicKey.toString()}>
          <h2>{bet.account.question}</h2>
          <ResolveBetForm betPublicKey={bet.publicKey} />
        </div>
      ))}
    </div>
  );
}

export default ResolveBet;