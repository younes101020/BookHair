import '@/styles/globals.css'
import { Playfair as MainFont }  from './fonts'
import { Header } from '@/components/header'
import Provider from '@/components/provider'
import { Suspense } from 'react'
import Loading from './loading'
import { IconContext } from "react-icons";

export const metadata = {
  title: 'BookHair',
  description: 'Ne perd plus de temps et réserve chez ton coiffeur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${MainFont.className}`}>
        <Provider>
          {/* @ts-expect-error Server Component */}
          <Header />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
        </Provider>
      </body>
    </html>
  )
}
