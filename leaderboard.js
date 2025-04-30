import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
  const client = createClient();
  await client.connect();
  const { rows } = await client.query(
    `SELECT username, balance FROM users ORDER BY balance DESC LIMIT 10`
  );
  await client.end();
  res.json(rows);
}