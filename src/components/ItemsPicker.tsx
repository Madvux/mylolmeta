import { Item } from '@prisma/client';
import Image from 'next/image';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'


type PageProps = {
    items: Item[],
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

const ItemsPicker = ({ items, data, setData }: PageProps) => {

    const [filter, setFilter] = useState("")

    function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
        let newArray = [...data.itemsIDArray, e.target.value];
        // @ts-ignore never type
        if (data.itemsIDArray.includes(e.target.value)) {
            newArray = newArray.filter(x => x !== e.target.value)
        }
        setData({ ...data, [e.target.name]: newArray })
        console.table(data.itemsIDArray)
    }

    return (
        <><input onChange={(e) => setFilter(e.target.value)}></input><div className="grid grid-cols-12 w-1/2">
            {items
                ?.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
                .map(item => <div key={item.id}>
                    <input type="checkbox" name="itemsIDArray" value={item.id} id={item.id} onChange={e => handleChangeCheckbox(e)} />
                    <label htmlFor={item.id}><Image height={64} width={64} src={`/images/item/${item.league_id}.png`} alt={item.name} /></label>

                </div>
                )}
        </div></>
    )
}

export default ItemsPicker
