import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import '../single/single.css'
import SinglePost from '../../components/singlepost/SinglePost'

const Single = () => {
    return (
        <div className='single'>
            <SinglePost  />
            <Sidebar />
        </div>
    )
}

export default Single