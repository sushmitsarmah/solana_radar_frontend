// app/create-bet/page.tsx
import React from 'react';
import CreateBetForm from '../../components/CreateBetForm';

const CreateBet: React.FC = () => {
  return (
    <div>
      <h1>Create a New Bet</h1>
      <CreateBetForm />
    </div>
  );
}

export default CreateBet;