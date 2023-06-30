import React from 'react'
import '../home/home.css'

import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
const Home = () => {
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <Sidebar />
            </div>
        </>
    )
}

export default Home