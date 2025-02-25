import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Details = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className='container mx-auto p-4'>
            <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer">
                Back
            </button>
            <div className="flex flex-col md:flex-row gap-8">
                <img src={location.state.data.image} className="w-full md:w-1/2 rounded-lg shadow-md"/>
                <div>
                    <h1 className='font-bold text-3xl mb-2'>₹ {location.state.data.price}</h1>
                    <h2 className='text-xl font-semibold mb-4'><span className='font-semibold'>Title: </span>{location.state.data.title}</h2>
                    <p className='mb-4'><span className='font-semibold'>Category: </span>{location.state.data.category}</p>
                    <p className='mb-4'><span className='font-semibold'>Description: </span>{location.state.data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Details
