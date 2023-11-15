import { useFormState } from "react-dom";
import { Error } from "../ui/error";

export function ActionForm({ action, children }: any) {
    const [state, formAction] = useFormState(action, {
        error: null
    });
    return (
        <form action={formAction}>
            {!!state.error && <Error message={state.error} />}
            {children}
        </form>
    );
}