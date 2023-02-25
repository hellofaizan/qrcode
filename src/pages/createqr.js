import React from 'react'
import Router, { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'
import Image from 'next/image'

const CreateQR = () => {
  const router = useRouter();
  const [text, setText] = React.useState("https://l.hellofaizan.me/")
  const img = useRef("")
  // const logout = async (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("token")
  //   router.push("/")
  // }
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
      console.log(response)
      const response2 = new XMLHttpRequest();

      response2.open("POST", process.env.WEBHOOK_URL);
      response2.setRequestHeader('Content-type', 'application/json');

      const timestamp = new Date();

      const msgEmbed = {
        title: `Another QR Code Generated`,
        description: `QR Code Generated for ${text}`,
        color: 0x00ff00,
        image: {
          url: response.qr,
        },
        timestamp: timestamp.toISOString(),
      }

      const params = {
        username: "qr.hellofaizan.me",
        content: "<@890232380265222215>",
        embeds: [msgEmbed]
      }
      response2.send(JSON.stringify(params));
      response2.onload = () => {
        if (response2.status >= 200 && response2.status < 400) {
          
          alert("QR Code successfully and Send to Discord");
        } else {
          alert("Something went wrong! "+ response2.status + " " + response2.statusText + "");
        }
      }
    } else {
      alert("Error generating QR Code")
    }
  }

  return (
    <>
      <div className='w-screen p-3'>
        <h2 className='text-2xl md:text-5xl justify-center items-center flex mt-10'>Generate New QR Code</h2>
        <form onSubmit={generateQR} className='flex md:flex-row flex-col mt-10 justify-center items-center'>
          <input required placeholder='Enter Text' onChange={e => (setText(e.target.value))} autoFocus id='text' name='text' className='bg-transparent border rounded-md px-4 py-2 md:w-1/4 w-80' type='text' />
          <button type='submit' className='bg-[#3e3e3e] text-white hover:bg-[#4c4c4c] w-80 rounded-md py-3 mt-4 md:mt-0 md:w-auto md:px-20 md:py-[9px] md:ml-3'>Generate</button>
        </form>
      </div>
    </>
  )
}

export default CreateQR
