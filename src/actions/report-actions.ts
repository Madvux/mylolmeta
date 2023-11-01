"use server"
import { prisma } from "@/db"
import { revalidatePath } from "next/cache"

export const createBugReport = async (text: string) => {

    try {
        await prisma.$connect()
        await prisma.report.create({ data: { text } })
        revalidatePath("/feedback")
    } catch (error) {
        return {
            error: "Some error occurred while creating a report..., database is not responding."
        }
    } finally {
        await prisma.$disconnect()
    }
}

export const deleteBugReport = async (id: string) => {

    try {
        await prisma.$connect()
        await prisma.report.delete({ where: { id } })
        revalidatePath("/feedback")
    } catch (error) {
        return {
            error: "Some error occurred while deleting..., database is not responding."
        }
    } finally {
        await prisma.$disconnect()
    }
}

