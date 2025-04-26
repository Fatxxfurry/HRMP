import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './layout/dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { Outlet } from 'react-router'

function App() {
  return (
    <Outlet />

  )
}

export default App
