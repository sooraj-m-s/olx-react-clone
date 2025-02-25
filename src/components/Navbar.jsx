import React, { useState } from 'react'
import olx from '../assets/olx.png'
import lens from '../assets/lens.png'
import arrow from '../assets/arrow.png'
import search from '../assets/search.png'
import Login from './Login'
import { toast } from 'react-toastify'


const Navbar = ({ setSearch, user, setUser }) => {
  const [loginPop, setLoginPop] = useState(false)
  const handleLogout = ()=>{
    setUser(null)
    toast.error("Logged out successfully!");
  }

  return (
    <>
      <div className='flex p-4 bg-slate-100 shadow-md'>
        <img src={olx} className='w-11 h-9'/>
        <div className='flex border-2 border-spacing-1 w-70 p-2 border-black ml-5 bg-white'>
          <img src={lens} className='w-6 h-5 mt-1'/>
          <input type="text" placeholder='Location' className='ml-3 outline-none'/>
          <img src={arrow} className='w-8 h-7'/>
        </div>
        <div className='flex h-12 ml-4 border-2 border-black bg-white'>
          <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96 outline-none'/>
          <img src={search} alt="" />
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
          <h1 className='font-semibold'>ENGLISH</h1>
          <img src={arrow} className='w-8 h-7'/>
        </div>
        {user ? (
          <div className="flex h-12 p-3 ml-6 cursor-pointer">
            <h1 className="font-bold text-lg">{user.displayName}</h1>
            <button onClick={handleLogout} className="ml-4 text-sm text-blue-600 hover:underline">
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(!loginPop)}
            className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}
        <div className='w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'
          onClick={() => {
            if (!user) {
              toast.error("You must be logged in to sell!");
            }else{
              window.location.href = "/sell";
            }
          }}
        ><h1 className='font-bold text-lg ml-3'>+ SELL</h1>
        </div>
      </div>
      {loginPop && <Login setLoginPop={setLoginPop} setUser={setUser}/>}
    </>
  )
}

export default Navbar
