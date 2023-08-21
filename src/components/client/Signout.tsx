'use client'

import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut()} data-test="signout">Sign out</button>