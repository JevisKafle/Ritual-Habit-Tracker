const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
    const res = await fetch(`${API_URL}/api/auth/register/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(!res.ok){
        const error = await res.json().catch(()=>null)
        throw new Error(error?.email?.[0] ?? error?.detail ?? "Something went wrong")
    }
    return res.json()
}

export async function loginUser(data:{email:string,password:string}) {
    const res = await fetch(`${API_URL}/api/auth/login/`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error("Invalid email or password.");
    }

    const tokens = await res.json()
    localStorage.setItem("access_item",tokens.access)
    localStorage.setItem("refresh_token",tokens.refresh)
    return tokens
}