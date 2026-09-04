"use client"

import { useRouter } from "next/navigation"
import ProfilePage from "@/components/ProfilePage"
import { logoutUser } from "@/lib/api-client"
import { useCurrentUser,useProfileStats } from "@/lib/queries"
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
  const { data: stats, isLoading: isStatsLoading } = useProfileStats()

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  if (isLoading || isStatsLoading || !rawUser || !stats) return <ProfilePageSkeleton />

  const user = {
    name: rawUser.name,
    email: rawUser.email,
    joinedAt: rawUser.date_joined,
    avatarInitials: getInitials(rawUser.name || rawUser.email),
  };

  return (
    <ProfilePage
      user={user}
      stats={stats}
      onLogout={handleLogout}
    />
  )
}