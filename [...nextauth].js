import NextAuth from 'next-auth';
import TelegramProvider from 'next-auth/providers/telegram';

export default NextAuth({
  providers: [
    TelegramProvider({
      clientId: process.env.TELEGRAM_BOT_TOKEN,
      clientSecret: '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { createClient } = require('@vercel/postgres');
      const client = createClient();
      await client.connect();

      const { rows } = await client.query(
        `SELECT * FROM users WHERE telegramId = $1`,
        [account.providerAccountId]
      );

      if (rows.length === 0) {
        await client.query(
          `INSERT INTO users (telegramId, username, balance) VALUES ($1, $2, $3)`,
          [account.providerAccountId, user.name, 1000.0]
        );
      }

      await client.end();
      return true;
    },
    async session({ session, user }) {
      const { createClient } = require('@vercel/postgres');
      const client = createClient();
      await client.connect();

      const { rows } = await client.query(
        `SELECT * FROM users WHERE telegramId = $1`,
        [user.id]
      );

      session.user.id = rows[0].id;
      session.user.balance = rows[0].balance;
      await client.end();
      return session;
    },
  },
});