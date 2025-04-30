import { useState, useEffect } from 'react';

export default function GameHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`/api/game/history?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, [userId]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Game History</h3>
      <ul className="space-y-2">
        {history.map((game) => (
          <li key={game.id} className="p-2 bg-gray-800 rounded">
            {game.mode} - Bet: ${game.betAmount} on {game.betType} - Result: {game.result} - Payout: ${game.payout}
          </li>
        ))}
      </ul>
    </div>
  );
}