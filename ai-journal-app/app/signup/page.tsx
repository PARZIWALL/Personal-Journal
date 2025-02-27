"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [sentimentAnalysis, setSentimentAnalysis] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:8080/public/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email,
          password,
          sentimentAnalysis,
        }),
      })

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.")
      }

      console.log("Signup successful!")
      router.push("/login") // Redirect to login after successful signup
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={sentimentAnalysis}
                  onChange={(e) => setSentimentAnalysis(e.target.checked)}
                  className="mr-2"
                />
                <label>Enable Sentiment Analysis</label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit">Sign Up</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
