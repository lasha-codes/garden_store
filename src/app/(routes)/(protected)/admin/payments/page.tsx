'use client'
import { useState, useEffect } from 'react'
import { retrievePayments } from '../_utils/utils'
import { PaymentIntent } from '@stripe/stripe-js'

const Payments = () => {
  const [payments, setPayments] = useState<PaymentIntent[]>([])
  const [paidSelected, setPaidSelected] = useState<string[]>([
    'გადახდილი',
    'გადაუხდელი',
  ])

  useEffect(() => {
    retrievePayments().then((paymentIntents) => {
      setPayments(paymentIntents)
    })
  }, [])

  console.log(payments)

  return (
    <main className='w-full flex flex-col items-start gap-5'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-xl text-white'>გადახდები</h2>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => {
              if (paidSelected.includes('გადახდილი')) {
                setPaidSelected(
                  paidSelected.filter((payment) => {
                    return payment !== 'გადახდილი'
                  })
                )
              } else {
                setPaidSelected((prev) => [...prev, 'გადახდილი'])
              }
            }}
            className={`bg-main text-white hover:bg-main/80 transition-all duration-200 ease-linear px-8 py-2.5 font-semibold text-sm rounded-[10px] ${
              paidSelected.includes('გადახდილი') && '!bg-main/60'
            }`}
          >
            გადახდილი
          </button>
          <button
            onClick={() => {
              if (paidSelected.includes('გადაუხდელი')) {
                setPaidSelected(
                  paidSelected.filter((payment) => {
                    return payment !== 'გადაუხდელი'
                  })
                )
              } else {
                setPaidSelected((prev) => [...prev, 'გადაუხდელი'])
              }
            }}
            className={`bg-red-500 hover:bg-red-500/80 transition-all duration-200 text-white px-8 py-2.5 font-semibold text-sm rounded-[10px] ${
              paidSelected.includes('გადაუხდელი') && '!bg-red-500/60'
            }`}
          >
            გადაუხდელი
          </button>
        </div>
      </div>
    </main>
  )
}

export default Payments
