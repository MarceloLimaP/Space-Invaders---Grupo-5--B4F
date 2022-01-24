import './App.css';
import { Login } from './components/Login'
import { Signup } from './components/Signup';
import { Game } from './components/Game'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { useEffect, useState } from "react"
import loginstyle from "./components/login.module.css"



function App() {
  const [message, setMessages] = useState("")

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setMessages={setMessages} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
      <Notification message={message} />

    </div>

  );
}

function Notification({ message }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!message) return
    setVisible(true)
    const id = setTimeout(() => {
      setVisible(false)
    }, 3000);
    return () => {
      clearTimeout(id)
    }

  }, [message])
  return (
    <div className={[loginstyle.notification]
      .concat(visible ? [loginstyle.visible] : [])
      .join(' ')
    }>{message}

    </div>
  )
}

export default App;
