import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
  const { userId } = req.query;
  const client = createClient();
  await client.connect();
  const { rows } = await client.query(
    `SELECT * FROM games WHERE userId = $1 ORDER BY createdAt DESC LIMIT 10`,
    [userId]
  );
  await client.end();
  res.json(rows);
}