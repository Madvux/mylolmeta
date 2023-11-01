"use client"
import { deleteBugReport } from '@/actions/report-actions'
import React, { FC } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const DeleteReportButton = ({ id }: { id: string }) => {
    async function handleClick(id: string) {
        await deleteBugReport(id)
    }

    return (
        <button className='stat-figure text-4xl' onClick={() => handleClick(id)}><BsFillTrashFill color="red" /></button>
    )
}

export default DeleteReportButton
