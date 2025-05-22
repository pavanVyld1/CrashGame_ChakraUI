// GameComponent.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../services/socketContext';


const TestSocketComponent: React.FC = () => {
  const { emit, on, off, isConnected, socketId } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);

  const log = (msg: string) => setMessages(prev => [...prev, msg]);

  useEffect(() => {
    if (!isConnected) return;

    log(`Connected with ID: ${socketId}`);

    on('session_start', (data: { sessionId: any; }) => console.log(`Session started: ${data.sessionId}`));
    on('tick', (data: { value: any; }) => console.log(`Tick: ${data.value}`));
    on('crash', (data: { crashValue: any; }) => console.log(`Crash at: ${data.crashValue}`));
    on('payout', (data: { amount: any; }) => console.log(`Won: ${data.amount}`));

    return () => {
      off('session_start');
      off('tick');
      off('crash');
      off('payout');
    };
  }, [isConnected, socketId, on, off]);

  const handleBet = () => {
    emit('place_bet', { amount: 100 });
  };

  const handleWithDwar = () => {
    emit('withDraw', { amount: 100 });
  };

  return (
    <div>
      <h3>Socket Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h3>
      <button onClick={handleBet} disabled={!isConnected}>Place Bet</button>
      <button onClick={handleWithDwar} disabled={!isConnected}>withDraw</button>
      <div>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
    </div>
  );
};

export default TestSocketComponent;
