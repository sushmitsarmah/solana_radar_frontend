// components/PlaceStakeForm.tsx
'use client';

import React, { useState } from 'react';
import { placeStake } from '../utils/solana';
import { PublicKey } from '@solana/web3.js';

interface PlaceStakeFormProps {
  betPublicKey: PublicKey;
}

const PlaceStakeForm: React.FC<PlaceStakeFormProps> = ({ betPublicKey }) => {
  const [amount, setAmount] = useState<string>('');
  const [choice, setChoice] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placeStake(betPublicKey, Number(amount), choice);
      console.log('Stake placed successfully');
      // You might want to update some state or notify the user here
    } catch (error) {
      console.error('Error placing stake:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Stake amount"
        required
      />
      <select value={choice.toString()} onChange={(e) => setChoice(e.target.value === 'true')}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button type="submit">Place Stake</button>
    </form>
  );
};

export default PlaceStakeForm;