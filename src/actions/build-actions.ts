"use server"

import { prisma } from "@/db"
import { revalidatePath } from "next/cache"

export const deleteBuild = async (id:string) => {

    try {
        await prisma.$connect()
        await prisma.build.delete({where: {id}})

    } catch (error) {
        return {
            error: "something went wrong"
        }
    }finally{
        await prisma.$disconnect()
    }

  revalidatePath("/")
}

export const createBuild = async (championId: string, roleId:string, items:string[], runes: string) => {


    try {
        await prisma.$connect
        await prisma.build.create({ data: { championId, roleId, items: {connect: items.map(e => ({id: e}))  }, runes:{connect: {id: runes}} }})
    } catch (error) {
        return {
            error: "something went wrong"
        }
    } finally {
        await prisma.$disconnect
        
    }
    revalidatePath("/")
}

