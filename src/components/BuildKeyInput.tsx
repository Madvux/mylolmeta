import React from 'react'
import { BsFillKeyFill } from "react-icons/bs"
import { HiMiniQuestionMarkCircle } from "react-icons/hi2"

const BuildKeyInput = () => {
    return (
        <div className="join">
            <div className="join-item tooltip md:tooltip-bottom tooltip-right tooltip-accent  font-bold before:z-50 before:content-[attr(data-tip)]" 
            data-tip="Type specific key, and press key icon to create your own page. 
            Every person who writes the same key will see the same builds. 
            Thats a simple way to share best champion builds in current meta with your friends!">
                <button className="join-item btn btn-ghost btn-square text-2xl"><HiMiniQuestionMarkCircle /></button>
            </div>
            <input type="text" placeholder="Key" className="join-item input input-bordered" />
            <button className="join-item btn btn-square btn-primary text-3xl">
                <BsFillKeyFill />
            </button>
        </div>
    )
}

export default BuildKeyInput
