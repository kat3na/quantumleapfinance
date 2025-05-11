// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [ /* ... */ ],
  callbacks: { /* ... */ },
  secret: process.env.NEXTAUTH_SECRET,
};
