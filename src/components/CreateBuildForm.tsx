"use client"
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { createBuild } from "@/actions/build-actions"
import { Champion, Rune, Perk, Item } from '@prisma/client'
import ChampionPicker from './ChampionPicker'
import ItemsPicker from './ItemsPicker'
import PrimaryRunePicker from './PrimaryRunePicker'
import SecondaryRunePicker from './SecondaryRunePicker'

type RuneWithPerks = Rune & {
    perks: Perk[]
}
type PageProps = {
    champions: Champion[],
    runes: RuneWithPerks[],
    items: Item[],
    roleID: string
}
type Data = {
    championID: string;
    primary_tree: string;
    secondary_tree: string;
    itemsIDArray: string[];
    primaryPerksIDArray: string[];
    secondaryPerksIDArray: string[];
}

const CreateBuildForm = ({ champions, runes, items, roleID }: PageProps) => {
    const router = useRouter()
    const [data, setData] = useState<Data>({
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)

        setLoading(true)
        setError({
            className: "alert alert-info",
            msg: "Creating build..."
        })
        try {
            const res = await createBuild({
                roleID,
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
                setTimeout(() => {
                    setError({
                        "className": "",
                        "msg": ""
                    })
                }, 2000)
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

    return (
        <>
            <div className="toast toast-top toast-start">
                <div className={`${error.className}`}>
                    <span>{`${error.msg}`}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <ChampionPicker champions={champions} data={data} setData={setData} />

                RUNES MIGH NOT BE IN RIGHT ORDER
                <PrimaryRunePicker runes={runes} data={data} setData={setData} />
                <SecondaryRunePicker runes={runes} data={data} setData={setData} />
                <ItemsPicker items={items} data={data} setData={setData} />

                {loading ? <button className="btn btn-success disabled">
                    <span className="loading loading-spinner"></span>
                </button>
                    :
                    <button className="btn btn-success" type="submit">Save</button>}
            </form></>
    )
}

export default CreateBuildForm
