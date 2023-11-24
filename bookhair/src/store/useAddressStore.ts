import { create } from "zustand";
import { addressSchema, addressType } from "@/shared/lib/zod/address.schema";

interface AddressState {
  features: addressType,
  input: string,
  loading: boolean,
  error: string,
  
  fetchAddress: (input: string) => void
}

const initialState = {
  features: [
    {
      properties: {
        id: "",
        city: "",
        context: "",
      }
    }
  ],
  input: "",
  error: "",
  loading: false,
}

const useAddressStore = create<AddressState>()((set) => ({
  features: initialState.features,
  input: initialState.input,
  error: initialState.error,
  loading: initialState.loading,

  fetchAddress: async (input: string) => {
    set((state) => ({ ...state, loading: true }))
    try {
      const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/?q=${input}&limit=15`)
      const address: addressType = await res.json();
      if(!addressSchema.safeParse(address).success || !res.ok) {
        throw new Error("API response error")
      }
      set((state) => ({ ...state, error: "", address }))
    } catch (error: any) {
      set((state) => ({
        ...state,
        error: error.message,
      }))
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }))
    }
  },
}))

export { useAddressStore, type AddressState }