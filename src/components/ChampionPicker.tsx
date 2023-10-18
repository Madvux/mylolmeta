"use client"
import { Champion } from '@prisma/client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

type PageProps = {
    champions: Champion[],
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

const ChampionPicker = ({ champions, data, setData }: PageProps) => {
    useEffect(() => {
        setData({ ...data, championID: champions[0].id })
    }, [])

    return (
        <select onChange={(e) => setData({ ...data, championID: e.target.value })}>
            {champions.map(champion => <option key={champion.id} value={champion.id}>{champion.name}</option>)}
        </select>
    )
}

export default ChampionPicker
