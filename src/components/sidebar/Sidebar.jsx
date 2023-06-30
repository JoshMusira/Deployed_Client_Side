import React from 'react'
import './sidebar.css'
import sidebarImage from '../../assets/images/night.jpg'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={sidebarImage} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at asperiores excepturi iure. Accusamus voluptatibus, nisi ipsam dolore inventore eaque, quisquam voluptatum nobis voluptate soluta dolor blanditiis repudiandae ipsa. Cum a error illum, libero magnam voluptatibus exercitationem neque? Debitis accusantium suscipit sapiente explicabo fuga porro iure dignissimos totam culpa aspernatur?</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Nature</li>
                    <li className="sidebarListItem">Education</li>
                    <li className="sidebarListItem">Movies</li>
                    <li className="sidebarListItem">Sport</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Fashion</li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar