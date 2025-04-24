import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Downloads from './pages/Downloads'
import Course from './pages/Course'
import About from './pages/About'


function App() {
  

  return (
    <>
     <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/about' element={<About/>}/>
      <Route path= '/course' element={<Course/>}/>
      <Route path= '/downloads' element={<Downloads/>}/>
      <Route path= '/contact' element={<Contact/>} />
      
     </Routes>
  
     
    </>
  )
}

export default App
