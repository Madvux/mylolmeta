export type Build = {
    role: string,
    champions: string[] | null[]
}
export type Build2 = {
    id: number,
    role: string,
    champion_name: string | null,
    runes: string[],
    items: string[]
}
export type Champion = {
    id: number,
    name: string | null
}
