import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/topbar/TopBar'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Single from './components/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import { useContext } from 'react'
import { Context } from './context/userContext/Context'
import Footer from './components/footer/Footer'
import Update from './pages/update/Update'
import PageNotFound from './pages/notfound/PageNotFound'

function App() {
  const { user } = useContext(Context)


  return (

    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={!user ? <Login /> : <Home />} />
        <Route path='/settings' element={user ? <Settings /> : <Login />} />
        <Route path='/write' element={user ? <Write /> : <Login />} />
        <Route path='/post/:id' element={user ? <Single /> : <Login />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App
