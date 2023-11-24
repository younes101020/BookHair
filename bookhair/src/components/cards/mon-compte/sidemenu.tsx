"use client";
import { Roboto } from "@/app/fonts";
import { useState } from "react";
import Card from "./card";

function SideMenu({ id }: any) {
  const [state, setState] = useState("reservations");

  const updateSection = (value: string) => {
    setState(value);
  };

  return (
    <section className={`flex flex-wrap gap-2 px-10 pt-24 ${Roboto.className}`}>
      <div className="sidemenu flex w-full gap-2 bg-slate-300 p-2 lg:w-auto lg:flex-col">
        <h1 className="hidden text-lg lg:block">Mon compte</h1>
        <hr className="hidden lg:block" />
        <button
          onClick={() => updateSection("reservations")}
          className={state === "reservations" ? "underline" : ""}
        >
          Réservations
        </button>
        <p className="lg:hidden">/</p>
        <button
          onClick={() => updateSection("informations")}
          className={state === "informations" ? "underline" : ""}
        >
          Informations
        </button>
      </div>
      {state === "reservations" && <Card id={id} />}
      {state === "informations" && (
        <div className="flex flex-col items-center gap-2 bg-slate-300 p-2">
          <div>mes infos</div>
        </div>
      )}
    </section>
  );
}

export default SideMenu;
