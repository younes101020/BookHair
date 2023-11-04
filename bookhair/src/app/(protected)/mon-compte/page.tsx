import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/lib/auth/[...nextauth]/route";
import SideMenu from "@/components/cards/mon-compte/sidemenu";


const Feed = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/mon-compte')
  }

  return (
    <SideMenu id={session.accessToken} />
  )
}

export default Feed;