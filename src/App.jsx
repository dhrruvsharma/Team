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
import { LoadProvider } from './Context/LoadContext'
import { ErrorProvider } from './Context/ErrorContext'
import { ActiveProvider } from './Context/ActiveContext'
import { ListProvider } from './Context/ListContext'
import { AddBoardProvider } from './Context/AddBoard'
import { AddListProvider } from './Context/AddList'
import { TaskProvider } from './Context/AddTask'
import Join from './Components/JoinBoard/Join'
import { MemberProvider } from './Context/MemberContext'

function App() {

  return (
    <LoadProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/join/:boardID/:invitationToken' element={<Join />} />
          <Route element={<Protected />}>
            <Route path='/dashboard'
              element={
                <BoardsProvider>
                  <ActiveProvider>
                    <ErrorProvider>
                      <AddBoardProvider>
                        <ListProvider>
                          <AddListProvider>
                            <TaskProvider>
                              <MemberProvider>
                                <Dashboard />
                              </MemberProvider>
                            </TaskProvider>
                          </AddListProvider>
                        </ListProvider>
                      </AddBoardProvider>
                    </ErrorProvider>
                  </ActiveProvider>
                </BoardsProvider>
              } />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoadProvider>
  )
}

export default App
