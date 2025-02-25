import React from 'react'
import { Link } from 'react-router-dom';
import banner from '../assets/banner.png'


const Home = (props) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
            <img src={banner} alt="banner" className='w-full col-span-full'/>
            {props.products.filter((data)=>data.title.toLowerCase().includes((props.search ? props.search : props.menu).toLowerCase())).map((data)=>{
                return <Link to='/details' state={{ data }}>
                    <div className='border-spacing-1 p-2 ml-3 mt-3'>
                        <img src={data.image} className='w-60 h-48'/>
                        <h1 className='font-bold text-xl'>₹ {data.price}</h1>
                        <h1>{data.category}</h1>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default Home
