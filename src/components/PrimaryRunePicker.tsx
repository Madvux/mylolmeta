import { Perk, Rune } from '@prisma/client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, FC } from 'react'

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

const RunePicker: FC<PageProps> = ({ runes, data, setData }) => {

    const [picked, setPicked] = useState<Perk[]>([]);

    useEffect(() => {
        setPicked([])
    }, [data.primary_tree])



    //when this state changes update main-data state
    useEffect(() => {
        setData({ ...data, primaryPerksIDArray: picked.map(e => e.id) })
    }, [JSON.stringify(picked)])

    function toggleState(perk: Perk) {
        if (picked.includes(perk)) {
            setPicked(prev => prev.filter(x => x !== perk))
        } else {
            if (picked.find(e => e.row === perk.row)) setPicked(prev => [...prev.filter(x => x.row !== perk.row), perk])
            else setPicked(prev => [...prev, perk])
        }
    }

    console.table("Primary" + data.primaryPerksIDArray)
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
                    .sort((a, b) => a.league_id - b.league_id)
                    .map(rune => <input key={rune.id} type="radio" className="join-item btn" name="primary_tree" aria-label={rune.name} value={rune.id} onChange={e => handleChange(e)} />)}
            </div>
            <div className="grid w-1/4">
                {data.primaryPerksIDArray.map(e => <p key={e}> {e}</p>)}
                {data.primary_tree ?
                    [0, 1, 2, 3].map(e => <div className='grid grid-flow-col' key={e.toString()}>
                        {runes.find(e => e.id === data.primary_tree)
                            ?.perks
                            .map(perk => perk.row === e ?
                                <>
                                    <div onClick={() => toggleState(perk)}>
                                        <label htmlFor={perk.id}><Image height={64} width={64} src={`/images/runes/${runes.find(rune => rune.id === data.primary_tree)?.name}/${perk.key}/${perk.key}.png`} alt={perk.name} /> </label>
                                    </div>
                                </> : null
                            )}
                    </div>
                    ) : null}

            </div>
        </article>
    )
}

export default RunePicker
