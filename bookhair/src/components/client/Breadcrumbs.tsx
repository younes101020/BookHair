"use client";

import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import Link from "next/link";
import { Roboto as SecondFont } from "@/app/fonts";

export default function BreadCrumbs() {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  segments.unshift("Accueil");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { textContent } = e.target;
    const newPath = segments
      .slice(0, segments.indexOf(`${textContent}`) + 1)
      .join("/");
    router.replace(`/${newPath}`);
  };

  return (
    <ul
      className={`flex gap-2 bg-black bg-opacity-75 p-2 text-white ${SecondFont.className} font-thin`}
    >
      {segments.map((segment: string, index: string) => {
        if (!segment.startsWith("(")) {
          return (
            <li
              key={index}
              className={`bc_items ${
                index === segments.length - 1 ? "font-medium" : ""
              }`}
            >
              <Link href="/" onClick={handleClick}>
                {segment}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
