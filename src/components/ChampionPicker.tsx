"use client"
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import jsonFile from "../jsondata/champion.json"
type PageProps = {
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

const ChampionPicker: FC<PageProps> = ({ data, setData }) => {

    const champions = jsonFile.data

    const [picked, setPicked] = useState<any>()
    const [filter, setFilter] = useState("")

    // function handlePick(champion: Champion) {
    //     setPicked(champion)
    //     setData({ ...data, championID: champion.id })
    // }
    function handlePick(champion: any) {
        setPicked(champion)
        setData({ ...data, championID: champion.id })
    }
    return (
        <section>
            <p>Picked: {picked?.id}</p>
            <input onChange={(e) => setFilter(e.target.value)}></input>
            <div className='join grid grid-cols-10 overflow-y-auto max-h-64 w-1/2 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-neutral scrollbar- scrollbar-thumb-primary'>
                {Object.values(champions)
                    .filter(champion => champion.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(champion =>
                        picked?.id === champion.id ?
                            <div className="avatar join-item" key={champion.id} onClick={() => handlePick(champion)}>
                                <div className="w-20 rounded">
                                    <Image src={`/loldata/${jsonFile.version}/img/champion/${champion.image.full}`} width={champion.image.w} height={champion.image.h} alt={champion.name} />
                                </div>
                            </div>
                            : <div className="avatar join-item opacity-50 " key={champion.id} onClick={() => handlePick(champion)}>
                                <div className="w-20 rounded">
                                    <Image src={`/loldata/${jsonFile.version}/img/champion/${champion.image.full}`} width={champion.image.w} height={champion.image.h} alt={champion.name} />
                                </div>
                            </div>
                    )}
            </div>

        </section>
        // <section>
        //     <p>Picked: {picked?.name}</p>
        //     <input onChange={(e) => setFilter(e.target.value)}></input>
        //     <div className='join grid grid-cols-10 overflow-y-auto max-h-64 w-1/2 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-neutral scrollbar- scrollbar-thumb-primary'>
        //         {champions
        //             .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
        //             .map(champion =>
        //                 picked?.id === champion.id ?
        //                     <div className="avatar join-item" key={champion.id} onClick={() => handlePick(champion)}>
        //                         <div className="w-20 rounded">
        //                             <Image src={`/images/champion/${champion.name}.png`} width={120} height={120} alt="champion image" />
        //                         </div>
        //                     </div>
        //                     : <div className="avatar join-item opacity-50 " key={champion.id} onClick={() => handlePick(champion)}>
        //                         <div className="w-20 rounded">
        //                             <Image src={`/images/champion/${champion.name}.png`} width={120} height={120} alt="champion image" />
        //                         </div>
        //                     </div>
        //             )}
        //     </div>

        // </section>
    )
}

export default ChampionPicker
