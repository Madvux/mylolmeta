"use client"
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteBuild } from "@/actions/build-actions"
import { useState } from 'react'

const DeleteButton = (props: { id: string }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (id: string) => {
        setLoading(true)
        try {
            const res = await deleteBuild(id)
            if (res?.error) { alert(res.error) }
        } catch (error) {
            console.error(error)
        }

        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }
    return (
        loading ? <button className="btn btn-ghost btn-square text-lg btn-xs hover:bg-error">
            <span className="loading loading-spinner"></span>
        </button>
            :
            <button className="btn btn-ghost btn-square text-lg btn-xs hover:bg-error" onClick={() => handleDelete(props.id)}>
                <BsFillTrashFill color="red" />
            </button>
    )
}

export default DeleteButton
