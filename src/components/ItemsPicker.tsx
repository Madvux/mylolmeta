import Image from 'next/image';
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import jsonFile from "../jsondata/item.json"

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

const ItemsPicker: FC<PageProps> = ({ data, setData }) => {
    const items = jsonFile.data
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
        <section>
            <input onChange={(e) => setFilter(e.target.value)}></input>
            <div className="grid grid-cols-12 w-1/2 overflow-y-auto max-h-64">
                {Object.entries(items)
                    ?.filter(x => x[1].name.toLowerCase().includes(filter.toLowerCase()))
                    .map(item => <div key={item[0]}>
                        <input type="checkbox" name="itemsIDArray" value={item[0]} id={item[0]} onChange={e => handleChangeCheckbox(e)} />
                        <label htmlFor={item[0]}>
                            <Image src={`/loldata/${jsonFile.version}/img/item/${item[1].image.full}`} width={item[1].image.w} height={item[1].image.h} alt={item[1].name} />
                        </label>

                    </div>
                    )}
            </div>
        </section>
    )
}

export default ItemsPicker
