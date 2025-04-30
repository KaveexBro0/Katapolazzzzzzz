import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { betAmount, betType, userId } = req.body;
  const dice = Math.floor(Math.random() * 6) + 1;
  let won = false;
  let payout = 0;

  if (betType === 'High' && [4, 5, 6].includes(dice)) {
    won = true;
    payout = betAmount * 2;
  } else if (betType === 'Low' && [1, 2, 3].includes(dice)) {
    won = true;
    payout = betAmount * 2;
  } else if (betType === '1/2' && [1, 2].includes(dice)) {
    won = true;
    payout = betAmount * 3;
  } else if (betType === '3/4' && [3, 4].includes(dice)) {
    won = true;
    payout = betAmount * 3;
  } else if (betType === '5/6' && [5, 6].includes(dice)) {
    won = true;
    payout = betAmount * 3;
  } else if (parseInt(betType) === dice) {
    won = true;
    payout = betAmount * 6;
  }

  const client = createClient();
  await client.connect();
  await client.query(
    `INSERT INTO games (userId, mode, betType, betAmount, result, payout) VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, 'Solo', betType, betAmount, dice, payout]
  );
  await client.end();

  res.json({ dice, won, payout });
}