"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

async function getEntry(id: string) {
  // TODO: Replace with actual API call to your Spring Boot backend
  const entries = [
    { id: "1", title: "My First Entry", content: "This is my first journal entry.", createdAt: "2023-06-01" },
    { id: "2", title: "Reflections", content: "Today I reflected on my progress.", createdAt: "2023-06-02" },
  ]
  return entries.find((entry) => entry.id === id)
}

export default function EditEntryPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchEntry() {
      const entry = await getEntry(params.id)
      if (entry) {
        setTitle(entry.title)
        setContent(entry.content)
      }
    }
    fetchEntry()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to your Spring Boot backend to update the entry
    console.log("Updating entry:", { id: params.id, title, content })
    router.push(`/entries/${params.id}`)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>Edit Journal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Write your journal entry here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                required
              />
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit">Update Entry</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

