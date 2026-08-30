"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMe, logoutUser } from "@/lib/api-client"
import {User} from "@/type"



export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setError("Could not load profile."))
  }, [])

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  if (error) return <div>{error}</div>
  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}