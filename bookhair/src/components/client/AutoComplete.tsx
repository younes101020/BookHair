'use client'

import { Input } from "../ui/input";
import useAddressFacade from "@/facade/useAddressFacade";

export default function AutoComplete({ isSubmitting, register }: { isSubmitting: boolean, register: any }) {

    const { fetchAddress, error, loading, features }: any = useAddressFacade;

    const handleChange = async ({ target: { value } }: any) => {
        
        if (value.length > 3) {
          const suggestion = await fetchAddress(encodeURIComponent(value));
          console.log(suggestion);
        }
    };

    return (
        <Input
            type="text"
            placeholder="15 rue General Leclerc"
            id="adresse"
            data-test="adresse"
            className="position-icon required:border-red-500"
            {...register("adresse")}
            disabled={isSubmitting}
            onChange={handleChange}
        />
    )
}