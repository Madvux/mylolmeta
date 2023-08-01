import Image from "next/image"
const ChampionCard = ({champion}) => {
    return (
        <div className="card lg:card-side bg-neutral shadow-xl">
            <figure><Image src={`/images/champion/${champion ? champion : "Aatrox"}.png`} width={50} height={50} alt="champion image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{champion ? champion : "+"}</h2>
            </div>
        </div>
    )
}

export default ChampionCard
