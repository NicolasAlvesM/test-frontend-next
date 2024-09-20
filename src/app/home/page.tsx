import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import KanbanBoard from "../components/KanbanBoard";
import axios from "axios";
import { API_URL } from "@/configs/enviromentsVars";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = session.user as User;
  const { data } = await axios.get(`${API_URL}/api/v1/tasks/user/${user.id}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center w-[1000px]">
        <KanbanBoard currentTasks={data.data} name={session.user?.name} />
        <LogoutButton />
      </div>
    </div>
  );
}
