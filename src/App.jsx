import { useState } from 'react'
import Home from './components/home'
import Login from './components/login'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './components/signup';
import Collections from './components/collections';
import Aboutus from './components/aboutus';
import Contactus from './components/contact';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/collections' element={<Collections/>}/>
      <Route path='/aboutus' element={<Aboutus/>}/>
      <Route path='/contact' element={<Contactus/>}/>
    </Routes>
  )
}

export default App
