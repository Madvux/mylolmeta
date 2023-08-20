import { prisma } from "@/db"
import { Build, Champion, Item, Rune } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"

type PageProps = {
  params: {
    role: string,
    id: string
  }
}



const getBuild = (id: string) => {
  return prisma.build.findFirst(
    {
      where: { id },
      include: {
        champion: true,
        items: true,
        runes: true
      }
    })
}

const ChampionPage = async ({ params: { id } }: PageProps) => {
  const build = await getBuild(id)
  const champion:Champion = build?.champion as Champion
  const items:Item[] = build?.items as Item[]
  const runes:Rune[] = build?.runes as Rune[]

  console.log(champion,items,runes)
  return (
    <div>
      {champion.name}
      {items.map(item => <p>{item.name}</p>)}
      {runes.map(rune => <p>{rune.name}</p>)}
      <Link href={"/"}>
        <button className="btn btn-outline btn-info flex flex-row flex-nowrap">
          <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" /></svg> Go back</button>
      </Link>

    </div>

  )
}

export default ChampionPage
