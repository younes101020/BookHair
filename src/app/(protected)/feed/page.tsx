import { getServerSession } from "next-auth";
//import { redirect } from "next/navigation";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const Feed = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/login?callbackUrl=/feed')
  // }

  return (
    <section className="py-24">
      <h1>Bienvenue</h1>
    </section>
  )
}

export default Feed;