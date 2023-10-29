"use client"
import React, { FC, useState } from 'react'

const BugReport: FC = () => {
    const [isOpen, setOpen] = useState(false)
    const [error, setError] = useState<string[]>([])
    const [text, setText] = useState<string>("")
    const [toastActive, setToastActive] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        let errors = []
        if (text.length < 1) errors.push("Write something :)")
        if (text.length > 255) errors.push(`${`Text is too long.\nPlease submit two or more bug reports instead!`}`)
        if (errors.length != 0) {
            setError(errors)
            return
        }
        setError([])
        setOpen(false)
        sendMessage(text)
        makeToast()
    }

    async function sendMessage(text: string) {
        console.log("To database: " + text)
    }

    function makeToast() {
        setToastActive(true);

        setTimeout(() => {
            setToastActive(false);
        }, 2000);
    }
    return (
        <>
            <button className='btn btn-ghost btn-sm absolute -bottom-9 right-5 text-warning' onClick={() => setOpen(true)}>
                Report a bug
            </button>
            <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex justify-between">
                        Bug report
                        <button className="btn btn-error" type="button" onClick={() => setOpen(false)}>X</button>
                    </h3>
                    <p className="py-4">What's the problem?</p>
                    <form method="dialog" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <textarea className="textarea textarea-bordered textarea-lg w-full" placeholder="Describe your bug..." onChange={(e) => setText(e.target.value)}></textarea>
                        <div className='flex justify-between gap-2'>{text.length}/255 <div className=''>{error.map((e, index) => <p key={index} className='text-error text-right whitespace-pre-line'>{e}</p>)}</div></div>
                        <button className="btn btn-success" type="submit">Send</button>

                    </form>
                </div>
            </dialog>
            <div className={`${toastActive ? "toast" : "hidden"} toast-top z-10`}>
                <div className="alert alert-success text-right">
                    <span>Report's send!<br></br>Thank's for your help to improve the page.</span>
                </div>
            </div>
        </>
    )
}

export default BugReport
