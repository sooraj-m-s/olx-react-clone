import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Menubar from './Menubar'
import Home from './Home'
import Footer from './Footer'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/setup';


function Main() {
    const [prod, setProd] = useState([])
    const [menu, setMenu] = useState('')
    const [search, setSearch] = useState('')
    const [user, setUser] = useState(()=>{
        return JSON.parse(localStorage.getItem('user')) || ''
    })
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify((user)))
    },[user])

    const getProducts = async () =>{
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsArray = querySnapshot.docs.map(doc =>({id: doc.id, ...doc.data()}));
            setProd(productsArray);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    useEffect(()=>{
        getProducts()
    },[])

    return (
    <div>
        <Navbar setSearch={setSearch} user={user} setUser={setUser}/>
        <Menubar setMenu={setMenu}/>
        <Home products={prod} search={search} menu={menu}/>
        <Footer />
    </div>
    )
}

export default Main
