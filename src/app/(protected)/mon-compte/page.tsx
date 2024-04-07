import { redirect } from "next/navigation";
import SideMenu from "@/components/cards/mon-compte/sidemenu";
import { auth } from "@/lib/auth";


const Feed = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login?callbackUrl=/mon-compte')
  }

  return (
    <SideMenu id={session.accessToken} />
  )
}

export default Feed;