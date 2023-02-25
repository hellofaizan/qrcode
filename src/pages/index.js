import Link from 'next/link';
import React from 'react'
import Router, { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'

const Home = () => {
  const router = useRouter();
  const password = useRef("");

  const passwordMatch = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.current,
      }),
    })
    let response = await res.json()
    if (response.success) {
      localStorage.setItem("token", response.data)
      router.push("/createqr")
    }
    else {
      alert(response.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/createqr")
    }
  }, [router])

  return (
    <>
      <form onSubmit={passwordMatch}>
        <div className='md:mt-10 md:ml-10 flex w-auto mt-10 ml-4 font-mono text-lg'>
          <p className='text-[#1cff36]'>Password: </p>
          <input required placeholder='Enter Password' onChange={e => (password.current = e.target.value)} autoFocus id='password' name='password' className='ml-2 bg-transparent focus:outline-none text-[#1cff36]' type='password' />
        </div>
      </form>
    </>
  )
}

export default Home