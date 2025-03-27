export function ChatError({ status }: { status: string }) {
    return (
        <>
            {status === "error" && (
                <div className="text-sm bg-red-900/20 text-red-200 border border-red-800 rounded-lg p-3 my-2">
                    An error occurred. Please try again.
                </div>
            )}
        </>
    )
}
