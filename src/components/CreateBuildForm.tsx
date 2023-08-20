"use client"
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { useState } from 'react'
import { createBuild } from "@/actions/build-actions"
import { Champion, Rune, Perk, Item } from '@prisma/client'

type RuneWithPerks = Rune & {
    perks: Perk[]
}
type PageProps = {
    champions: Champion[],
    runes: RuneWithPerks[],
    items: Item[],
    role: string
}
const CreateBuildForm = ({ champions, runes, items, role }: PageProps) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        className: "",
        msg: ""
    })

    const handleSubmit = async (data: FormData) => {
        setLoading(true)
        setError({
            className: "alert alert-info",
            msg: "Creating build..."
        })
        const champion = data.get("champion") as string
        const runes = data.get("primary_rune") as string
        const perks = data.getAll("perks") as string[]
        const items = data.getAll("items") as string[]

        try {
            const res = await createBuild(champion, role, items, runes)
            if (res?.error) {
                setError({
                    "className": "alert alert-error",
                    "msg": res.error
                })
            }
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
        router.prefetch('/')
        router.push('/')
    }
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
                <ul className="flex justify-evenly">

                    <ol><select name='primary_rune'>

                        {runes.map(rune =>
                            <option key={rune.id} value={rune.id}>{rune.name}</option>)}

                    </select></ol>
                </ul>
                {/* // <ol key={rune.id} name="rune" className="list-decimal">
            //     {rune.name}
            //     {rune.perks.map(perk =>
            //         <li key={perk.id}><input type="checkbox" name={`runes`} value={perk.id} />{perk.name}</li>)}

            // </ol> )} */}


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
