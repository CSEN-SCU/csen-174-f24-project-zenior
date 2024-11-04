import { getServerSession } from "@/lib/server/getServerSession";
import Home from "./Home";

export default async function HomePageWrapper() {
  const session = await getServerSession();
  
  return <Home session={session} />;
}
