import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './componentes/login/index'
import Home from './componentes/home/index'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
        )
}