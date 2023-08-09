"use client"
import ChampionsContainer from "@/components/ChampionsContainer"
import { Build } from "../../types"
import { useState } from "react"
export default function Home() {

  const [metapicks, setMetapicks] = useState<Build[]>(
    [{ role: "top", champions: ["Aatrox", "Ahri", "Maokai", "Jax", "Yorick",] },
    { role: "jungle", champions: ["Aatrox", "Ahri", "Maokai", "Jax", "Yorick"] },
    { role: "mid", champions: ["Annie", "Riven", "Neeko", "Morgana", "Lux"] },
    { role: "adc", champions: ["Annie", "Riven", "Neeko", "Morgana", "Lux"] },
    { role: "support", champions: [null, null, null, null, null] }])


  return (
    <main className="grid lg:grid-cols-5 gap-3">
      {metapicks.map((picks, index) =>
        <ChampionsContainer key={index} {...picks} />
      )}

    </main>
  )
}
