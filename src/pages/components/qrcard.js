import React from 'react'
import Image from 'next/image'

const QrCard = (props) => {
  return (
    <>
        <div className='w-2-3 h-auto rounded-md overflow-hidden'>
            <div className='flex justify-evenly m-3 items-center'>
                <Image src={props.qrImage} width={100} height={100} alt={`QR Code`}/>
                <p>{props.qrName}</p>
                <i className='bi bi-delete'></i>
            </div>
        </div>
    </>
  )
}

export default QrCard