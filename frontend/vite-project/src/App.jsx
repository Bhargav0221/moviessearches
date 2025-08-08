import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from '../component/signup'
import Login from '../component/login'
import { Routes,Route } from 'react-router'

function App() {
  const [count, setCount] = useState(0);


  return (
    <>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    
    </>
  )
}

export default App
