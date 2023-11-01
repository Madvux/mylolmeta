import ChampionsContainer from "@/components/ChampionsContainer"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default async function Home() {
  const roles = ["top", "jungle", "mid", "adc", "support"]
  return (
    <>
      <Header />
      <main className="grid px-5 xl:grid-cols-5 gap-3 items-start">
        {roles.map((role, index) => <ChampionsContainer key={index} roleName={role} />
        )}

      </main>
      <Footer />
    </>
  )
}
