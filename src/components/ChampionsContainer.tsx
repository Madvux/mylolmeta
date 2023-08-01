import ChampionCard from "./ChampionCard"

const ChampionsContainer = ({ title, champions }) => {
    return (
        <div className="grid grid-rows-5 gap-3">
            <h1>{title}</h1>
            {champions.map(champion =>
                <ChampionCard champion={champion} />
            )}
        </div>
    )
}

export default ChampionsContainer
