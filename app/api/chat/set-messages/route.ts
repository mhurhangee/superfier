import { prisma } from "@/lib/prisma"
import { JsonValue } from "@prisma/client/runtime/library"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { messages, id } = await req.json()

  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await prisma.chat.update({
    where: {
      id: id,
      userId: userId
    },
    data: {
      messages: messages as unknown as JsonValue[]
    }
  })

  return new Response(JSON.stringify({}))
}