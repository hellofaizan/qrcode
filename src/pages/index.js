import React from 'react'
import Router, { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'
import Link from 'next/link';
import mongoose from "mongoose";
import QR from '@/models/QR';
import QrCard from './components/qrcard';

const Home = ({ qrs }) => {
  const router = useRouter();
  const [text, setText] = React.useState("https://l.hellofaizan.me/")
  const [form, setForm] = React.useState({})
  // const logout = async (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("token")
  //   router.push("/")
  // }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login")
    }
  }, [router])

  const generateQR = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/createqr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
    let response = await res.json()
    if (response.success) {
      // Sending data to /api/addqr
      setForm({
        ...form,
        qrCode: response.qr,
        qrName: text
      })
      console.log(form)
      
    } else {
      alert("Error generating QR Code")
    }
  }

  return (
    <>
      <div className='w-screen p-3'>
        <h2 className='text-2xl md:text-5xl justify-center items-center flex mt-10'>Generate New QR Code</h2>
        <form onSubmit={generateQR} className='flex md:flex-row flex-col mt-10 justify-center items-center'>
          <input required placeholder='Enter Text or URL' onChange={e => (setText(e.target.value))} autoFocus id='text' name='text' className='bg-transparent border rounded-md px-4 py-2 md:w-1/4 w-80' type='text' />
          <button type='submit' className='bg-[#3e3e3e] text-white hover:bg-[#4c4c4c] w-80 rounded-md py-3 mt-4 md:mt-0 md:w-auto md:px-20 md:py-[9px] md:ml-3'>Generate</button>
        </form>
        <div className=' flex flex-col justify-center items-center mt-10 text-center'>
          {qrs.map((qr) => (
            <QrCard key={qr._id} qrImage={qr.qrCode} qrName={qr.qrName} />
          ))}
        </div>
        <div className='absolute right-2 bottom-2 mb-5 mr-5 hidden md:block'>
          <Link href={`https://github.com/hellofaizan/qrcode`} className='hover:text-red-500' ><p>Code Available on <i className='bi bi-github'></i></p></Link>
        </div>
      </div>
    </>
  )
}

// get server side props
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let qrs = await QR.find({}); /* find all the data in our database */
  return {
    props: { qrs: JSON.parse(JSON.stringify(qrs)) }
  }
}

export default Home