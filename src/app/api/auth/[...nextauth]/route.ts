import { api } from "@/services/api"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token, user }: any) {
      if (!session.user) {
        return session;
      }
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.access_token;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try{
        const res = await api.post("/api/v1/auth/signin", {
          ...credentials
        },
          { headers: { "Content-Type": "application/json" } }
        )

        if (!res) {
          return null
        }
        const { data } = res.data


        if (data) {
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          cookies().set('session', data.access_token, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
          })
          return {
            ...data.user,
            access_token: data.access_token,
          }
        }

        return null
      } catch (error) {
        return null
      }
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }