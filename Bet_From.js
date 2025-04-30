import { useState } from 'react';

export default function BetForm({ onSubmit }) {
  const [betAmount, setBetAmount] = useState('');
  const [betType, setBetType] = useState('Number');
  const [number, setNumber] = useState('1');
  const [pair, setPair] = useState('1/2');

  const handleSubmit = (e) => {
    e.preventDefault();
    const type =
      betType === 'Number' ? number : betType === 'Pairs' ? pair : betType;
    onSubmit(parseFloat(betAmount), type);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Bet Amount ($):</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />
      </div>
      <div>
        <label className="block">Bet Type:</label>
        <select
          value={betType}
          onChange={(e) => setBetType(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        >
          <option>Number</option>
          <option>High</option>
          <option>Low</option>
          <option>Pairs</option>
        </select>
      </div>
      {betType === 'Number' && (
        <div>
          <label className="block">Choose Number:</label>
          <select
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
      {betType === 'Pairs' && (
        <div>
          <label className="block">Choose Pair:</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          >
            <option>1/2</option>
            <option>3/4</option>
            <option>5/6</option>
          </select>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Confirm Bet
      </button>
    </form>
  );
}