import Champion from "@/components/Champion"

async function getData() {
  const res = await fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const { data } = await getData()
  const champions = Object.entries(data).map(champion => ({ name: champion[0], properties: champion[1] }))
  return (
    <main className="container-fluid">
      {/* every champ */}
      {/* {champions.map(champion =>
        <Champion name={champion.name} properties={champion.properties} />
      )} */}
      <h2>My LoL Meta</h2>
      <div className="grid">
        <div>
          <h4><b>Top</b></h4>
          <ul>
          <Champion name={champions.at(1)?.name} properties={champions.at(1)?.properties}></Champion>
          <Champion name={champions.at(1)?.name} properties={champions.at(1)?.properties}></Champion>
          <Champion name={champions.at(1)?.name} properties={champions.at(1)?.properties}></Champion>
          <Champion name={champions.at(1)?.name} properties={champions.at(1)?.properties}></Champion>
          <Champion name={champions.at(1)?.name} properties={champions.at(1)?.properties}></Champion>
          </ul>
        </div>
      </div>
    </main>
  )
}