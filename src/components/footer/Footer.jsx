import React from 'react';
import './footer.css'; // Import your CSS file
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
    return (
        <div className='footer-container'>
            <p>joshuamusira01@gmail.com</p>
            <p>Inpired by: <span>Jitu Cohort 1 BootCamp</span></p>
            <p>Student @KirinyagaUniversity</p>
            <div className="icons">
                <AiFillGithub />
                <FiInstagram />
                <FaLinkedin />
                <FaFacebookSquare />
            </div>

        </div >

    )
}

export default Footer;
