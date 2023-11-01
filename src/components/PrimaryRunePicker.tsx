import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, FC } from 'react'
import runes from "../jsondata/runesReforged.json"

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

const RunePicker: FC<PageProps> = ({ data, setData }) => {

    const [picked, setPicked] = useState<{
        id: number;
        key: string;
        icon: string;
        name: string;
        shortDesc: string;
        longDesc: string;
    }[]>([]);

    useEffect(() => {
        setPicked([])
    }, [data.primary_tree])


    //when this state changes update main-data state
    useEffect(() => {
        setData({ ...data, primaryPerksIDArray: picked.map(e => e.id.toString()) })
    }, [JSON.stringify(picked)])

    function toggleState(perk: {
        id: number;
        key: string;
        icon: string;
        name: string;
        shortDesc: string;
        longDesc: string;
    }, row: number) {
        let perks = runes.find(x => x.id.toString() === data.primary_tree)?.slots
        let column = perks?.map(e => e.runes)

        if (picked.includes(perk)) {
            setPicked(prev => [...prev.filter(x => x !== perk), perk])
        }
        else {
            //@ts-ignore
            if (picked.some(s => column[row].includes(s))) { setPicked(prev => [...prev.filter(e => column[row].indexOf(e) === -1), perk]) }
            else { setPicked(prev => [...prev, perk]) }
        }
    }

    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <article>
            <div className="join">
                {runes
                    .sort((a, b) => a.id - b.id)
                    .map(rune => <input key={rune.id} type="radio" className="join-item btn" name="primary_tree" aria-label={rune.name} value={rune.id} onChange={e => handleChange(e)} />)}
            </div>
            <div className="grid w-1/4">
                {data.primaryPerksIDArray.map(e => <p key={e}> {e}</p>)}
                {data.primary_tree ?
                    [0, 1, 2, 3].map(e => <div className='grid grid-flow-col' key={e.toString()}>
                        {
                            runes.find(x => x.id.toString() === data.primary_tree)
                                ?.slots[e]
                                .runes
                                .map(perk =>
                                    <div key={perk.id} onClick={() => toggleState(perk, e)}>
                                        <label htmlFor={perk.id.toString()}>
                                            <Image src={`/loldata/img/${perk.icon}`} width={64} height={64} alt={perk.name} />
                                        </label>
                                    </div>)
                        }
                    </div>)
                    : null}


            </div>
        </article>
    )
}

export default RunePicker
