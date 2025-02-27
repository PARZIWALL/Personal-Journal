import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import EntryList from "./EntryList"

export default function EntriesPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto bg-gray-800 text-gray-100">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">Your Journal Entries</CardTitle>
          <Link href="/journal" passHref>
            <Button>New Entry</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading entries...</div>}>
            <EntryList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
