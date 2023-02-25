import Link from 'next/link';
import React from 'react'
import Router, { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'

const Home = () => {
  const router = useRouter();
  const password = useRef("");
  const pass = process.env.NEXT_PUBLIC_PASSWWORD

  const passwordMatch = async (e) => {
    e.preventDefault();
    if (password.current === pass) {
      // Save password to local storage as a token
      if(typeof window !== 'undefined') {
        return window.localStorage.setItem("token")
      }
    } else {
      alert("Incorrect Password")
    }
  }

  useEffect(() => {
    // Check if password is saved in local storage
    // If it is, redirect to /dashboard
    if (localStorage.getItem("token")) {
      Router.push("/createqr")
    }
  }, [])



  return (
    <>
      <form onSubmit={passwordMatch} autoFocus>
        <div className='mt-10 ml-10 flex font-mono text-lg'>
          <p className='text-[#1cff36]'>Password: </p>
          <input ref={password} required maxLength={20} onChange={e => (password.current = e.target.value)} autoFocus className='ml-2 bg-transparent focus:outline-none text-[#1cff36]' type='password' />
        </div>
      </form>
    </>
  )
}

export default Home