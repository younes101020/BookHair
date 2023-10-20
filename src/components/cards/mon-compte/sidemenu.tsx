'use client'
import { Roboto } from "@/app/fonts";
import { useState } from "react";
import Card from "./card";

function SideMenu({id}: any) {
    const [state, setState] = useState('reservations')

    const updateSection = (value: string) => {
        setState(value)
    }

    return (
            <section className={`pt-24 px-10 flex flex-wrap gap-2 ${Roboto.className}`}>
                <div className="w-full lg:w-auto sidemenu flex gap-2 lg:flex-col bg-slate-300 p-2">
                    <h1 className="text-lg hidden lg:block">Mon compte</h1>
                    <hr className="hidden lg:block" />
                    <button onClick={() => updateSection('reservations')} className={state === 'reservations' ? 'underline' : ''}>Réservations</button>
                    <p className="lg:hidden">/</p>
                    <button onClick={() => updateSection('informations')} className={state === 'informations' ? 'underline' : ''}>Informations</button>
                </div>
                        {state === 'reservations' && (
                                <Card id={id} />
                        )}
                        {state === 'informations' && 
                        <div className="flex flex-col items-center gap-2 bg-slate-300 p-2">
                            <div>mes infos</div>
                        </div>
                        }
            </section> 
    )
}

export default SideMenu;