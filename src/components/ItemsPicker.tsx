import { Item } from '@prisma/client';
import Image from 'next/image';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'


type PageProps = {
    items: Item[],
    data: {
        championID: string;
        primary_tree: string;
        secondary_tree: string;
        itemsIDArray: never[];
        primaryPerksIDArray: never[];
        secondaryPerksIDArray: never[];
    },
    setData: Dispatch<SetStateAction<{
        championID: string;
        primary_tree: string;
        secondary_tree: string;
        itemsIDArray: never[];
        primaryPerksIDArray: never[];
        secondaryPerksIDArray: never[];
    }>>
}

const ItemsPicker = ({ items, data, setData }: PageProps) => {

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
        <div className="grid grid-cols-12 w-1/2">
            {items?.map(item =>
                <div key={item.id}>
                    <input type="checkbox" name="itemsIDArray" value={item.id} id={item.id} onChange={e => handleChangeCheckbox(e)} />
                    <label htmlFor={item.id}><Image height={64} width={64} src={`/images/item/${item.league_id}.png`} alt={item.name} /></label>

                </div>
            )}
        </div>
    )
}

export default ItemsPicker
