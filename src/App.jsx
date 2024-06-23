import React from 'react'
import Header from './Components/Header/Header'
import Dashboard from './Pages/admin/Dashboard'
import AdminRoutes from './Router/AdminRoutes/AdminRoutes'

export default function App() {
  return (
    <>
      <Header/>
      <AdminRoutes/>
    </>
  )
}
