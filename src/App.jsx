import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Pages/Login'
import Singup from './Pages/Singup'
import Footer from './Components/Footer'
import Header from './Components/Header'
import UsersPanel from './Pages/UsersPanel'
import Maintenance from './Pages/Maintenance'
import PageError from './Pages/PageError/PageError'
import DeviceManagement from './Pages/DeviceManagement'
import ObservationsCard from './Pages/ObservationsCard'
import Device from './Pages/Device'
import NewMaintenance from './Pages/NewMaintenance'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <div className='flex min-h-screen flex-col pt-16'>
        <div className='flex flex-grow flex-col'>
          <Routes>
            {/* Sergio */}
            <Route path='/' element={<Login />} />
            <Route path='/singup' element={<Singup />} />
            {/* Johan */}
            <Route path='*' element={<PageError />} />
            {/* Wendy */}
            <Route path='/usersPanel' element={<UsersPanel />} />
            {/* Lorena */}
            <Route path='/deviceManagment' element={<DeviceManagement />} />
            <Route path='/device' element={<Device />} />
            {/* Johan */}
            <Route path='/maintenance' element={<Maintenance />} />
            <Route path='/maintenance/new' element={<NewMaintenance />} />
            <Route path='/observations/:id' element={<ObservationsCard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
