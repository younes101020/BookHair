'use client'

import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterType, registerSchema } from "@/lib/user.schema";
import { AiOutlineMail, AiOutlineAudit, AiOutlineLock, AiOutlineCheck, AiOutlinePhone, AiOutlineEnvironment } from "react-icons/ai";

export default function RegisterPage() {
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

    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        await new Promise(async (resolve) => {
          await setTimeout(() => {
            console.log(data);
            resolve(undefined);
          }, 3000);
        });
      };
    
    return (
        <section className="h-screen text-lg bg-gradient-radial from-slate-900 to-stone-950 flex flex-col gap-2 justify-center items-center">
            <form onSubmit={handleSubmit((d) => console.log(d))} className="lg:w-2/4 mx-2 mt-3 grid sm:grid-cols-2 gap-3 backdrop-blur-2xl bg-stone-950/30 px-5 py-10 rounded-md text-white">
                <h1 className="col-span-2 text-3xl "><span className="font-bold">Inscris-toi</span> <span className="underline">vite</span>, et prend rendez-vous.</h1>
                <hr className="col-span-2 w-48 my-3" />

                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" placeholder="Doe" className="required:border-red-500" {...register('nom')} disabled={isSubmitting} />
                    {errors.nom?.message && (
                        <p className="text-xs text-red-700">{errors.nom?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineAudit />
                    </div>
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <label htmlFor="prenom">Prénom:</label>
                    <input type="text" id="prenom" placeholder="John" className="required:border-red-500" {...register('prenom')} disabled={isSubmitting} />
                    {errors.prenom?.message && (
                        <p className="text-xs text-red-700">{errors.prenom?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineAudit />
                    </div>
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <label htmlFor="mot_de_passe">Mot de passe:</label>
                    <input type="password" {...register('mot_de_passe')} id="mot_de_passe" placeholder="••••••••" className="required:border-red-500" disabled={isSubmitting} />
                    {errors.mot_de_passe?.message && (
                        <p className="text-xs text-red-700">{errors.mot_de_passe?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineLock />
                    </div>
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <label htmlFor="confirm">Retapez le mot de passe:</label>
                    <input type="password" {...register('confirm')} id="confirm" placeholder="••••••••" className="required:border-red-500" disabled={isSubmitting} />
                    {errors.confirm?.message && (
                        <p className="text-xs text-red-700">{errors.confirm?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineLock />
                    </div>
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <label htmlFor="email">Adresse mail:</label>
                    <input type="text" {...register('email')} id="email" placeholder="johndoe@gmail.com" className="required:border-red-500" disabled={isSubmitting} />
                    {errors.email?.message && (
                        <p className="text-xs text-red-700">{errors.email?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineMail />
                    </div>
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <label htmlFor="telephone">Téléphone:</label>
                    <input type="tel" {...register('telephone')} id="telephone" placeholder="07.60.**.**.**" className="required:border-red-500" disabled={isSubmitting} />
                    {errors.telephone?.message && (
                        <p className="text-xs text-red-700">{errors.telephone?.message}</p>
                    )}
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlinePhone />
                    </div>
                </div>
                <fieldset>
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
                </fieldset>
                {errors.profile?.message && (
                    <p className="text-xs text-red-700">{errors.profile?.message}</p>
                )}
                <hr className="col-span-2 w-14 mt-3" />
                { profil === "coiffeur" && 
                    <div className="lg:col-span-2 col-span-2 flex flex-col gap-2 relative mb-3">
                        <label htmlFor="adresse">Adresse:</label>
                        <input type="text" {...register("adresse")} id="adresse" placeholder="15 rue General Leclerc" className="required:border-red-500" disabled={isSubmitting} />
                        {errors.adresse?.message && (
                            <p className="text-xs text-red-700">{errors.adresse?.message}</p>
                        )}
                        <div className="absolute bottom-[0.3rem] left-1">
                            <AiOutlineEnvironment />
                        </div>
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