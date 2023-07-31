import Image from 'next/image';
import  Link from 'next/link';
import { getServerSession } from 'next-auth'
import { Roboto as SecondFont } from '@/app/fonts';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signout from '@/components/client/Signout';

export const Header = async () => {
    const session = await getServerSession(authOptions)
    
    return (
        <header className='flex justify-between py-5 px-3 text-white bg-opacity-75 absolute z-10 w-full top-0 bg-black border-b-2 border-b-white'>
            <Link href="/">
                <Image
                    src="/img/bookhair.png"
                    width={160}
                    height={10}
                    alt="Logo of the application"
                />
            </Link>
            <nav className={SecondFont.className}>
                <ul className='flex gap-4 text-base'>
                    {session ?
                        <> 
                            <Signout />
                        </>
                        :
                        <>
                            <Link href="/register" className='underline flex items-center'>Inscription</Link>
                            <Link href="/login" className='text-black bg-white hover:bg-slate-200 p-2'>S'identifier</Link>
                        </>
                    }
                    
                </ul>
            </nav>
        </header>
    );
}