'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { AiOutlineCheck, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FormEventHandler, useState } from "react";

export default function LoginPage() {
    const [userInfo, setUserInfo] = useState({email: "",mot_de_passe: ""});

    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            email: userInfo.email,
            mot_de_passe: userInfo.mot_de_passe,
            redirect: false
        })
        console.log(res)
    }

    return (
        <section className="h-screen text-lg bg-gradient-radial from-slate-900 to-stone-950 flex flex-col gap-2 justify-center items-center">
            <form onSubmit={handleSubmit} className="lg:w-2/4 mx-2 mt-3 grid sm:grid-cols-2 gap-3 backdrop-blur-2xl bg-stone-950/30 px-5 py-10 rounded-md text-white">
                <h1 className="col-span-2 text-3xl "><span className="font-bold">Connecte-toi</span> <span className="underline">vite</span>, et prend rendez-vous.</h1>
                <hr className="col-span-2 w-48 my-3" />

                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <label htmlFor="email">Adresse mail:</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="johndoe@gmail.com" 
                        value={userInfo.email} 
                        onChange={({target}) => {
                            setUserInfo({...userInfo, email: target.value})
                        }} 
                        className="required:border-red-500" 
                    />
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineMail />
                    </div>
                </div>
                <div className="flex flex-col gap-2 col-span-1 lg:col-span-1 relative">
                    <label htmlFor="mot_de_passe">Mot de passe:</label>
                    <input 
                        type="password" 
                        name="mot_de_passe" 
                        id="mot_de_passe" 
                        placeholder="••••••••" 
                        value={userInfo.mot_de_passe}
                        onChange={({target}) => {
                            setUserInfo({...userInfo, mot_de_passe: target.value})
                        }}
                        className="required:border-red-500" 
                    />
                    <div className="absolute bottom-[0.3rem] left-1">
                        <AiOutlineLock />
                    </div>
                </div>
                <hr className="col-span-2 w-14 my-3" />
                <div className="col-span-2 flex gap-2 font-bold">
                    <button type="submit" className="bg-white text-black py-2 px-7 flex items-center gap-2"><AiOutlineCheck />Valider</button>
                    <button type="reset" className="bg-red-800 py-2 px-7 flex items-center gap-2"><span className="font-sans font-thin">X</span>Effacer</button>
                </div>
                <p className="italic col-span-2 font-extralight text-sm">Tu n'a pas encore de <span className="font-bold">compte</span> ? Alors <Link href="/register" className="underline">Clique ici</Link></p>
            </form>
        </section>
    )
}