import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.$connect()
        const rune = await prisma.rune.findFirst({ where: { id: params.id } })

        return NextResponse.json({ rune }, { status: 200 })
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
        const updatedRune = await prisma.rune.update({
            data: { name, league_id },
            where: { id: params.id }
        })
        console.log(updatedRune)
        return NextResponse.json({ updatedRune }, { status: 200 })
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
        const rune = await prisma.rune.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ rune }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}