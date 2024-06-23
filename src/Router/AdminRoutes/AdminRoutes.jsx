import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../Pages/admin/Dashboard'

export default function AdminRoutes() {
  return (
    <Routes>
        <Route path='/admin/dashboard' element={<Dashboard />}/>
        {/* <Route path='/admin/dashboard' element={<Dashboard />}/> */}


    </Routes>
  )
}
