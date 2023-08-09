import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.$connect()
        const champion = await prisma.champion.findFirst({ where: { id: params.id } })

        return NextResponse.json({ champion }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}
export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const {name, league_id} = await request.json()

        await prisma.$connect()
        const updatedChampion = await prisma.champion.update({
            data: { name, league_id },
            where: { id: params.id }
        })
        console.log(updatedChampion)
        return NextResponse.json({ updatedChampion }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.$connect()
        const champion = await prisma.champion.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ champion }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}