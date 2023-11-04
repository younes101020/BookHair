'use client';
import { useEffect, useState } from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
import { PiClockCountdownLight, PiMapPinBold } from "react-icons/pi";

export default function Card({id}: any) {
    const [reservations, setReservations] = useState<any>([]);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch(`http://localhost:3333/api/reservation?id=${id}`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              });
            const data = await response.json();
            setReservations(data);
        }
        fetchReservation();
    }, [])

    return (
            <div className="lg:w-auto flex gap-2">
                {reservations.map((reservation: any) => (
                    <div className="card flex flex-col gap-2 bg-slate-300 p-2" key={reservation.id}>
                        <div className="card-header flex flex-col">
                            <h1 className="text-lg font-semibold">{reservation.date_reserv}</h1>
                            <p className="font-medium">{reservation.serviceDetails.service.nom}</p>
                        </div>
                        <hr />
                        <h2>{reservation.serviceDetails.service.description}</h2>
                        <p className="text-sm">
                            <div className="flex gap-1 items-center">
                                < PiMapPinBold /> 
                                {reservation.serviceDetails.coiffeur.adresse}
                            </div>
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                            <div className="flex items-center gap-1">
                                {reservation.serviceDetails.prix}<LiaEuroSignSolid />
                            </div>
                            <span>
                                -
                            </span>                            
                            <div className="flex items-center gap-1">
                                <PiClockCountdownLight /><div>{reservation.serviceDetails.service.duree} min</div>
                            </div>
                        </p>
                        <p className="muted text-primary">Créer le: {reservation.date_creation}</p>
                    </div>
                ))}
            </div>
    )
}

//<Suspense fallback={<div>Loading...</div>}>