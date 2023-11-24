import { useAddressStore, AddressState } from "@/store/useAddressStore"

import shallow from "zustand/shallow"

const useAddressFacade = (): AddressState => {
  const { features, input, loading, error, fetchAddress } = useAddressStore(
    (state) => ({
      features: state.features,
      input: state.input,
      loading: state.loading,
      error: state.error,
      fetchAddress: state.fetchAddress,
    }),
    shallow
  )

  return { features, input, loading, error, fetchAddress }
}

export default useAddressFacade