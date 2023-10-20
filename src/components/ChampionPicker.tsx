"use client"
import { Champion } from '@prisma/client'
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react'

type PageProps = {
    champions: Champion[],
    data: {
        championID: string;
        primary_tree: string;
        secondary_tree: string;
        itemsIDArray: string[];
        primaryPerksIDArray: string[];
        secondaryPerksIDArray: string[];
    },
    setData: Dispatch<SetStateAction<{
        championID: string;
        primary_tree: string;
        secondary_tree: string;
        itemsIDArray: string[];
        primaryPerksIDArray: string[];
        secondaryPerksIDArray: string[];
    }>>
}

const ChampionPicker = ({ champions, data, setData }: PageProps) => {

    const [picked, setPicked] = useState<Champion>()
    const [filter, setFilter] = useState("")

    function handlePick(champion: Champion) {
        setPicked(champion)
        setData({ ...data, championID: champion.id })
    }
    return (
        // <select onChange={(e) => setData({ ...data, championID: e.target.value })}>
        //     {champions.map(champion => <option key={champion.id} value={champion.id}>{champion.name}</option>)}
        // </select>
        <section>
            <p>Picked: {picked?.name}</p>
            <input onChange={(e) => setFilter(e.target.value)}></input>
            <div className='join grid grid-cols-10 overflow-y-auto max-h-64 w-1/2'>
                {champions
                    .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(champion =>
                        picked?.id === champion.id ?
                            <div className="avatar join-item" key={champion.id} onClick={() => handlePick(champion)}>
                                <div className="w-20 rounded">
                                    <Image src={`/images/champion/${champion.name}.png`} width={120} height={120} alt="champion image" />
                                </div>
                            </div>
                            : <div className="avatar join-item opacity-50 " key={champion.id} onClick={() => handlePick(champion)}>
                                <div className="w-20 rounded">
                                    <Image src={`/images/champion/${champion.name}.png`} width={120} height={120} alt="champion image" />
                                </div>
                            </div>
                    )}
            </div>

        </section>
    )
}

export default ChampionPicker
