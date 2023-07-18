'use client'

import { addUser } from "@/app/actions"

export default function RegisterPage() {
    async function action(data: unknown) {
        const result = await addUser(data);

        console.log(result)
    }
    return (
        <form action={action} className="h-screen flex gap-2 justify-center items-center">
            <label htmlFor="name" className="text-white">Name:</label>
            <input type="text" name="name" id="name" />

            <label htmlFor="message" className="text-white">Message:</label>
            <input type="text" name="message" id="message" />

            <button type="submit" className="bg-white text-black">Valider</button>
        </form>
    )
}