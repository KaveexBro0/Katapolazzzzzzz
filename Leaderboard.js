import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch('/api/game/leaderboard')
      .then((res) => res.json())
      .then((data) => setLeaders(data));
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
      <ul className="space-y-2">
        {leaders.map((leader, index) => (
          <li key={leader.id} className="p-2 bg-gray-800 rounded">
            #{index + 1} {leader.username} - Balance: ${leader.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}