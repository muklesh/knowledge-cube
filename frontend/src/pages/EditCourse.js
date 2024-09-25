import {React , useState , useEffect} from 'react'
import CreatorNavbar from '../components/Navbar/CreatorNavbar'
import { Link } from 'react-router-dom'

const EditCourse = () => {
  return (
    <div>
        <CreatorNavbar/>
        <div className='grid grid-cols-12 grid-rows-1 justify-center items-center'>
            <div className='grid col-span-3 border-r-2 border-gray-300 h-96 overflow-y-scroll overflow-auto'>
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
                <span> Tool </span> 
            </div>
            <div className='grid grid-cols-12 col-span-9 bg-gray-400 rounded-md'>
                <span className='h-96 bg-gray-100 col-span-10 col-start-2 my-8 rounded-sm'>Hello</span>
            </div>
        </div>
    </div>
  )
}

export default EditCourse




