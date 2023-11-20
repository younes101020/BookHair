import Image from 'next/image';
import  Link from 'next/link';
import { getServerSession } from 'next-auth'
import { Roboto as SecondFont } from '@/app/fonts';
import { authOptions } from "@/app/api/lib/auth/[...nextauth]/route";
import Signout from '@/components/client/Signout';
import { buttonVariants } from "@/components/ui/button";
import ThemeToggle from './client/ThemeToggle';

export const Header = async () => {
    const session = await getServerSession(authOptions)
    
    return (
        <header className='flex justify-between py-5 px-3 text-white bg-opacity-75 sticky top-0 z-10 w-full bg-black border-b-2 border-b-white'>
            <Link href="/" data-test="backhome">
                <Image
                    src="/img/BookHair.png"
                    width={160}
                    height={10}
                    alt="Logo of the application"
                />
            </Link>
            <nav className={SecondFont.className}>
                <ul className='flex gap-4 text-base items-center'>
                    {session ?
                        <> 
                            <Signout />
                        </>
                        :
                        <>
                            <Link href="/login" data-test="login" className={buttonVariants({ variant: "ghost" })}>S'identifier</Link>
                            <Link href="/register" data-test="register" className={buttonVariants({ variant: "ghost" })}>Inscription</Link>
                        </>
                    }
                    <li className="cursor-pointer">
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
}