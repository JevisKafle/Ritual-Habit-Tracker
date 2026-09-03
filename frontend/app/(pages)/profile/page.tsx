"use client"

import { useRouter } from "next/navigation"
import ProfilePage from "@/components/ProfilePage"
import { dummyProfileStats } from "@/utils/dummy"
import { logoutUser } from "@/lib/api-client"
import { useCurrentUser } from "@/lib/queries"
import ProfilePageSkeleton from "@/components/ProfilePageSkeleton"

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(part => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export default function Profile() {
  const router = useRouter()
  const { data: rawUser, isLoading } = useCurrentUser()

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  if (isLoading || !rawUser) return <ProfilePageSkeleton />

  const user = {
    name: rawUser.name,
    email: rawUser.email,
    joinedAt: rawUser.date_joined,
    avatarInitials: getInitials(rawUser.name || rawUser.email),
  };

  return (
    <ProfilePage
      user={user}
      stats={dummyProfileStats}
      onLogout={handleLogout}
    />
  )
}