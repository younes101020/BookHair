import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const Feed = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/protected/server')
  }

  return (
    <section className="py-24">
      <h1>Bienvenue, {session?.user?.name}</h1>
    </section>
  )
}

export default Feed;