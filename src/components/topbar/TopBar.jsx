import React from 'react'
import './topbar.css'
import logo from '../../assets/images/avatar.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/userContext/Context'
import { FaHome, FaRegRegistered } from 'react-icons/fa'
import { BiLogIn, BiUserCircle } from 'react-icons/bi'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BsTelephoneFill, BsFillPencilFill } from 'react-icons/bs'

const TopBar = () => {
    const { user, dispatch } = useContext(Context)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });

    };
    return (
        <div className='top'>
            <div className="topLeft">
                <span className="topLogo">JoBlog Page</span>

            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        {
                            user &&
                            <Link to='/' className='link active' ><FaHome className='iconTop' /> HOME</Link>
                        }
                    </li>
                    <li className="topListItem">
                        <Link to='/about' className='link' id='link'><HiOutlineInformationCircle className='iconTop' />ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/contact' className='link' id='link'><BsTelephoneFill className='iconTop' />CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        {
                            user &&
                            <Link to='/write' className='link' id='link'><BsFillPencilFill className='iconTop' />WRITE</Link>
                        }
                    </li>

                </ul>
            </div>
            <div className="topRight">

                {
                    user ? (
                        <Link className='profile' to="/settings">

                            <img
                                className="topImg"
                                src={user.image_URL}
                                alt=""
                            />
                            <div className="pro">
                                <h4 className='usernameProfile'>{user.username}</h4>
                                <p className='email' >Settings</p>
                            </div>
                        </Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link id='link' className="link" to="/login">
                                    <BiLogIn className='iconTop' />
                                    LOGIN
                                </Link>
                            </li>
                            <li className="topListItem">
                                <Link id='link' className="link" to="/register">
                                    <FaRegRegistered className='iconTop' />
                                    REGISTER
                                </Link>
                            </li>
                        </ul>

                    )
                }
                <span className="topListItemLogout"><Link id='link' onClick={handleLogout} className='link' >{user && " LOGOUT"}</Link></span>
            </div>
        </div>
    )
}

export default TopBar