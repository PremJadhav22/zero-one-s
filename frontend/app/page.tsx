import Hero from "@/components/home/hero"
import Steps from "@/components/home/steps"
import SearchBar from "@/components/home/search-bar"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <Steps />
      <SearchBar />
    </main>
  )
}
