import { useState } from "react"
import loginstyle from "./login.module.css"

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessages] = useState("")

    async function login() {
        const res = await fetch(`/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: username,
                password: password
            })
        })
        const resJson = await res.json()
        setMessages(resJson.Message)
    }

    return (
        <div className={loginstyle.container}>
            <div className={loginstyle.left}>
                <h3>Welcome</h3>
                <label>Username:<input placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/></label>
                <label>Password:<input placeholder ="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/></label>
                <button onClick = {()=>login()}>Login</button>
            </div>
            <div className={loginstyle.right}>
            </div>
        </div>
    )
}