import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.$connect()
        const item = await prisma.item.findFirst({ where: { id: params.id } })

        return NextResponse.json({ item }, { status: 200 })
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
        const updatedItem = await prisma.item.update({
            data: { name, league_id },
            where: { id: params.id }
        })
        console.log(updatedItem)
        return NextResponse.json({ updatedItem }, { status: 200 })
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
        const item = await prisma.item.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ item }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        return NextResponse.json({ error: error.message }, { status: 503 })
    } finally {
        await prisma.$disconnect()
    }
}