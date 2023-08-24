'use client'

import { ReactNode } from "react";
import { SessionProvider } from 'next-auth/react'

interface Props {
    children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return <SessionProvider basePath="/api/lib/auth">{children}</SessionProvider>
}

export default Provider