import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full py-2 xs:text-xs md:text-sm text-center absolute bottom-0'>
            <p className=''>Copyright © {new Date().getFullYear()} oneBite | All rights reserved.</p>
        </footer>
    )
}

export default Footer