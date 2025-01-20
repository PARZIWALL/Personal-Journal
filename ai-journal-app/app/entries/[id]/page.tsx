import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

async function getEntry(id: string) {
  // TODO: Replace with actual API call to your Spring Boot backend
  const entries = [
    { id: "1", title: "My First Entry", content: "This is my first journal entry.", createdAt: "2023-06-01" },
    { id: "2", title: "Reflections", content: "Today I reflected on my progress.", createdAt: "2023-06-02" },
  ]
  return entries.find((entry) => entry.id === id)
}

export default async function EntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id)

  if (!entry) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
          <p className="text-sm text-gray-500">{entry.createdAt}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{entry.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Link href={`/entries/${entry.id}/edit`} passHref>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive">Delete</Button>
          <Link href="/entries" passHref>
            <Button variant="outline">Back to Entries</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

