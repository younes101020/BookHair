import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Roboto as SecondFont } from "@/app/fonts";
import { authOptions } from "@/app/api/lib/auth/[...nextauth]/route";
import Signout from "@/components/client/Signout";
import { buttonVariants } from "@/components/ui/button";
import ThemeToggle from "./client/ThemeToggle";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-10 flex w-full justify-between border-b-2 border-b-white bg-black bg-opacity-75 px-3 py-5 text-white">
      <Link href="/" data-test="backhome">
        <Image
          src="/img/BookHair.png"
          width={160}
          height={10}
          alt="Logo of the application"
        />
      </Link>
      <nav className={SecondFont.className}>
        <ul className="flex items-center gap-4 text-base">
          {session ? (
            <>
              <Signout />
            </>
          ) : (
            <>
              <Link
                href="/login"
                data-test="login"
                className={buttonVariants({ variant: "ghost" })}
              >
                S'identifier
              </Link>
              <Link
                href="/register"
                data-test="register"
                className={buttonVariants({ variant: "ghost" })}
              >
                Inscription
              </Link>
            </>
          )}
          <li className="cursor-pointer">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
