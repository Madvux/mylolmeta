import { NextResponse } from "next/server";
import { prisma } from "../../../db";

export const GET = async () => {
    try {
        await prisma.$connect()
        const items = await prisma.item.findMany()

        return NextResponse.json({ items }, { status: 200 })
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
        if (!name || !league_id) return NextResponse.json({ error: "Item needs name and league id" }, { status: 422 })

        await prisma.$connect()
        const existingItem = await prisma.item.findFirst({ where: { name } })
        if (existingItem) return NextResponse.json({ message: `${name} already exist.` }, { status: 403 })

        const item = await prisma.item.create({ data: { name, league_id } })

        return NextResponse.json({ item }, { status: 201 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}
