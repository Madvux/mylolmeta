import { NextResponse } from "next/server";
import { prisma } from "../../../db";

export const GET = async () => {
    try {
        await prisma.$connect()
        const runes = await prisma.rune.findMany({include: {perks: true}})

        return NextResponse.json({ runes }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (request: Request) => {
    try {
        const { name, league_id } = await request.json()
        if (!name || !league_id) return NextResponse.json({ error: "Rune needs name and league id" }, { status: 422 })

        await prisma.$connect()
        const existingRune = await prisma.rune.findFirst({ where: { name } })
        if (existingRune) return NextResponse.json({ message: `${name} already exist.` }, { status: 403 })

        const rune = await prisma.rune.create({ data: { name, league_id } })

        return NextResponse.json({ rune }, { status: 201 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}
