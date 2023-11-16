'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUser } from "@/app/actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterType, registerSchema } from "@/shared/lib/zod/user.schema";
import { AiOutlineCheck, AiOutlineEnvironment } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from 'react-hot-toast';

async function getAutoCompletePosition(address: string) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/?q=${address}&limit=15`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default function RegisterPage() {
    const { data: session } = useSession();
    if(session) {
        redirect('/mon-compte')
    }
    const [profil, setProfil] = useState<String>("client");

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

    const onSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
        const { error } = await addUser(data);
        if(error !== undefined) {
            toast.error(error);
        } else {
            toast.success('Inscription réussis');
            redirect('/login')
        }
    };

    const handleChange = async ({ target: { value }}: any) => {
        if(value.length > 3) {
            const suggestion = getAutoCompletePosition(encodeURIComponent(value));
            console.log(suggestion)
        } 
    }
    
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
                        data-test="nom"
                        className="required:border-red-500 name-icon"
                        {...register('nom')}
                        disabled={isSubmitting}
                    />
                    {errors.nom?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.nom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="prenom">Prénom:</Label>
                    <Input 
                        type="text" 
                        placeholder="John" 
                        id="prenom"
                        data-test="prenom"
                        className="required:border-red-500 name-icon"
                        {...register('prenom')}
                        disabled={isSubmitting}
                    />
                    {errors.prenom?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.prenom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="mot_de_passe">Mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="mot_de_passe"
                        data-test="mot_de_passe"
                        className="required:border-red-500 password-icon"
                        {...register('mot_de_passe')}
                        disabled={isSubmitting}
                    />
                    {errors.mot_de_passe?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.mot_de_passe?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="confirm">Retapez le mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="confirm"
                        data-test="confirm"
                        className="required:border-red-500 password-icon"
                        {...register('confirm')}
                        disabled={isSubmitting}
                    />
                    {errors.confirm?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.confirm?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="email">Adresse mail:</Label>
                    <Input 
                        type="text" 
                        placeholder="johndoe@gmail.com" 
                        id="email"
                        data-test="email"
                        className="required:border-red-500 email-icon"
                        {...register('email')}
                        disabled={isSubmitting}
                    />
                    {errors.email?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.email?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="telephone">Téléphone:</Label>
                    <Input 
                        type="tel" 
                        placeholder="07.60.**.**.**" 
                        id="telephone"
                        data-test="telephone"
                        className="required:border-red-500 phone-icon"
                        {...register('telephone')}
                        disabled={isSubmitting}
                    />
                    {errors.telephone?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.telephone?.message}</p>
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
                            data-test="client"
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
                            data-test="coiffeur"
                            value="coiffeur" 
                            checked={profil === "coiffeur"}
                            onChange={onOptionChange}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="coiffeur"> Coiffeur</label>
                    </div>
                    {errors.profile?.message && (
                        <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.profile?.message}</p>
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
                            data-test="adresse"
                            className="required:border-red-500 position-icon"
                            {...register('adresse')}
                            disabled={isSubmitting}
                        /> 
                        {errors.adresse?.message && (
                            <p className="text-sm whitespace-nowrap text-red-600 absolute bottom-[-1.8rem]">{errors.adresse?.message}</p>
                        )}
                    </div>
                }
                
                <div className="col-span-2 flex gap-2 font-bold">
                    <button type="submit" className="bg-white text-black py-2 px-7 flex items-center gap-2" disabled={isSubmitting} data-test="submit"><AiOutlineCheck />Valider</button>
                    <button type="reset" className="bg-red-800 py-2 px-7 flex items-center gap-2" disabled={isSubmitting}><span className="font-sans font-thin">X</span>Effacer</button>
                </div>
                <p className="italic col-span-2 font-extralight text-sm">Tu a déjà un <span className="font-bold">compte</span> ? Alors <Link href="/login" className="underline">Clique ici</Link></p>
            </form>
        </section>
    )
}