import '@/styles/globals.css'
import { Playfair as MainFont }  from './fonts'
import { Header } from '@/components/header'
import AuthProviders from '@/provider/AuthProvider'
import ThemeProviders from '@/provider/ThemeProvider'
import { Suspense } from 'react'
import Loading from './loading'

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
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
          </AuthProviders>
        </ThemeProviders>
      </body>
    </html>
  )
}
