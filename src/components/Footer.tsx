import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from "react-icons/ai"


const Footer = () => {
    return (

        <footer className="footer footer-center py-4 text-base-content mt-auto gap-2">
            <aside className="items-center grid-flow-col">
                
                    <Link className='flex items-center gap-1' href="https://github.com/Madvux">
                <AiFillGithub /> Madvux 
                </Link>
                
                    Copyright © {new Date().getFullYear()} - All right reserved
                
                </aside>
                <p>MyLoLMeta is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties.
                    Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc</p>
        </footer>
        
    )
}

export default Footer
