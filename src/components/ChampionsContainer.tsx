import ChampionCard from "./ChampionCard"
import Link from "next/link"
import { prisma } from "@/db"
import { FC } from "react"
import { getCookie } from "@/actions/cookie-actions"

const buildFetcher = async () => {
    try {
        let key = await getCookie()
        await prisma.$connect
        const saved = await prisma.build.findMany({
            where: {
                key: {
                    equals: key
                }
            }
        })
        return saved
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect
    }
}

const ChampionsContainer: FC<{ roleName: string }> = async ({ roleName }) => {
    const builds = await buildFetcher()
    return (


        <div className="grid xl:grid-rows-5 gap-3 sm:grid-rows-2">
            <h1 className="text-4xl capitalize text-center my-auto">{roleName}</h1>

            {
                builds?.map(build => build.role === roleName ?
                    <ChampionCard {...build} /> :
                    null)
            }
            {
                <Link href={`/${roleName}`}> <ChampionCard /> </Link>
            }
        </div>

    )
}

export default ChampionsContainer
