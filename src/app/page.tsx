import { getServerSession } from "next-auth";
import LoginForm from "./components/LoginForm";
import { redirect } from "next/navigation";

export default async function Index() {
  const session = await getServerSession();
  if (session) {
    redirect("/home");
  } 
  return (
    <div>
      <LoginForm />
    </div>
  );
}
