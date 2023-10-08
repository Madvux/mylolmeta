import React from 'react'
import BuildKeyInput from './BuildKeyInput'

const Header = () => {
  return (
    <header className="flex items-center md:justify-between font-[cursive,'Apple_Chancery'] flex-wrap justify-center gap-4 px-4">
        <h1 className='font-medium text-4xl'>My LoL Meta</h1>
        <BuildKeyInput />
    </header>
  )
}

export default Header
