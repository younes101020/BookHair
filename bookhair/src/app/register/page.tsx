"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addUser } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType, registerSchema } from "@/shared/lib/zod/user.schema";
import { AiOutlineCheck, AiOutlineEnvironment } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import AutoComplete from "@/components/client/AutoComplete";


export default function RegisterPage() {
  const { data: session } = useSession();
  if (session) {
    redirect("/mon-compte");
  }
  const [profil, setProfil] = useState<String>("client");

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfil(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
    console.log(data)
    // const { error } = await addUser(data);
    // if (error !== undefined) {
    //   toast.error(error);
    // } else {
    //   toast.success("Inscription réussis");
    //   redirect("/login");
    // }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-stone-950 pt-24 text-lg lg:pt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 rounded-md bg-stone-950/30 px-5 py-10 text-white backdrop-blur-2xl sm:grid-cols-2 lg:w-2/4"
      >
        <h1 className="col-span-2 text-3xl ">
          <span className="font-bold">Inscris-toi</span>{" "}
          <span className="underline">vite</span>, et prend rendez-vous.
        </h1>
        <hr className="col-span-2 my-3 w-48" />

        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="nom">Nom:</Label>
          <Input
            type="text"
            placeholder="Doe"
            id="nom"
            data-test="nom"
            className="name-icon required:border-red-500"
            {...register("nom")}
            disabled={isSubmitting}
          />
          {errors.nom?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.nom?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="prenom">Prénom:</Label>
          <Input
            type="text"
            placeholder="John"
            id="prenom"
            data-test="prenom"
            className="name-icon required:border-red-500"
            {...register("prenom")}
            disabled={isSubmitting}
          />
          {errors.prenom?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.prenom?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="mot_de_passe">Mot de passe:</Label>
          <Input
            type="password"
            placeholder="••••••••"
            id="mot_de_passe"
            data-test="mot_de_passe"
            className="password-icon required:border-red-500"
            {...register("mot_de_passe")}
            disabled={isSubmitting}
          />
          {errors.mot_de_passe?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.mot_de_passe?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="confirm">Retapez le mot de passe:</Label>
          <Input
            type="password"
            placeholder="••••••••"
            id="confirm"
            data-test="confirm"
            className="password-icon required:border-red-500"
            {...register("confirm")}
            disabled={isSubmitting}
          />
          {errors.confirm?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.confirm?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="email">Adresse mail:</Label>
          <Input
            type="text"
            placeholder="johndoe@gmail.com"
            id="email"
            data-test="email"
            className="email-icon required:border-red-500"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Label htmlFor="telephone">Téléphone:</Label>
          <Input
            type="tel"
            placeholder="07.60.**.**.**"
            id="telephone"
            data-test="telephone"
            className="phone-icon required:border-red-500"
            {...register("telephone")}
            disabled={isSubmitting}
          />
          {errors.telephone?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.telephone?.message}
            </p>
          )}
        </div>
        <fieldset className="relative">
          <legend>Quel est ton profile ?</legend>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="radio"
              className="h-4 w-4 appearance-none bg-gray-100 checked:bg-slate-900 checked:ring-1 checked:ring-black checked:ring-offset-2"
              {...register("profile", { required: true })}
              id="client"
              data-test="client"
              value="client"
              checked={profil === "client"}
              onChange={onOptionChange}
              disabled={isSubmitting}
            />
            <label htmlFor="client"> Client</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              className="h-4 w-4 appearance-none bg-gray-100 checked:bg-slate-900 checked:ring-1 checked:ring-black checked:ring-offset-2"
              {...register("profile", { required: true })}
              id="coiffeur"
              data-test="coiffeur"
              value="coiffeur"
              checked={profil === "coiffeur"}
              onChange={onOptionChange}
              disabled={isSubmitting}
            />
            <label htmlFor="coiffeur"> Coiffeur</label>
          </div>
          {errors.profile?.message && (
            <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
              {errors.profile?.message}
            </p>
          )}
        </fieldset>
        <hr className="col-span-2 mt-3 w-14" />
        {profil === "coiffeur" && (
          <div className="relative col-span-2 mb-3 flex flex-col gap-2 lg:col-span-2">
            <Label htmlFor="adresse">Adresse:</Label>
            <AutoComplete
              register={register}
              isSubmitting={isSubmitting}
            />
            {errors.adresse?.message && (
              <p className="absolute bottom-[-1.8rem] whitespace-nowrap text-sm text-red-600">
                {errors.adresse?.message}
              </p>
            )}
          </div>
        )}

        <div className="col-span-2 flex gap-2 font-bold">
          <button
            type="submit"
            className="flex items-center gap-2 bg-white px-7 py-2 text-black"
            disabled={isSubmitting}
            data-test="submit"
          >
            <AiOutlineCheck />
            Valider
          </button>
          <button
            type="reset"
            className="flex items-center gap-2 bg-red-800 px-7 py-2"
            disabled={isSubmitting}
          >
            <span className="font-sans font-thin">X</span>Effacer
          </button>
        </div>
        <p className="col-span-2 text-sm font-extralight italic">
          Tu a déjà un <span className="font-bold">compte</span> ? Alors{" "}
          <Link href="/login" className="underline">
            Clique ici
          </Link>
        </p>
      </form>
    </section>
  );
}
