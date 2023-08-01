import ChampionCard from "@/components/ChampionCard"
import ChampionsContainer from "@/components/ChampionsContainer"

export default function Home() {
  const metapicks = [
    {role: "top", champions: ["Aatrox", "Ahri", "Maokai", "Jax", "Yorick"]},
    {role: "jungle", champions: ["Aatrox", "Ahri", "Maokai", "Jax", "Yorick"]},
    {role: "mid", champions: ["Annie", "Riven", "Neeko", "Morgana", "Lux"]},
    {role: "adc", champions: ["Annie", "Riven", "Neeko", "Morgana", "Lux"]},
    {role: "support", champions: [null,null,null,null,null]}, 
]


  return (
    <main className="grid grid-cols-5 gap-3">
      {metapicks.map(picks =>
        <ChampionsContainer title={picks.role} champions={picks.champions} />
      )}

    </main>
  )
}
