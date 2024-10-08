"use client"
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="w-60 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-20"
    >
      Sair
    </button>
  )
}