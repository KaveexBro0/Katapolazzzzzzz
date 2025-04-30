import { useSession } from 'next-auth/react';
import GameHistory from '../components/GameHistory';
import Leaderboard from '../components/Leaderboard';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>Username: {session.user.name}</p>
      <p>Balance: ${session.user.balance}</p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Game History</h2>
      <GameHistory userId={session.user.id} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Leaderboard</h2>
      <Leaderboard />
    </div>
  );
}