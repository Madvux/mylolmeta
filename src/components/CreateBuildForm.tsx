"use client"
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { createBuild } from "@/actions/build-actions"
import { Champion, Rune, Perk, Item, PrismaClient, Build, Prisma } from '@prisma/client'
import { BsValentine } from 'react-icons/bs'
import { prisma } from '@/db'

type RuneWithPerks = Rune & {
    perks: Perk[]
}
type PageProps = {
    champions: Champion[],
    runes: RuneWithPerks[],
    items: Item[],
    role: string
}
type PickedRunes = {
        keystone: string
        perk_0?: string,
        perk_1?: string,
        perk_2?: string,
        perk_3?: string,
}
const CreateBuildForm = async ({ champions, runes, items, role }: PageProps) => {
    const router = useRouter()
    // const [picked, setPicked] = useState<PickedRunes>({keystone: runes?.at(0)})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        className: "",
        msg: ""
    })
const bui: Prisma.BuildCreateInput = {
    role: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
    },
    champion: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
    }
}

// need only id's
// const role: Role = {
//     id: 'fa8ab034-ef97-4554-be37-a495e85e9d89',
//     name: 'top'
// }
// const champion: Champion = {
//     id: '0a9ca0be-a27a-4ec4-9861-cd2ade5d4c9e',
//     league_id: 266,
//     name: 'Aatrox'
// }
// const items: Item[] = [
//     {
//         id: '1dd9fc52-72e7-4fc2-aabd-ad580faa7632',
//         league_id: 2010,
//         name: 'Total Biscuit of Everlasting Will',
//         buildId: null
//     },
//     {
//         id: 'bda0001b-f139-4ce9-ba4f-faa31edca2ec',
//         league_id: 2015,
//         name: 'Kircheis Shard',
//         buildId: null
//     }
// ]
// const primaryPerksArray = [
//     {
//         id: '615c79e7-89fc-4038-bd4f-39b41dedaa44',
//         league_id: 8214,
//         name: 'Summon Aery',
//         key: 'SummonAery',
//         row: 0,
//         runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
//     },
//     {
//         id: '713a0f7c-5a87-48b8-aefb-96b39f64737e',
//         league_id: 8226,
//         name: 'Manaflow Band',
//         key: 'ManaflowBand',
//         row: 1,
//         runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
//     },
//     {
//         id: 'e9649ed3-842f-4296-9d32-b81fd8e5ad69',
//         league_id: 8210,
//         name: 'Transcendence',
//         key: 'Transcendence',
//         row: 2,
//         runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
//     },
//     {
//         id: '21fa54c5-785c-4502-b2f5-c747ff2140df',
//         league_id: 8237,
//         name: 'Scorch',
//         key: 'Scorch',
//         row: 3,
//         runeId: 'f1cb1212-5b0f-4e27-98d5-19eaee4696c0'
//     },

// ]

// const secondaryPerksArray = [
//     {
//         id: '9d78b11f-78ea-47c8-a675-e6f8a8e0b7b6',
//         league_id: 8304,
//         name: 'Magical Footwear',
//         key: 'MagicalFootwear',
//         row: 1,
//         runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
//     },

//     {
//         id: 'cbac2b94-d006-41c9-83f7-cd40923158fb',
//         league_id: 8316,
//         name: 'Minion Dematerializer',
//         key: 'MinionDematerializer',
//         row: 2,
//         runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
//     },
//     {
//         id: '5fc78d5f-0b15-40bf-98be-ac3a0f8c6e61',
//         league_id: 8410,
//         name: 'Approach Velocity',
//         key: 'ApproachVelocity',
//         row: 3,
//         runeId: '6a9e5baf-41fa-4bcc-9701-c853f6566928'
//     }
    
// ]
    const handleSubmit = async (data: FormData) => {
        // setLoading(true)
        // setError({
        //     className: "alert alert-info",
        //     msg: "Creating build..."
        // })
        createBuild()
        // console.log(picked)
        // data.forEach((key, value) => console.log(key, value))
        // const champion = data.get("champion") as string
        // const runes = data.get("primary_rune") as string
        // const perks = data.getAll("perks") as string[]
        // const items = data.getAll("items") as string[]

        // try {
        //     const res = await createBuild(champion, role, items, runes)
        //     if (res?.error) {
        //         setError({
        //             "className": "alert alert-error",
        //             "msg": res.error
        //         })
        //     }
        // } catch (error) {
        //     console.error(error)
        // } finally {
        //     setLoading(false)
        // }
        // router.prefetch('/')
        // router.push('/')
    }

    // function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
    //     setPicked({
    //         ...picked,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(picked)
    // }

    return (
        <>
            <div className="toast toast-top toast-start">
                <div className={`${error.className}`}>
                    <span>{`${error.msg}`}</span>
                </div>
            </div>
            <form action={handleSubmit}>
                <select name="champion">
                    {
                        champions?.map(champion => <option key={champion.id} value={champion.id}>{champion.name}</option>)
                    }
                </select>
                {/* <select name='keystone' onChange={e => handleChange(e)}>

                    {runes.map(rune =>
                        <option key={rune.id} value={rune.id}>{rune.name}</option>)}

                </select> */}
                
                <div className="grid w-1/4">

                    {
                        // [0, 1, 2, 3].map(e =>
                        //     <div className='grid grid-flow-col'>
                        //         {runes.find(e => e.id === picked?.keystone)
                        //             ?.perks
                        //             .map(perk => perk.row===e ? 
                        //                 <>
                        //                     <input type="radio" name={`perk_${perk.row}`} value={perk.id} onChange={e => handleChange(e)} />
                        //                     <label htmlFor={perk.id}><Image height={64} width={64} src={`/images/runes/${runes.find(rune => rune.id === picked?.keystone)?.name}/${perk.key}/${perk.key}.png`} alt={perk.name} /> </label>
                        //                 </> : null
                        //             )
                        //             }
                        //     </div>
                        // )

                    }
                </div>



                <div className="grid grid-cols-12 w-1/2">
                    {items?.map(item =>
                        <div key={item.id}>
                            <input type="checkbox" name="items" value={item.id} id={item.id} />
                            <label htmlFor={item.id}><Image height={64} width={64} src={`/images/item/${item.league_id}.png`} alt={item.name} /></label>

                        </div>
                    )}
                </div>

                {loading ? <button className="btn btn-success">
                    <span className="loading loading-spinner"></span>
                </button>
                    :
                    <button className="btn btn-success" type="submit">Save</button>}
            </form></>
    )
}

export default CreateBuildForm
