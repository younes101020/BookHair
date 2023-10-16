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
            <section className={`p-24 flex gap-2 ${Roboto.className}`}>
                <div className="h-48 sidemenu flex flex-col bg-slate-300 p-2">
                    <h1 className="text-lg">Mon compte</h1>
                    <hr />
                    <button onClick={() => updateSection('reservations')}>Mes réservations</button>
                    <button onClick={() => updateSection('informations')}>Mes informations</button>
                </div>
                <div className="flex flex-col items-center gap-2 bg-slate-300 p-2">
                        {state === 'reservations' && (
                                <Card id={id} />
                        )}
                        {state === 'informations' && 
                            <div>mes infos</div>
                        }
                </div>
            </section> 
    )
}

export default SideMenu;