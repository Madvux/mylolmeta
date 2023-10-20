import { Perk, Rune } from '@prisma/client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from 'react'

type RuneWithPerks = Rune & {
    perks: Perk[]
}
type PageProps = {
    runes: RuneWithPerks[],
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

const RunePicker = ({ runes, data, setData }: PageProps) => {

    const [picked, setPicked] = useState<Perk[]>([]);

    useEffect(() => {
        setPicked([])
    }, [data.secondary_tree])



    //when this state changes update main-data state
    useEffect(() => {
        if (picked.length > 2) setPicked(prev => prev.slice(1))
        setData({ ...data, secondaryPerksIDArray: picked.map(e => e.id) })
    }, [JSON.stringify(picked)])

    function toggleState(perk: Perk) {
        if (picked.includes(perk)) {
            setPicked(prev => prev.filter(x => x !== perk))
        } else {
            if (picked.find(e => e.row === perk.row)) setPicked(prev => [...prev.filter(x => x.row !== perk.row), perk])
            else setPicked(prev => [...prev, perk])
        }
    }

    console.table("secondary" + data.secondaryPerksIDArray)
    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <><div className="join">
            {runes.filter(e => e.id != data.primary_tree).map(rune => <input key={rune.id} type="radio" className="join-item btn" name="secondary_tree" aria-label={rune.name} value={rune.id} onChange={e => handleChange(e)} />)}
        </div>
            {data.secondaryPerksIDArray.map(e => <p key={e}> {e}</p>)}

            <div className="grid w-1/4">
                {data.secondary_tree !== data.primary_tree ?
                    [1, 2, 3].map(e => <div className='grid grid-flow-col' key={e.toString()}>
                        {runes.find(e => e.id === data.secondary_tree)
                            ?.perks
                            .sort(perk => perk.league_id)
                            .map(perk => perk.row === e ?
                                <>
                                    <div onClick={() => toggleState(perk)}>
                                        <label htmlFor={perk.id}><Image height={64} width={64} src={`/images/runes/${runes.find(rune => rune.id === data.secondary_tree)?.name}/${perk.key}/${perk.key}.png`} alt={perk.name} /> </label>
                                    </div>
                                </> : null
                            )}
                    </div>
                    ) : null}

            </div></>
    )
}

export default RunePicker
