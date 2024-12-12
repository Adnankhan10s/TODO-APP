import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='w-full h-[100px] flex items-center  '>
        <div className='container w-[350px] md:w-full shadow-md mx-auto px-5 rounded bg-gradient-to-l bg-orange-400 via-orange-300 from-orange-200  flex justify-between items-center space-x-5 '>
              <Image src={"/logo.png"} width={200} height={200}  alt='Logo' className='w-[130px] h-[70px] ' />
              <Button variant="default" size="lg" className='text-lg'>
                <Link href={"/addItem"}>
                Add Task
                </Link>
                </Button>
        </div>
    </div>
  )
}

export default Header