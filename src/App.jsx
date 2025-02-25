import React from 'react'
import Main from './components/Main'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details'
import Sell from './components/Sell'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/sell' element={<Sell />}/>
        <Route path='/details' element={<Details />}/>
      </Routes>
    </>
  )
}

export default App
