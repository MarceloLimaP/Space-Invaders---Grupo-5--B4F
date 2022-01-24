import { useState } from "react"
//import loginstyle from "./login.module.css"


export function Signup() {
    const [account, setAccount] = useState({
        email: "",
        userName: "",
        password: "",
        passwordConfirmation: ""
    });
    //const [password, setPassword] = useState("");
    const [message, setMessages] = useState("")

    async function signup() {
        const res = await fetch(`/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(account)
        })
        const resJson = await res.json()
        setMessages(resJson.Message)
    }

    return (
        <div className={"loginstyle.container"}>
            <div className={"loginstyle.left"}>
                <h3>Welcome</h3>
                <label>Email:<input placeholder="Email" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} /></label>
                <label>Username:<input placeholder="Username" value={account.userName} onChange={(e) => setAccount({ ...account, userName: e.target.value })} /></label>
                <label>Password:<input placeholder="Password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} /></label>
                <label>Confirm Password:<input placeholder="Confirm Password" value={account.passwordConfirmation} onChange={(e) => setAccount({ ...account, passwordConfirmation: e.target.value })} /></label>
                <button onClick={() => signup()}>Signup</button>
                <p>{message}</p>
                <div>
                    <button onClick={event => window.location.href = '/'}>login
                    </button>
                </div>
            </div>
            <div className={"loginstyle.right"}>
            </div>
        </div>
    )
}