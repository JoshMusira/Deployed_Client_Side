import React from 'react'

const ContactComponent = ({ image, service, location }) => {
    return (
        <div className='containerComponent'>
            <span>{image}</span>
            <h4>{service}</h4>
            <p>{location}</p>
        </div>
    )
}

export default ContactComponent