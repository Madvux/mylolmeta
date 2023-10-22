"use server"

import { cookies } from 'next/headers'
export const createCookie = async (data: FormData) => {
    data.get('key') ? cookies().set('key', data.get('key') as string) : cookies().delete('key')
}
export const getCookie = async () => {
    return cookies().get('key')?.value ?? ""
}