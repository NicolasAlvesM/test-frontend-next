import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-semibold mb-4">Olá {session?.user?.name}</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
