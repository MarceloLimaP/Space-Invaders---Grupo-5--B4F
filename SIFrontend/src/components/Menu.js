import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export function Menu() {
    useEffect(async () => {
        const res = await fetch('/menu', {
            'method': "GET",
            'headers': { Authorization: localStorage.getItem("token") }
        })

        if (res.status == 401)
            navigate('/')
        console.log("Olá")

    }, [])
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <button onClick={() => navigate('/game')}>
                    Play
                </button>
            </div>

            <div>
                <button onClick={() => navigate('/shop')}>
                    Shop
                </button>
            </div>
        </div>
    )
}