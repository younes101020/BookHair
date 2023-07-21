import '@/styles/globals.css'
import { Playfair as MainFont }  from './fonts'
import { Header } from '@/components/header'

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
        <Header />
        {children}
      </body>
    </html>
  )
}
