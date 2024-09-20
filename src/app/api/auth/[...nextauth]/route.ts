import { api } from "@/services/api"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/'
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
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            return null
          }
          const res = await api.post("/api/v1/auth/signin", {
            email: credentials.email,
            password: credentials.password,
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