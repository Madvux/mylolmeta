import Image from "next/image"
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FC } from "react";
type PageProps = {
    id?: string
    roleId?: string
    champion?: {
        id: string;
        league_id: number;
        name: string;
    }
};


const ChampionCard: FC<PageProps> = ({ id, roleId, champion }) => {

    return (
        <>
            {champion?.name && id ?
                <div className="relative">
                    <div className="absolute -right-2 -top-2 z-10"><DeleteButton id={id} /></div>
                    <Link href={`/${roleId}/${id}`}>
                        <div className="card card-compact card-side bg-neutral shadow-xl overflow-clip hover:scale-105 hover:bg-cyan-950 transition-all">
                            <figure><Image src={`/images/champion/${champion.name}.png`} width={120} height={120} alt="champion image" /> </figure>
                            <div className="card-body">
                                <h2 className="card-title">{champion.name}</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                :
                <div className="card card-compact card-side bg-neutral shadow-xl overflow-clip hover:scale-105 hover:bg-cyan-950 transition-all">

                    <figure>
                        <svg fill="currentColor" width="120px" height="120px" viewBox="-16 -16 64.00 64.00" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ceced0" strokeWidth="0.00032"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path> </g></svg>                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Add champion</h2>
                    </div>
                </div>

            }
        </>
    )



}

export default ChampionCard
