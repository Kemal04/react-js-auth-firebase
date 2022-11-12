import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Pages
import { Home, Contact, Login, Register, Reset } from "./pages"
//Components
import { Header, Footer } from "./components"
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <div>
            <Router>
                <ToastContainer />
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/reset' element={<Reset />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App