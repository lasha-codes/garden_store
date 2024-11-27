'use client'
import { useState, useEffect } from 'react'
import { retrievePayments } from '../_utils/utils'
import { StripePayment } from '@/types/globalTypes'
import PaymentCard from '../_components/payment_card'

const Payments = () => {
  const [payments, setPayments] = useState<StripePayment[]>([])
  const [unpaidPayments, setUnpaidPayments] = useState<StripePayment[]>([])
  const [paidPayments, setPaidPayments] = useState<StripePayment[]>([])
  const [paidSelected, setPaidSelected] = useState<string[]>([
    'გადახდილი',
    'გადაუხდელი',
  ])

  useEffect(() => {
    retrievePayments().then((paymentIntents) => {
      setPayments(paymentIntents)
      const filterUnpaid = paymentIntents.filter((payment: StripePayment) => {
        return payment.metadata?.status === 'pending🕒'
      })
      const filterPaid = paymentIntents.filter((payment: StripePayment) => {
        return (
          payment.metadata?.status === 'complete✅' ||
          payment.status === 'succeeded'
        )
      })
      setUnpaidPayments(filterUnpaid)
      setPaidPayments(filterPaid)
    })
  }, [])

  useEffect(() => {
    if (
      paidSelected.includes('გადახდილი') &&
      paidSelected.includes('გადაუხდელი')
    ) {
      setPayments([...unpaidPayments, ...paidPayments])
    } else if (paidSelected.includes('გადახდილი')) {
      setPayments([...paidPayments])
    } else {
      setPayments([...unpaidPayments])
    }
    console.log(unpaidPayments, paidPayments)
  }, [paidSelected])

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
      <div className='bg-[#111111] rounded-[10px] p-5 flex flex-col items-start gap-3 w-full h-[80vh] overflow-auto'>
        {payments.map((payment, idx) => {
          return (
            <PaymentCard
              paymentId={payment.id}
              status={payment.metadata?.status || payment.status}
              key={idx}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Payments
