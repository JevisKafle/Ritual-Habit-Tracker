"use client"
import HomePage from "./(pages)/home/page";
import { useRouter } from "next/navigation"
import LandingPage from "@/components/LandingPage"

const Home = () => {
  const router = useRouter()

  const handleLogin = () => {
    const token = localStorage.getItem("access_token")
    router.push(token ? "/home" : "/login")
  }

  const handleSignUp = () => {
    const token = localStorage.getItem("access_token")
    router.push(token ? "/home" : "/register")
  }
  const handleGoToHabits = () => { 
    router.push("/home")
  }
  return (
    <LandingPage
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onGoToHabits={handleGoToHabits}
    />
  )
}

export default Home
