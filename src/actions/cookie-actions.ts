"use server"

import { cookies } from 'next/headers'
export const createCookie = async (data: FormData) => {
    //cookie last month
    data.get('key') ? cookies().set('key', data.get('key') as string, { maxAge: 60 * 60 * 24 * 30 }) : cookies().delete('key')
}
export const getCookie = async () => {
    return cookies().get('key')?.value ?? ""
}