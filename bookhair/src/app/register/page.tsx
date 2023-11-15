'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { addUser } from "@/app/actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from "react";
import { RegisterType, registerSchema } from "@/shared/lib/zod/user.schema";
import { AiOutlineCheck } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/client/ActionForm";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';

async function getAutoCompletePosition(address: string) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/?q=${address}&limit=15`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default function RegisterPage() {
    // const top100Films = [
    //     { title: 'The Shawshank Redemption', year: 1994 },
    //     { title: 'The Godfather', year: 1972 },
    //     { title: 'The Godfather: Part II', year: 1974 },
    //     { title: 'The Dark Knight', year: 2008 },
    //     { title: '12 Angry Men', year: 1957 },
    //     { title: "Schindler's List", year: 1993 },
    //     { title: 'Pulp Fiction', year: 1994 },
    //     {
    //       title: 'The Lord of the Rings: The Return of the King',
    //       year: 2003,
    //     },
    //     { title: 'The Good, the Bad and the Ugly', year: 1966 },
    //     { title: 'Fight Club', year: 1999 },
    //     {
    //       title: 'The Lord of the Rings: The Fellowship of the Ring',
    //       year: 2001,
    //     },
    //     {
    //       title: 'Star Wars: Episode V - The Empire Strikes Back',
    //       year: 1980,
    //     },
    //     { title: 'Forrest Gump', year: 1994 },
    //     { title: 'Inception', year: 2010 },
    //     {
    //       title: 'The Lord of the Rings: The Two Towers',
    //       year: 2002,
    //     },
    //     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    //     { title: 'Goodfellas', year: 1990 },
    //     { title: 'The Matrix', year: 1999 },
    //     { title: 'Seven Samurai', year: 1954 },
    //     {
    //       title: 'Star Wars: Episode IV - A New Hope',
    //       year: 1977,
    //     },
    //     { title: 'City of God', year: 2002 },
    //     { title: 'Se7en', year: 1995 },
    //     { title: 'The Silence of the Lambs', year: 1991 },
    //     { title: "It's a Wonderful Life", year: 1946 },
    //     { title: 'Life Is Beautiful', year: 1997 },
    //     { title: 'The Usual Suspects', year: 1995 },
    //     { title: 'Léon: The Professional', year: 1994 },
    //     { title: 'Spirited Away', year: 2001 },
    //     { title: 'Saving Private Ryan', year: 1998 },
    //     { title: 'Once Upon a Time in the West', year: 1968 },
    //     { title: 'American History X', year: 1998 },
    //     { title: 'Interstellar', year: 2014 },
    //     { title: 'Casablanca', year: 1942 },
    //     { title: 'City Lights', year: 1931 },
    //     { title: 'Psycho', year: 1960 },
    //     { title: 'The Green Mile', year: 1999 },
    //     { title: 'The Intouchables', year: 2011 },
    //     { title: 'Modern Times', year: 1936 },
    //     { title: 'Raiders of the Lost Ark', year: 1981 },
    //     { title: 'Rear Window', year: 1954 },
    //     { title: 'The Pianist', year: 2002 },
    //     { title: 'The Departed', year: 2006 },
    //     { title: 'Terminator 2: Judgment Day', year: 1991 },
    //     { title: 'Back to the Future', year: 1985 },
    //     { title: 'Whiplash', year: 2014 },
    //     { title: 'Gladiator', year: 2000 },
    //     { title: 'Memento', year: 2000 },
    //     { title: 'The Prestige', year: 2006 },
    //     { title: 'The Lion King', year: 1994 },
    //     { title: 'Apocalypse Now', year: 1979 },
    //     { title: 'Alien', year: 1979 },
    //     { title: 'Sunset Boulevard', year: 1950 },
    //     {
    //       title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    //       year: 1964,
    //     },
    //     { title: 'The Great Dictator', year: 1940 },
    //     { title: 'Cinema Paradiso', year: 1988 },
    //     { title: 'The Lives of Others', year: 2006 },
    //     { title: 'Grave of the Fireflies', year: 1988 },
    //     { title: 'Paths of Glory', year: 1957 },
    //     { title: 'Django Unchained', year: 2012 },
    //     { title: 'The Shining', year: 1980 },
    //     { title: 'WALL·E', year: 2008 },
    //     { title: 'American Beauty', year: 1999 },
    //     { title: 'The Dark Knight Rises', year: 2012 },
    //     { title: 'Princess Mononoke', year: 1997 },
    //     { title: 'Aliens', year: 1986 },
    //     { title: 'Oldboy', year: 2003 },
    //     { title: 'Once Upon a Time in America', year: 1984 },
    //     { title: 'Witness for the Prosecution', year: 1957 },
    //     { title: 'Das Boot', year: 1981 },
    //     { title: 'Citizen Kane', year: 1941 },
    //     { title: 'North by Northwest', year: 1959 },
    //     { title: 'Vertigo', year: 1958 },
    //     {
    //       title: 'Star Wars: Episode VI - Return of the Jedi',
    //       year: 1983,
    //     },
    //     { title: 'Reservoir Dogs', year: 1992 },
    //     { title: 'Braveheart', year: 1995 },
    //     { title: 'M', year: 1931 },
    //     { title: 'Requiem for a Dream', year: 2000 },
    //     { title: 'Amélie', year: 2001 },
    //     { title: 'A Clockwork Orange', year: 1971 },
    //     { title: 'Like Stars on Earth', year: 2007 },
    //     { title: 'Taxi Driver', year: 1976 },
    //     { title: 'Lawrence of Arabia', year: 1962 },
    //     { title: 'Double Indemnity', year: 1944 },
    //     {
    //       title: 'Eternal Sunshine of the Spotless Mind',
    //       year: 2004,
    //     },
    //     { title: 'Amadeus', year: 1984 },
    //     { title: 'To Kill a Mockingbird', year: 1962 },
    //     { title: 'Toy Story 3', year: 2010 },
    //     { title: 'Logan', year: 2017 },
    //     { title: 'Full Metal Jacket', year: 1987 },
    //     { title: 'Dangal', year: 2016 },
    //     { title: 'The Sting', year: 1973 },
    //     { title: '2001: A Space Odyssey', year: 1968 },
    //     { title: "Singin' in the Rain", year: 1952 },
    //     { title: 'Toy Story', year: 1995 },
    //     { title: 'Bicycle Thieves', year: 1948 },
    //     { title: 'The Kid', year: 1921 },
    //     { title: 'Inglourious Basterds', year: 2009 },
    //     { title: 'Snatch', year: 2000 },
    //     { title: '3 Idiots', year: 2009 },
    //     { title: 'Monty Python and the Holy Grail', year: 1975 },
    //   ];
    const { data: session } = useSession();
    if(session) {
        redirect('/mon-compte')
    }
    const [profil, setProfil] = useState<String>("client");
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfil(e.target.value)
    }

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors, isSubmitting },
    // } = useForm<RegisterType>({
    //     resolver: zodResolver(registerSchema),
    // });

    // const onSubmit: SubmitHandler<RegisterType> = (data) => {
    //     startTransition(() => {
    //         addUser(data);
    //     })
    // };

    const handleChange = async ({ target: { value }}: any) => {
        if(value.length > 3) {
            const suggestion = await getAutoCompletePosition(encodeURIComponent(value));
            console.log(suggestion)
        } 
    }
    
    return (
        <section className="min-h-screen pt-24 lg:pt-0 text-lg bg-gradient-to-r from-slate-900 to-stone-950 flex flex-col gap-2 justify-center items-center">
            <ActionForm action={addUser} className="lg:w-2/4 grid sm:grid-cols-2 gap-8 backdrop-blur-2xl bg-stone-950/30 px-5 py-10 rounded-md text-white">
                <h1 className="col-span-2 text-3xl "><span className="font-bold">Inscris-toi</span> <span className="underline">vite</span>, et prend rendez-vous.</h1>
                <hr className="col-span-2 w-48 my-3" />
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="nom">Nom:</Label>
                    <Input 
                        type="text" 
                        placeholder="Doe" 
                        id="nom"
                        data-test="nom"
                        className="required:border-red-500 name-icon"
                        {...register('nom')}
                        disabled={isSubmitting}
                    />
                    {errors.nom?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.nom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="prenom">Prénom:</Label>
                    <Input 
                        type="text" 
                        placeholder="John" 
                        id="prenom"
                        data-test="prenom"
                        className="required:border-red-500 name-icon"
                        {...register('prenom')}
                        disabled={isSubmitting}
                    />
                    {errors.prenom?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.prenom?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="mot_de_passe">Mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="mot_de_passe"
                        data-test="mot_de_passe"
                        className="required:border-red-500 password-icon"
                        {...register('mot_de_passe')}
                        disabled={isSubmitting}
                    />
                    {errors.mot_de_passe?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.mot_de_passe?.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1 relative">
                    <Label htmlFor="confirm">Retapez le mot de passe:</Label>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        id="confirm"
                        data-test="confirm"
                        className="required:border-red-500 password-icon"
                        {...register('confirm')}
                        disabled={isSubmitting}
                    />
                    {errors.confirm?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.confirm?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="email">Adresse mail:</Label>
                    <Input 
                        type="text" 
                        placeholder="johndoe@gmail.com" 
                        id="email"
                        data-test="email"
                        className="required:border-red-500 email-icon"
                        {...register('email')}
                        disabled={isSubmitting}
                    />
                    {errors.email?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.email?.message}</p>
                    )}
                </div>
                <div className="lg:col-span-1 col-span-2 flex flex-col gap-2 relative">
                    <Label htmlFor="telephone">Téléphone:</Label>
                    <Input 
                        type="tel" 
                        placeholder="07.60.**.**.**" 
                        id="telephone"
                        data-test="telephone"
                        className="required:border-red-500 phone-icon"
                        {...register('telephone')}
                        disabled={isSubmitting}
                    />
                    {errors.telephone?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.telephone?.message}</p>
                    )}
                </div>
                <fieldset className="relative">
                    <legend>Quel est ton profile ?</legend>
                    <div className="mt-2 flex gap-3 items-center">
                        <input 
                            type="radio" 
                            className="appearance-none w-4 h-4 checked:bg-slate-900 checked:ring-offset-2 checked:ring-1 checked:ring-black bg-gray-100" 
                            {...register("profile", { required: true })}
                            id="client"
                            data-test="client"
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
                            data-test="coiffeur"
                            value="coiffeur" 
                            checked={profil === "coiffeur"}
                            onChange={onOptionChange}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="coiffeur"> Coiffeur</label>
                    </div>
                    {errors.profile?.message && (
                        <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.profile?.message}</p>
                    )}
                </fieldset>
                <hr className="col-span-2 w-14 mt-3" />
                { profil === "coiffeur" && 
                    <div className="lg:col-span-2 col-span-2 flex flex-col gap-2 relative mb-3">
                       <Label htmlFor="adresse">Adresse:</Label>
                        <Input 
                            type="text" 
                            placeholder="15 rue General Leclerc" 
                            id="adresse"
                            data-test="adresse"
                            className="required:border-red-500 position-icon"
                            {...register('adresse')}
                            disabled={isSubmitting}
                        /> 
                        {errors.adresse?.message && (
                            <p className="text-sm text-red-600 absolute bottom-[-2rem]">{errors.adresse?.message}</p>
                        )}
                        {/* <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={top100Films.map((option) => option.title)}
                            renderInput={(params: any) => <TextField {...params} label="freeSolo" />}
                        /> */}
                    </div>
                }
                <div className="col-span-2 flex gap-2 font-bold">
                    <button type="submit" className="bg-white text-black py-2 px-7 flex items-center gap-2" disabled={isSubmitting} data-test="submit"><AiOutlineCheck />Valider</button>
                    <button type="reset" className="bg-red-800 py-2 px-7 flex items-center gap-2" disabled={isSubmitting}><span className="font-sans font-thin">X</span>Effacer</button>
                </div>
                <p className="italic col-span-2 font-extralight text-sm">Tu a déjà un <span className="font-bold">compte</span> ? Alors <Link href="/login" className="underline">Clique ici</Link></p>
            </ActionForm>
        </section>
    )
}