"use server"

import { prisma } from "@/db"
import { revalidatePath } from "next/cache"

export const deleteBuild = async (id: string) => {

    try {
        await prisma.$connect()
        await prisma.build.delete({ where: { id } })
        revalidatePath("/")
    } catch (error) {
        return {
            error: "Some error occurred while deleting..., database is not responding."
        }
    } finally {
        await prisma.$disconnect()
    }
}

type FormData = {
    roleID: string,
    championID: string,
    itemsIDArray: string[],
    primaryPerksIDArray: string[]
    secondaryPerksIDArray: string[]
    key: string
}
export const createBuild = async ({ roleID, championID, itemsIDArray, primaryPerksIDArray, secondaryPerksIDArray, key }: FormData) => {
    if (!roleID || !championID) return { error: "Make sure to pick champion" }
    if (primaryPerksIDArray.length != 4) return { error: "Pick 4 primary runes" }
    if (secondaryPerksIDArray.length != 2) return { error: "Pick 2 secondary runes" }

    try {
        await prisma.$connect()

        await prisma.build.create({
            data: {
                champion: championID,
                role: roleID,
                key: key,
                items: itemsIDArray,
                runes: [primaryPerksIDArray, secondaryPerksIDArray]
            }
        })
        revalidatePath(`/`)

    }
    catch (error) {
        console.error(error)
        return {
            error: "Error while saving data try again later or contact administrator"
        }
    } finally {
        await prisma.$disconnect()

    }
}
