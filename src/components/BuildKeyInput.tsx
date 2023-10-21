"use client"
import React, { useEffect, useState } from 'react'
import { BsFillKeyFill } from "react-icons/bs"
import { HiMiniQuestionMarkCircle } from "react-icons/hi2"
import { redirect, useRouter } from 'next/navigation'


const BuildKeyInput = () => {
    const [key, setKey] = useState<string | null>()
    const router = useRouter()

    useEffect(() => {
        let data = localStorage.getItem("key")
        if (data) {
            setKey(data)
            router.push(`?key=${localStorage.getItem("key")}`)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        key ? localStorage.setItem("key", key) : localStorage.clear()
        key ? router.push(`?key=${localStorage.getItem("key")}`) : router.push('/')
    }


    return (
        <form onSubmit={handleSubmit} className='join'>
            <div className="join-item tooltip md:tooltip-bottom tooltip-right tooltip-accent  font-bold before:z-50 before:content-[attr(data-tip)]"
                data-tip="Type specific key, and press key icon to create your own page. 
            Every person who writes the same key will see the same builds. 
            Thats a simple way to share best champion builds in current meta with your friends!">
                <button className="join-item btn btn-ghost btn-square text-2xl" type='button'><HiMiniQuestionMarkCircle /></button>
            </div>
            <input id="key" type="text" placeholder="Key" className="join-item input input-bordered" value={key ? key : ""} onChange={(e) => setKey(e.target.value)} />
            <button className="join-item btn btn-square btn-primary text-3xl">
                <BsFillKeyFill />
            </button>
        </form>
    )
}

export default BuildKeyInput
