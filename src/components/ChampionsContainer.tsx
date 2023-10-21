import { Role } from "@prisma/client"
import ChampionCard from "./ChampionCard"
import Link from "next/link"
import { prisma } from "@/db"
import { FC } from "react"

const buildFetcher = async (key: string) => {
    try {
        await prisma.$connect
        const saved = await prisma.build.findMany({
            where: {
                keyId: key
            },
            include: {
                champion: true,
                items: true,
                runes: true,
            }
        })
        return saved
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect
    }
}

const ChampionsContainer: FC<Role & { buildKey: string }> = async ({ id, name, buildKey }) => {
    const builds = await buildFetcher(buildKey ?? "")
    return (


        <div className="grid xl:grid-rows-5 gap-3 sm:grid-rows-2">
            <h1 className="text-4xl capitalize text-center my-auto">{name}</h1>

            {
                builds?.map(build => build.roleId === id ?
                    <ChampionCard key={build.id} {...build} /> :
                    null)
            }
            {buildKey
                ? <Link href={`/${id}?key=${buildKey}`}> <ChampionCard /> </Link>
                : <Link href={`/${id}`}> <ChampionCard /> </Link>
            }
        </div>

    )
}

export default ChampionsContainer
