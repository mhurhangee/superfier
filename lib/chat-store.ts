import { generateId } from "ai"
import { prisma } from "@/lib/prisma"
import { auth} from '@clerk/nextjs/server'


export async function createChat(): Promise<string> {
    const id = generateId()
    const userId = (await auth()).userId

    if (!userId) {
        throw new Error('Unauthorized')
    }

    await prisma.chat.create({
        data: {
            id: id,
            messages: [],
            userId: userId
        },
    })
    
    return id
}
  
