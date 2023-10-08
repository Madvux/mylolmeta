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
    roleID: string
}

const CreateBuildForm = ({ champions, runes, items, roleID }: PageProps) => {
    const router = useRouter()
    const [data, setData] = useState({
        championID: "",
        primary_tree: "",
        secondary_tree: "",
        itemsIDArray: [],
        primaryPerksIDArray: [],
        secondaryPerksIDArray: [],
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        className: "",
        msg: ""
    })

    const primaryPerksIDArray = [
        '615c79e7-89fc-4038-bd4f-39b41dedaa44',
        '713a0f7c-5a87-48b8-aefb-96b39f64737e',
        'e9649ed3-842f-4296-9d32-b81fd8e5ad69',
        '21fa54c5-785c-4502-b2f5-c747ff2140df'
    ]
    const secondaryPerksIDArray = [
        '9d78b11f-78ea-47c8-a675-e6f8a8e0b7b6',
        'cbac2b94-d006-41c9-83f7-cd40923158fb',
        '5fc78d5f-0b15-40bf-98be-ac3a0f8c6e61'
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)

        setLoading(true)
        setError({
            className: "alert alert-info",
            msg: "Creating build..."
        })
        try {
            const res = await createBuild({roleID,
                championID: data.championID,
                itemsIDArray: data.itemsIDArray,
                primaryPerksIDArray: data.primaryPerksIDArray,
                secondaryPerksIDArray: data.secondaryPerksIDArray
            })
            if (res?.error) {
                setError({
                    "className": "alert alert-error",
                    "msg": res.error
                })
            } else {
                setError({
                    "className": "alert alert-success",
                    "msg": "Created!"
                })
                
                setTimeout(() => {
                    router.prefetch('/')
                    router.push('/')
                }, 1000)
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)

    }
    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data)
    }
    function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
        let newArray = [...data.itemsIDArray, e.target.value];
        // @ts-ignore never type
        if (data.itemsIDArray.includes(e.target.value)) {
            newArray = newArray.filter(x => x !== e.target.value)
        }
        setData({ ...data, [e.target.name]: newArray })
        console.table(data.itemsIDArray)
    }

    //works for checkboxes but no radios (picks too many)
    function handleChangeRadioPrimary(e: ChangeEvent<HTMLInputElement>) {
        //max 4 picked
        let newArray = [...data.primaryPerksIDArray, e.target.value];
        // @ts-ignore never type
        if(data.primaryPerksIDArray.includes(e.target.value)){
            newArray = newArray.filter(x => x !== e.target.value)
        }
        setData({...data, [e.target.name.slice(0, -2)]: newArray})
        console.table(data.primaryPerksIDArray)
    }
    //works for checkboxes but no radios (picks too many)
    function handleChangeRadioSecondary(e: ChangeEvent<HTMLInputElement>) {
            //max  2 picked
        let newArray = [...data.secondaryPerksIDArray, e.target.value];
        // @ts-ignore never type
        if(data.secondaryPerksIDArray.includes(e.target.value)){
            newArray = newArray.filter(x => x !== e.target.value)
        }
        setData({...data, [e.target.name.slice(0, -2)]: newArray})
        console.table(data.secondaryPerksIDArray)
    }
    return (
        <>
            <div className="toast toast-top toast-start">
                <div className={`${error.className}`}>
                    <span>{`${error.msg}`}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <select name="championID" onChange={e => handleChange(e)}>
                    {
                        champions?.map(champion => <option key={champion.id} value={champion.id}>{champion.name}</option>)
                    }
                </select>

                <div className="join">
                    {runes.sort((a, b) => a.league_id - b.league_id).map(rune =>
                        <input key={rune.id} type="radio" className="join-item btn" name="primary_tree" aria-label={rune.name} value={rune.id} onChange={e => handleChange(e)} />)}
                </div>

                {data.primary_tree ?
                    <div className="join">
                        {runes.filter(e => e.id != data.primary_tree).map(rune =>
                            <input key={rune.id} type="radio" className="join-item btn" name="secondary_tree" aria-label={rune.name} value={rune.id} onChange={e => handleChange(e)} />)}
                    </div>
                    : null}



                <div className="grid w-1/4">

                    {
                        [0, 1, 2, 3].map(e =>
                            <div className='grid grid-flow-col' key={e.toString()}>
                                {runes.find(e => e.id === data?.primary_tree)
                                    ?.perks
                                    .map(perk => perk.row === e ?
                                        <>
                                            <input type="radio" name={`primaryPerksIDArray_${perk.row}`} value={perk.id} onChange={e => handleChangeRadioPrimary(e)} />
                                            <label htmlFor={perk.id}><Image height={64} width={64} src={`/images/runes/${runes.find(rune => rune.id === data.primary_tree)?.name}/${perk.key}/${perk.key}.png`} alt={perk.name} /> </label>
                                        </> : null
                                    )
                                }
                            </div>
                        )

                    }

                </div>
                <div className="grid w-1/4">
                    {
                        [1, 2, 3].map(e =>
                            <div className='grid grid-flow-col' key={e.toString()}>
                                {runes.find(e => e.id === data?.secondary_tree)
                                    ?.perks
                                    .map(perk => perk.row === e ?
                                        <>
                                            <input type="radio" name={`secondaryPerksIDArray_${perk.row}`} value={perk.id} onChange={e => handleChangeRadioSecondary(e)} />
                                            <label htmlFor={perk.id}><Image height={64} width={64} src={`/images/runes/${runes.find(rune => rune.id === data.secondary_tree)?.name}/${perk.key}/${perk.key}.png`} alt={perk.name} /> </label>
                                        </> : null
                                    )
                                }
                            </div>
                        )

                    }
                </div>

                <div className="grid grid-cols-12 w-1/2">
                    {items?.map(item =>
                        <div key={item.id}>
                            <input type="checkbox" name="itemsIDArray" value={item.id} id={item.id} onChange={e => handleChangeCheckbox(e)} />
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
