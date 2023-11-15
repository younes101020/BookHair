export function Error({ message }: { message: string }): JSX.Element {
    return (
        <div className="text-red-700">
            <div className="text-2xl">Erreur</div>
            <div className="text-sm">{message}</div>
        </div>
    )
}