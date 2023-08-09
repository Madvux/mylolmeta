import { NextResponse } from "next/server";
import { prisma } from "../../../db";

export const GET = async () => {
    try {
        await prisma.$connect()
        const champions = await prisma.champion.findMany()

        return NextResponse.json({ champions }, { status: 200 })
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
        if (!name || !league_id) return NextResponse.json({ error: "Champion needs name and league id" }, { status: 422 })

        await prisma.$connect()
        const existingChampion = await prisma.champion.findFirst({ where: { name } })
        if (existingChampion) return NextResponse.json({ message: `${name} already exist.` }, { status: 403 })

        const champion = await prisma.champion.create({ data: { name, league_id } })

        return NextResponse.json({ champion }, { status: 201 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}
