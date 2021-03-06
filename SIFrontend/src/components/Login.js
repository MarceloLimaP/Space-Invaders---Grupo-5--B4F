import { useEffect, useState } from "react"
import loginstyle from "./login.module.css"
import { useNavigate } from "react-router-dom";

export function Login({ setMessages }) {
    const [username, setUsername] = useState("");
    //const [menu, setMenu] = useState(false)
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
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
        if (resJson.token !== undefined) {
            localStorage.setItem("token", resJson.token)
            navigate('/menu')
        }

    }

    return (
        <div className={loginstyle.container}>
            <div className={loginstyle.left}>
                <h3>Welcome</h3>
                <label>Username:<input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password:<input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                <button onClick={() => login()}>Login</button>
            </div>
            <div>
                <button onClick={event => window.location.href = '/signup'}>Signup
                </button>
            </div>
            <div className={loginstyle.right}>
            </div>
        </div>
    )
}
