import React from 'react'

const date = new Date();
const year = date.getFullYear()

const Footer = () => {
    return (
        <div className='bg-dark text-white text-center py-5'>
            &copy; {year} All Rights Reserved
        </div>
    )
}

export default Footer