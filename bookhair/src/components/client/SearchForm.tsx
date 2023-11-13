'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation'

const SearchForm = (): JSX.Element => {

    const router = useRouter()
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formElements = form.elements as typeof form.elements & {
            service: HTMLInputElement,
            ville: HTMLInputElement
        }
        const { service, ville } = formElements;
        const url = new URLSearchParams(Array.from<any>(searchParams.entries()));

        if (service.value.length > 0) {
            url.set("service", service.value);
        }

        if (ville.value.length > 0) {
            url.set("ville", ville.value);
        }

        const query = url.toString().length > 0 ? `?${url.toString()}` : "";

        router.push(`/coiffeur${query}`);
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className="w-96 z-20 pr-8 flex flex-col gap-4">
            <Input type="text" name="service" placeholder="Prestation..." className="bg-transparent backdrop-blur-lg placeholder:text-white/75 text-white" />
            <Input type="text" name="ville" placeholder="Adresse, ville" className="bg-transparent backdrop-blur-lg placeholder:text-white/75 text-white" />
            <Button variant="outline">Chercher</Button>
        </form>
    )
}

export default SearchForm;