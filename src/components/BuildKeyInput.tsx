"use client"
import React, { useEffect, useState } from 'react'
import { BsFillKeyFill } from "react-icons/bs"
import { HiMiniQuestionMarkCircle } from "react-icons/hi2"
import { createCookie, getCookie } from "../actions/cookie-actions";


const BuildKeyInput = () => {
    const [key, setKey] = useState<string | null>()

    useEffect(() => {
        async function getKey() {
            let key = await getCookie()
            setKey(key)
        }
        getKey()
    }, [])

    return (
        <form action={createCookie} className='join'>
            <div className="join-item tooltip md:tooltip-bottom tooltip-right tooltip-accent  font-bold before:z-50 before:content-[attr(data-tip)]"
                data-tip="Type specific key, and press key icon to create your own page. 
            Every person who writes the same key will see the same builds. 
            Thats a simple way to share best champion builds in current meta with your friends!">
                <button className="join-item btn btn-ghost btn-square text-2xl" type='button'><HiMiniQuestionMarkCircle /></button>
            </div>
            <input name="key" type="text" placeholder="Key" value={key ?? ""} onChange={(e) => setKey(e.target.value)} className="join-item input input-bordered" />
            <button className="join-item btn btn-square btn-primary text-3xl" type="submit">
                <BsFillKeyFill />
            </button>
        </form>
    )
}

export default BuildKeyInput
