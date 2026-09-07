"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RequireAuth({children}:{children:React.ReactNode}){
    const router = useRouter()
    const [checked,setChecked] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("access_token")
        if(!token){
            router.push("/login")
        }else{
            setChecked(true)
        }
    },[router])

    if(!checked) return null

    return <>{children}</>
}
