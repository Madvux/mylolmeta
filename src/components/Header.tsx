"use client"
import React from 'react'
import BuildKeyInput from './BuildKeyInput'
import Link from 'next/link'

const Header = () => {

  return (
    <header className="flex items-center md:justify-between font-[cursive,'Apple_Chancery'] flex-wrap justify-center gap-4 px-4">
      <Link href="/" onClick={() => localStorage.clear()}><h1 className='font-medium text-4xl'>My LoL Meta</h1></Link>
      <BuildKeyInput />
    </header>
  )
}

export default Header
