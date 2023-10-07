"use server"

import { prisma } from "@/db"
import { Champion, Item, Prisma, Role, Rune } from '@prisma/client'
import { revalidatePath } from "next/cache"

export const deleteBuild = async (id: string) => {

    try {
        await prisma.$connect()
        await prisma.build.delete({ where: { id } })

    } catch (error) {
        return {
            error: "something went wrong"
        }
    } finally {
        await prisma.$disconnect()
    }

    revalidatePath("/")
    // }

    // export const createBuild = async (championId: string, roleId: string, items: string[], runes: string) => {
    //     let build: Prisma.BuildCreateInput

    //     // build = {
    //     //     champion: { connect: { id: championId } },
    //     //     role: { connect: { id: roleId } },
    //     //     items: { connect: items.map(e => ({ id: e })) },
    //     //     runes: { connect: { id: runes } }

    //     // }
    //     // console.log(build)
    //     // try {
    //     //     await prisma.$connect
    //     //     // await prisma.build.create({ data: { championId, roleId, items: {connect: items.map(e => ({id: e}))  }, runes:{connect: {id: runes}} }})
    //     //     await prisma.build.create({include: })
    //     // } catch (error) {
    //     //     return {
    //     //         error: "something went wrong"
    //     //     }
    //     // } finally {
    //     //     await prisma.$disconnect

    //     // }
    //     try {
    //         await prisma.$connect
    //         // await prisma.build.create({ data: { championId, roleId, items: {connect: items.map(e => ({id: e}))  }, runes:{connect: {id: runes}} }})
    //         await prisma.build.create({
    //             data: {
    //                 championId: championId,
    //                 roleId: roleId,
    //                 items: {
    //                     connect:
    //                     items.map(e => ({id: e}))
    //                 },
    //                 // runes: {
    //                 //     connect: [{
    //                 //         id: runes,
    //                 //         perks: {
    //                 //             some: {
    //                 //                 id: { equals: undefined },
    //                 //             }
    //                 //         },
    //                 //     }, {
    //                 //         id: runes,
    //                 //         perks: {
    //                 //             some: {
    //                 //                 id: {in: ["",""]},
    //                 //             }
    //                 //         },
    //                 //     }
    //                 //     ]
    //                 // },
    //                 // runes: {
    //                 //     connect:[
    //                 //         {id: ""},
    //                 //         { id: ""},
    //                 //     ]
    //                 // }

    //             }
    //         })
    //     } catch (error) {
    //         return {
    //             error: "something went wrong"
    //         }
    //     } finally {
    //         await prisma.$disconnect

    //     }
    //     revalidatePath("/")
    // }
}

export const createBuild = async () => {

    const role: Role = {
        id: 'fa8ab034-ef97-4554-be37-a495e85e9d89',
        name: 'top'
    }
    const champion: Champion = {
        id: '0a9ca0be-a27a-4ec4-9861-cd2ade5d4c9e',
        league_id: 266,
        name: 'Aatrox'
    }
    const items: Item[] = [
        {
            id: '1dd9fc52-72e7-4fc2-aabd-ad580faa7632',
            league_id: 2010,
            name: 'Total Biscuit of Everlasting Will',
            buildId: null
        },
        {
            id: 'bda0001b-f139-4ce9-ba4f-faa31edca2ec',
            league_id: 2015,
            name: 'Kircheis Shard',
            buildId: null
        }
    ]


    const primaryPerksArray = [
        {
            id: '615c79e7-89fc-4038-bd4f-39b41dedaa44',
            league_id: 8214,
            name: 'Summon Aery',
            key: 'SummonAery',
            row: 0,
            runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
        },
        {
            id: '713a0f7c-5a87-48b8-aefb-96b39f64737e',
            league_id: 8226,
            name: 'Manaflow Band',
            key: 'ManaflowBand',
            row: 1,
            runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
        },
        {
            id: 'e9649ed3-842f-4296-9d32-b81fd8e5ad69',
            league_id: 8210,
            name: 'Transcendence',
            key: 'Transcendence',
            row: 2,
            runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
        },
        {
            id: '21fa54c5-785c-4502-b2f5-c747ff2140df',
            league_id: 8237,
            name: 'Scorch',
            key: 'Scorch',
            row: 3,
            runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
        },

    ]

    const secondaryPerksArray = [
        {
            id: '9d78b11f-78ea-47c8-a675-e6f8a8e0b7b6',
            league_id: 8304,
            name: 'Magical Footwear',
            key: 'MagicalFootwear',
            row: 1,
            runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
        },

        {
            id: 'cbac2b94-d006-41c9-83f7-cd40923158fb',
            league_id: 8316,
            name: 'Minion Dematerializer',
            key: 'MinionDematerializer',
            row: 2,
            runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
        },
        {
            id: '5fc78d5f-0b15-40bf-98be-ac3a0f8c6e61',
            league_id: 8410,
            name: 'Approach Velocity',
            key: 'ApproachVelocity',
            row: 3,
            runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
        }
        
    ]

    let createPrimaryRunes = await prisma.runeBuild.create(
        {
            data: {
                runes: {
                    connect: primaryPerksArray.map(e => ({ id: e.id }))
                }
            }
        }
    )
    let createSecondaryRunes = await prisma.runeBuild.create(
        {
            data: {
                runes: {
                    connect: secondaryPerksArray.map(e => ({ id: e.id }))
                }
            }
        }
    )
    let data = await prisma.build.create({
        include: {
            items: true,
            runes: true
        },
        data: {
            champion: {
                connect: {
                    id: champion.id
                }
            },
            role: {
                connect: {
                    id: role.id
                }
            },
            items: {
                connect: items.map(item => ({ id: item.id }))
            },
            runes: {
                connect: [{ id: createPrimaryRunes.id }, { id: createSecondaryRunes.id }]
            }
        }
    })
    console.log(data)

    //allRunesWithPerksArray.map((rune, index) => ({ id: rune[index].id }))
}
