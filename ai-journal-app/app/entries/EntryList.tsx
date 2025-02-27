"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

async function fetchEntries() {
  const response = await fetch("http://localhost:8080/api/entries") // Replace with your actual API
  if (!response.ok) throw new Error("Failed to fetch entries")
  return response.json()
}

export default function EntryList() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEntries()
      .then((data) => {
        setEntries(data)
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return

    const response = await fetch(`http://localhost:8080/api/entries/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id))
    } else {
      console.error("Failed to delete entry")
    }
  }

  if (loading) return <div>Loading entries...</div>

  return (
    <div className="space-y-4">
      {entries.length > 0 ? (
        entries.map((entry) => (
          <Card key={entry.id} className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleDateString()}</p>
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
              <Button variant="destructive" onClick={() => handleDelete(entry.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-gray-400 text-center">No journal entries found.</div>
      )}
    </div>
  )
}
