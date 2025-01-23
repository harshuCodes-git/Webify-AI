import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className=" p-4 w-auto flex justify-between">
      <Image src="/logo.svg" width={30} height={20} alt='logo' />
      <div className="flex justify-between space-x-2">
        <Button variant="started">Sign In</Button>
        <Button variant="harsh">Get Started</Button>
      </div>
    </div>
  );
}

export default Navbar
