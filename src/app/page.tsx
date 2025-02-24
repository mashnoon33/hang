import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-100 to-white px-4 py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Hang
        </h1>
        <p className="mb-8  text-gray-600">
          Hang is an appointment scheduling platform for social situations, similar to a combination of Calendly and Partiful. 
         <span className="italic"> It is very much a work in progress. Most functionality is not yet implemented.</span>
        </p>
        <div className="flex justify-center gap-4">
          <a href="/calendar">
            <Button className="bg-black hover:bg-slate-800">
              Open Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button></a>

        </div>
      </div>

    </main>
  )
}

