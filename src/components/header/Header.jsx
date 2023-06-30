import React from 'react'
import './header.css'
import homelogo from '../../assets/images/alley.jpg'
const Header = () => {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className="Titles">
                    FIND YOUR PREFERRED BLOG...
                </span>
                <span className='headerTitleLg'>What's your electronic preferences  say about you and your personality.</span>

            </div>
            <img className='headerImg' src={homelogo} alt="" />

        </div>
    )
}

export default Header