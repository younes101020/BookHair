import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

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
      
      <body className={`${inter.className} bg-black`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
