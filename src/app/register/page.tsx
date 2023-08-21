'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUser } from "@/app/actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from "react";
import { RegisterType, registerSchema } from "@/lib/zod/user.schema";
import { AiOutlineCheck, AiOutlineEnvironment } from "react-icons/ai";

export default function RegisterPage() {
    const [profil, setProfil] = useState<String>("client");
    const [isPending, startTransition] = useTransition();

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfil(e.target.value)
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterType> = (data) => {
        startTransition(() => {
            addUser(data);
        })
    };
    
    return (
        <section className="min-h-screen pt-24 lg:pt-0 text-lg bg-gradient-to-r from-slate-900 to-stone-950 flex flex-col gap-2 justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/4 grid sm:grid-cols-2 gap-8 backdrop-blur-2xl bg-stone-950/30 px-5 py-10 rounded-md text-white">
                <h1 className="col-span-2 text-3xl "><span className="font-bold">Inscris-toi</span> <span className="underline">vite</span>, et prend rendez-vous.</h1>
                <hr className="col-span-2 w-48 my-3" />

                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="nom">Nom:</Label>
                    <Input 
                        type="text" 
                        placeholder="Doe" 
                        id="nom"
                        className="required:border-red-500 name-icon"
                        {...register('nom')}
                        disabled={isSubmitting}
                    />
                    {errors.nom?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.nom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="prenom">Prénom:</Label>
                    <Input 
                        type="text" 
                        placeholder="John" 
                        id="prenom"
                        className="required:border-red-500 name-icon"
                        {...register('prenom')}
                        disabled={isSubmitting}
                    />
                    {errors.prenom?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.prenom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="mot_de_passe">Mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="mot_de_passe"
                        className="required:border-red-500 password-icon"
                        {...register('mot_de_passe')}
                        disabled={isSubmitting}
                    />
                    {errors.mot_de_passe?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.mot_de_passe?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="confirm">Retapez le mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="confirm"
                        className="required:border-red-500 password-icon"
                        {...register('confirm')}
                        disabled={isSubmitting}
                    />
                    {errors.confirm?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.confirm?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="email">Adresse mail:</Label>
                    <Input 
                        type="text" 
                        placeholder="johndoe@gmail.com" 
                        id="email"
                        className="required:border-red-500 email-icon"
                        {...register('email')}
                        disabled={isSubmitting}
                    />
                    {errors.email?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.email?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="telephone">Téléphone:</Label>
                    <Input 
                        type="tel" 
                        placeholder="07.60.**.**.**" 
                        id="telephone"
                        className="required:border-red-500 phone-icon"
                        {...register('telephone')}
                        disabled={isSubmitting}
                    />
                    {errors.telephone?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.telephone?.message}</p>
                    )}
                </div>
                <fieldset className="relative">
                    <legend>Quel est ton profile ?</legend>
                    <div className="mt-2 flex gap-3 items-center">
                        <input 
                            type="radio" 
                            className="appearance-none w-4 h-4 checked:bg-slate-900 checked:ring-offset-2 checked:ring-1 checked:ring-black bg-gray-100" 
                            {...register("profile", { required: true })}
                            id="client" 
                            value="client" 
                            checked={profil === "client"}
                            onChange={onOptionChange}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="client"> Client</label>
                    </div>
                    <div className="flex gap-3 items-center">
                        <input 
                            type="radio" 
                            className="appearance-none w-4 h-4 checked:bg-slate-900 checked:ring-offset-2 checked:ring-1 checked:ring-black bg-gray-100" 
                            {...register("profile", { required: true })}
                            id="coiffeur" 
                            value="coiffeur" 
                            checked={profil === "coiffeur"}
                            onChange={onOptionChange}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="coiffeur"> Coiffeur</label>
                    </div>
                    {errors.profile?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.profile?.message}</p>
                    )}
                </fieldset>
                
                <hr className="col-span-2 w-14 mt-3" />
                { profil === "coiffeur" && 
                    <div className="lg:col-span-2 col-span-2 flex flex-col gap-2 relative mb-3">
                       <Label htmlFor="adresse">Adresse:</Label>
                        <Input 
                            type="text" 
                            placeholder="15 rue General Leclerc" 
                            id="adresse"
                            className="required:border-red-500 position-icon"
                            {...register('adresse')}
                            disabled={isSubmitting}
                        /> 
                        {errors.adresse?.message && (
                            <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.adresse?.message}</p>
                        )}
                    </div>
                }
                
                <div className="col-span-2 flex gap-2 font-bold">
                    <button type="submit" className="bg-white text-black py-2 px-7 flex items-center gap-2" disabled={isSubmitting}><AiOutlineCheck />Valider</button>
                    <button type="reset" className="bg-red-800 py-2 px-7 flex items-center gap-2" disabled={isSubmitting}><span className="font-sans font-thin">X</span>Effacer</button>
                </div>
                <p className="italic col-span-2 font-extralight text-sm">Tu a déjà un <span className="font-bold">compte</span> ? Alors <Link href="/login" className="underline">Clique ici</Link></p>
            </form>
        </section>
    )
}