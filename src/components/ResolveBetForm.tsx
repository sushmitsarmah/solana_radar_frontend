// components/ResolveBetForm.tsx
'use client';

import React, { useState } from 'react';
import { resolveBet } from '../utils/solana';
import { PublicKey } from '@solana/web3.js';

interface ResolveBetFormProps {
  betPublicKey: PublicKey;
}

const ResolveBetForm: React.FC<ResolveBetFormProps> = ({ betPublicKey }) => {
  const [outcome, setOutcome] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resolveBet(betPublicKey, outcome);
      console.log('Bet resolved successfully');
      // You might want to update some state or notify the user here
    } catch (error) {
      console.error('Error resolving bet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={outcome.toString()} onChange={(e) => setOutcome(e.target.value === 'true')}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button type="submit">Resolve Bet</button>
    </form>
  );
};

export default ResolveBetForm;