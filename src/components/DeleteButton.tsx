"use client"
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteBuild } from "@/actions/build-actions"
import { useState } from 'react'

const DeleteButton = (props: { id: string }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (event: React.MouseEvent<HTMLElement>, id: string) => {
        setLoading(true)
        try {
            const res = await deleteBuild(id)
            if (res?.error) { alert(res.error) }

        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
        
    }
    return (
        loading ? <button className="btn btn-ghost btn-square text-lg btn-xs hover:bg-error">
            <span className="loading loading-spinner"></span>
        </button>
            :
            <button className="btn btn-ghost btn-square text-lg btn-xs hover:bg-error" onClick={event => handleDelete(event, props.id)}>
                <BsFillTrashFill color="red" />
            </button>
    )
}

export default DeleteButton
