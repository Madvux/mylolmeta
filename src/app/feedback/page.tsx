import DeleteReportButton from '@/components/DeleteReportButton'
import { prisma } from '@/db'
import React from 'react'

const ReportsFeedbackPage = async () => {
    const reports = await prisma.report.findMany()

    return (
        <>
            <h1 className='text-center text-4xl mb-10 mt-5'>Reports</h1>
            {reports.length && reports ?
                <div className='grid place-items-start gap-3'>
                    {reports.sort((a, b) => -a.createdAt?.getTime()! - b.createdAt?.getTime()!)
                        .map(e => <div key={e.id} className="stats shadow bg-base-200 ">
                            <div className="stat hover:bg-neutral">
                                <DeleteReportButton id={e.id} />
                            </div>

                            <div className="stat">
                                <span className='stat-title'>Date</span>
                                <span className='stat-value'>{e.createdAt?.toLocaleDateString()}</span>
                                <span className='text-xl'>{e.createdAt?.toLocaleTimeString()}</span>

                            </div>

                            <div className="stat">
                                <span className='stat-title'>Report</span>
                                <span className='stat-value whitespace-normal text-base'>{e.text}</span>

                            </div>


                        </div>)}
                </div>
                : "There are no reports for now"}
        </>
    )

}

export default ReportsFeedbackPage
