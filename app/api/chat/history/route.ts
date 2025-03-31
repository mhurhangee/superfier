import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId,
      messages: {
        not: [],
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return new Response(JSON.stringify(chats))
}
