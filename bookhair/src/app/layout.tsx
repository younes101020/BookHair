import '@/styles/globals.css'
import { Playfair as MainFont }  from './fonts'
import { Header } from '@/components/header'
import AuthProviders from '@/provider/AuthProvider'
import ThemeProviders from '@/provider/ThemeProvider'
import { Suspense } from 'react'
import Loading from './loading'
import { IconContext } from "react-icons";
import { Toaster } from 'react-hot-toast';
import BreadCrumbs from '@/components/client/Breadcrumbs'

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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${MainFont.className}`}>
        <ThemeProviders>
          <AuthProviders>
            {/* @ts-expect-error Server Component */}
            <Header />
            <BreadCrumbs />
              <Suspense fallback={<Loading />}>
                {children}
                <Toaster position="top-right" />
              </Suspense>
          </AuthProviders>
        </ThemeProviders>
      </body>
    </html>
  )
}
