import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/SignUp'
import Otp from './Components/Otp/Otp'
import Protected from './Components/Protected/Protected'
import Dashboard from './Components/Dashboard/Dash'
import { BoardsProvider } from './Context/BoardContext'
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
          <Route element={<Protected />}>
            <Route path='/dashboard' element={<BoardsProvider><Dashboard /></BoardsProvider>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
