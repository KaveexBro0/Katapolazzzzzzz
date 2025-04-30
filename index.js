import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Katapola: Online Dice Game</h1>
      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">Welcome, {session.user.name}!</p>
          <p className="mb-4">Balance: ${session.user.balance}</p>
          <div className="space-y-4">
            <Link href="/solo">
              <a className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Play Solo (Demo)
              </a>
            </Link>
            <Link href="/auto">
              <a className="block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Play Auto (Multiplayer)
              </a>
            </Link>
            <Link href="/profile">
              <a className="block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                View Profile
              </a>
            </Link>
            <button
              onClick={() => signOut()}
              className="block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => signIn('telegram')}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login with Telegram
        </button>
      )}
    </div>
  );
}