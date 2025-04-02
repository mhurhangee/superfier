import { AlertTriangle } from "lucide-react";

export function ChatError({ status, tooLong }: { status: string, tooLong: boolean }) {
  return (
    <>
      {status === 'error' && (
        <div className="text-sm bg-red-900/20 text-red-200 border border-red-800 rounded-lg p-3 my-2">
          An error occurred. Please try again.
        </div>
      )}
      {tooLong && (
        <div className="text-sm bg-red-900/20 text-red-200 border border-red-800 rounded-lg p-3 my-2">
          <AlertTriangle className="inline-block size-4" /> <span className="font-semibold">Memory limit exceeded. Start a new chat.</span>
        </div>
      )}
    </>
  )
}
