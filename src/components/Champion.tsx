import Image from 'next/image'

type ChampionType = {
    name: string | undefined
    properties: unknown
}

const Champion = ({ name, properties }: ChampionType) => {
    return (
        <li>
            <img src={`http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${name}.png`} alt={name} width={100} height={100} />
            {name}
        </li>
    )
}

export default Champion
