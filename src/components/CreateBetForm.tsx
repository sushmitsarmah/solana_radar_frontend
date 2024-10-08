// components/CreateBetForm.tsx
'use client';

import React, { useState } from 'react';
import { createBet } from '../utils/solana';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateBetForm: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [expiryTime, setExpiryTime] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const betPublicKey = await createBet(question, Math.floor(new Date(expiryTime).getTime() / 1000));
      console.log('Bet created with public key:', betPublicKey.toString());
      // You might want to update some state or notify the user here
    } catch (error) {
      console.error('Error creating bet:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a New Bet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="question">Bet Question</Label>
              <Input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your bet question"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expiryTime">Expiry Time</Label>
              <Input
                id="expiryTime"
                type="datetime-local"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleSubmit}>Create Bet</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBetForm;