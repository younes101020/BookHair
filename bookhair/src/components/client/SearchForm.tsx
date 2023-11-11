'use client'

import { getCoiffeur } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRouter } from 'next/navigation'

const SearchForm = (): JSX.Element => {

    const router = useRouter()
    const { pending } = useFormStatus();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formElements = form.elements as typeof form.elements & {
            service: HTMLInputElement,
            ville: HTMLInputElement
        }
        const { service, ville } = formElements;
        const { id } = await getCoiffeur({ service, ville });
        router.push(`/coiffeur/${id}`)
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className="w-96 z-20 pr-8 flex flex-col gap-4">
            <Input type="text" name="service" placeholder="Prestation..." className="bg-transparent backdrop-blur-lg placeholder:text-white/75 text-white" />
            <Input type="text" name="ville" placeholder="Adresse, ville" className="bg-transparent backdrop-blur-lg placeholder:text-white/75 text-white" />
            <Button variant="outline">
                {pending ? "En cours..." : "Chercher"}
            </Button>
        </form>
    )
}

export default SearchForm;