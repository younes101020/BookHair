'use client';
import { useEffect, useState } from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
import { PiClockCountdownLight } from "react-icons/pi";

export default function Card({id}: any) {
    const [reservations, setReservations] = useState<any>([]);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch(`http://localhost:3000/api/reservation?id=${id}`, {
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
            <>
                {reservations.map((reservation: any) => (
                    <div className="card flex flex-col gap-2" key={reservation.id}>
                        <h1 className="text-lg">{reservation.serviceDetails.service.nom}</h1>
                        <hr />
                        <h2>{reservation.serviceDetails.service.description}</h2>
                        <p className="flex items-center">{reservation.serviceDetails.prix} <LiaEuroSignSolid /></p>
                        <p className="flex items-center gap-1"><span>{reservation.serviceDetails.service.duree} min</span> <PiClockCountdownLight /></p>
                        <p className="muted">Pour le {reservation.date_reserv}</p>
                        <p className="muted">Créer le {reservation.date_creation}</p>
                    </div>
                ))}
            </>
    )
}

//<Suspense fallback={<div>Loading...</div>}>