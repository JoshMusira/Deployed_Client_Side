import React from 'react';
import './contact.css'; // Assuming you have the Custom.css file in the same directory as this component
import ContactComponent from '../../components/contactComponent/ContactComponent';
import { GoLocation } from "react-icons/go"
import { MdOutlineAddIcCall } from "react-icons/md"
import { FaFax } from "react-icons/fa"
import { TfiEmail } from "react-icons/tfi"
const ContactUs = () => {
    return (
        <div className="container-fluid">
            <div className="row offset-1">
                <div className="title">
                    <h2>Contact Us</h2>
                </div>
            </div>
            <div className='TopContainer'>
                <ContactComponent image={<GoLocation />} service="OUR MAIN OFFICE" location="SoHo 94 Broadway St Detroit" />
                <ContactComponent image={<MdOutlineAddIcCall />} service="PHONE NUMBER" location="2334-136-8600 " />
                <ContactComponent image={<FaFax />} service="FAX" location="123-5334-56200" />
                <ContactComponent image={<TfiEmail />} service="EMAIL" location="musira@gmail.com" />
            </div>
            <div className="row offset-1 clear-float">
                <div className="col-7">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.894593162825!2d36.8219466404175!3d-1.286453013746031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f14af1c1a44b1%3A0x9fb6b8a389141f3!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1677993716916!5m2!1sen!2sus"
                        class="map-section"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
