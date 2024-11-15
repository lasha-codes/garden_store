'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IoIosClose } from 'react-icons/io'
import { TbCurrencyLari } from 'react-icons/tb'

const OrderComplete = () => {
  const params = useSearchParams()
  const [lineItems, setLineItems] = useState<any[]>([])

  useEffect(() => {
    const sessionId = params.get('session_id')

    const retrieveSession = async () => {
      const { data } = await axios.get(`stripe/session/get/${sessionId}`)
      if (data.status === 'failed' || !data.status) {
        return (window.location.href = '/')
      }
      if (data.session && data.status && data.lineItems) {
        setLineItems(data.lineItems.data)
      }

      console.log(data)
    }
    retrieveSession()
  }, [])

  if (lineItems.length > 0) {
    return (
      <main className='h-[91vh] w-full flex items-center justify-center font-notoSans'>
        <div className='bg-[#F7F7F7] p-6 flex flex-col items-center gap-3'>
          <h2 className='text-lg font-semibold'>YOUR ORDER</h2>
          <div className='bg-white w-[400px] flex flex-col gap-3 p-4'>
            <div className='w-full flex items-center justify-between font-semibold text-sm pb-3 pt-0.5 border-b-2 border-[#E4E4E4]'>
              <h3>PRODUCT</h3>
              <h3>SUBTOTAL</h3>
            </div>
            <div className='flex flex-col w-full items-start'>
              {lineItems.map((product, idx) => {
                return (
                  <div
                    key={idx}
                    className='py-3 border-b border-[#E4E4E4] flex items-center w-full justify-between'
                  >
                    <div className='flex items-center gap-1'>
                      <h3>{product.description}</h3>
                      <IoIosClose />
                      <span>{product.quantity}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderComplete
