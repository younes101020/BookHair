"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { AiOutlineCheck } from "react-icons/ai";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";

export default function Login() {
  const searchParams = useSearchParams();
  const comeFromRegister = searchParams.get("success");
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", mot_de_passe: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      mot_de_passe: userInfo.mot_de_passe,
      callbackUrl: "/mon-compte",
    });
  };

  useEffect(() => {
    if (comeFromRegister) {
      const isRegistrationSuccess = JSON.parse(comeFromRegister);
      if (isRegistrationSuccess) {
        toast({
          title: "Inscription réussis",
          description: "Vous avez bien été inscris, veuillez vous connectez",
        });
      }
      router.push("/login")
    }
  }, []);

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-stone-950 text-lg">
      <form
        onSubmit={handleSubmit}
        className="mx-2 mt-3 grid gap-3 rounded-md bg-stone-950/30 px-5 py-10 text-white backdrop-blur-2xl sm:grid-cols-2 lg:w-2/4"
      >
        <h1 className="col-span-2 text-3xl ">
          <span className="font-bold">Connecte-toi</span>{" "}
          <span className="underline">vite</span>, et prend rendez-vous.
        </h1>
        <hr className="col-span-2 my-3 w-48" />

        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="email">Adresse mail:</Label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            data-test="email"
            value={userInfo.email}
            onChange={({ target }) => {
              setUserInfo({ ...userInfo, email: target.value });
            }}
            className="email-icon required:border-red-500"
          />
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="mot_de_passe">Mot de passe:</Label>
          <Input
            type="password"
            placeholder="••••••••"
            name="mot_de_passe"
            id="mot_de_passe"
            data-test="mot_de_passe"
            value={userInfo.mot_de_passe}
            onChange={({ target }) => {
              setUserInfo({ ...userInfo, mot_de_passe: target.value });
            }}
            className="password-icon required:border-red-500"
          />
        </div>
        <hr className="col-span-2 my-3 w-14" />
        <div className="col-span-2 flex gap-2 font-bold">
          <button
            type="submit"
            className="flex items-center gap-2 bg-white px-7 py-2 text-black"
            data-test="submit"
          >
            <AiOutlineCheck />
            Valider
          </button>
          <button
            type="reset"
            className="flex items-center gap-2 bg-red-800 px-7 py-2"
          >
            <span className="font-sans font-thin">X</span>Effacer
          </button>
        </div>
        <p className="col-span-2 text-sm font-extralight italic">
          Tu n'a pas encore de <span className="font-bold">compte</span> ? Alors{" "}
          <Link href="/register" className="underline">
            Clique ici
          </Link>
        </p>
      </form>
    </section>
  );
}
