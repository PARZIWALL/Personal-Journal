import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

async function getEntries() {
  // TODO: Replace with actual API call to your Spring Boot backend
  return [
    { id: 1, title: "My First Entry", content: "This is my first journal entry.", createdAt: "2023-06-01" },
    { id: 2, title: "Reflections", content: "Today I reflected on my progress.", createdAt: "2023-06-02" },
  ]
}

export default async function EntryList() {
  const entries = await getEntries()

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
            <p className="text-sm text-gray-500">{entry.createdAt}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{entry.content.substring(0, 100)}...</p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Link href={`/entries/${entry.id}`} passHref>
              <Button variant="outline">View</Button>
            </Link>
            <Link href={`/entries/${entry.id}/edit`} passHref>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

