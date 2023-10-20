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
    const [message, setMessage] = useState({
        className: "",
        msg: ""
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)

        setLoading(true)
        setMessage({
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
                setMessage({
                    "className": "alert alert-error",
                    "msg": res.error
                })
                setTimeout(() => {
                    setMessage({
                        "className": "",
                        "msg": ""
                    })
                }, 2000)
            } else {
                setMessage({
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
                <div className={`${message.className}`}>
                    <span>{`${message.msg}`}</span>
                </div>
            </div>
            <p>DEV INFO</p>
            <p>champion{data.championID}</p>
            <p>items{data.itemsIDArray.map(e => e)}</p>
            <p>primary_tree{data.primary_tree}</p>
            <p>primaryRunes{data.primaryPerksIDArray.map(e => e)}</p>
            <p>secondary_tree{data.secondary_tree}</p>
            <p>secondaryRunes{data.secondaryPerksIDArray.map(e => e)}</p>
            <form onSubmit={handleSubmit}>
                <ChampionPicker champions={champions} data={data} setData={setData} />


                <section>
                    {/* <div className="alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>RUNES MIGH NOT BE IN RIGHT ORDER</span>
                    </div> */}

                    <PrimaryRunePicker runes={runes} data={data} setData={setData} />
                    <SecondaryRunePicker runes={runes} data={data} setData={setData} />
                </section>
                <ItemsPicker items={items} data={data} setData={setData} />

                {loading ? <button className="btn btn-success" aria-disabled="true">
                    <span className="loading loading-spinner"></span>
                </button>
                    :
                    <button className="btn btn-success" type="submit">Save</button>}
            </form></>
    )
}

export default CreateBuildForm
