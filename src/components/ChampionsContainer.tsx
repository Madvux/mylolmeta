import { Build, Champion } from "../../types"
import ChampionCard from "./ChampionCard"
import Link from "next/link"

const ChampionsContainer = ( {role,champions}: Build) => {
    return (
        <div className="grid grid-rows-5 gap-3 ">
            <h1 className="text-4xl capitalize text-center my-auto">{role}</h1>
            {champions.map((champion,index) =>
                <Link href={`/${role}/${index}`}><ChampionCard  key={index} name={champion} /></Link>
            )}
        </div>
    )
}

export default ChampionsContainer
