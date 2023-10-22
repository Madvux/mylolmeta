import ChampionsContainer from "@/components/ChampionsContainer"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { prisma } from "@/db"

const roleFetcher = async () => {
  try {
    await prisma.$connect
    const saved = await prisma.role.findMany()
    return saved
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect
  }

}

export default async function Home() {
  const roles = await roleFetcher()
  if (!roles) return (<div className="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Something went wrong</span>
  </div>)
  return (
    <>
      <Header />
      <main className="grid px-5 xl:grid-cols-5 gap-3 items-start">
        {roles.map(role => <ChampionsContainer key={role.id} {...role} />
        )}

      </main>
      <Footer />
    </>
  )
}
