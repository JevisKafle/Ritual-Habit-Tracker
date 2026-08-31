"use client"

import { useRouter } from "next/navigation"
import ProfilePage from "@/components/ProfilePage"
import { dummyProfileStats } from "@/utils/dummy"
import { logoutUser } from "@/lib/api-client"

export default function Profile() {
  const router = useRouter()

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  return (
    <ProfilePage
      stats={dummyProfileStats}
      onLogout={handleLogout}
    />
  )
}