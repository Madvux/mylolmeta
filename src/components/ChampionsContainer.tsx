import { Role } from "@prisma/client"
import ChampionCard from "./ChampionCard"
import Link from "next/link"
import { prisma } from "@/db"

const buildFetcher = async () => {
    try {
        await prisma.$connect
        const saved = await prisma.build.findMany({
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

const ChampionsContainer = async ({ id, name }: Role) => {
    const builds = await buildFetcher()

    return (


        <div className="grid xl:grid-rows-5 gap-3 sm:grid-rows-2">
            <h1 className="text-4xl capitalize text-center my-auto">{name}</h1>
            {
                builds?.map(build => build.roleId === id ? 
                    <ChampionCard key={build.id} {...build} /> :
                    null)
            }
            {<Link href={`/${id}`}> <ChampionCard /> </Link>
            }
        </div>

    )
}

export default ChampionsContainer
