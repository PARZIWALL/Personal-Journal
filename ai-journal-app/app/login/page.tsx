"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:8080/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: username, password })
      })

      if (response.ok) {
        const token = await response.text() // Get JWT token
        localStorage.setItem("token", token) // Store token for authentication
        router.push("/journal") // Redirect after successful login
      } else {
        setError("Invalid username or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
