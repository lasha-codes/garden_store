'use client'

import { selectCartTotals, toggleCart } from '@/lib/slices/products'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { retrieveCartData } from '@/lib/slices/products'
import { useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'
import { TbCurrencyLari } from 'react-icons/tb'
import Link from 'next/link'
import { useState } from 'react'
import tbc_logo from './icons/tbc-logo.svg'
import { FaStripe } from 'react-icons/fa6'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { cartOpen, retrievedCart } = useSelector(
    (state: RootState) => state.products
  )
  const { totalPrice } = useSelector(selectCartTotals)
  const [delivery, setDelivery] = useState<
    'თვითგატანა' | 'მიწოდება თბილისში' | 'მიწოდება რეგიონში'
  >('თვითგატანა')
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0)
  const [paymentType, setPaymentType] = useState<
    | 'საბანკო გადარიცხვა'
    | 'გადახდა ნაღდი ფულით შეკვეთის მიღებისას'
    | 'თიბისი ბანკის ონლაინ განვადება'
    | 'ონლაინ გადახდა'
  >('საბანკო გადარიცხვა')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [idNumber, setIdNumber] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [orderNotes, setOrderNotes] = useState<string>('')

  useEffect(() => {
    dispatch(retrieveCartData())
  }, [])

  const [paymentLoading, setPaymentLoading] = useState<boolean>(false)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!)

  const createStripeCheckoutSession = async () => {
    setPaymentLoading(true)

    try {
      const { data } = await axios.post('/stripe/create/payment/intent', {
        products: retrievedCart,
      })

      const sessionId = data.sessionId
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        })

        if (error) {
          console.error('Stripe Checkout Error:', error.message)
          alert('There was an error with the checkout. Please try again.')
        }
      }
    } catch (err: any) {
      console.error('Error creating checkout session:', err.message)
      toast.error('დაფიქსირდა ხარვეზი გადახდის დროს, გთხოვთ ცადეთ თავიდან.')
    } finally {
      setPaymentLoading(false)
    }
  }

  const createPendingSession = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      const validEmailProvided = emailRegex.test(email)

      if (!validEmailProvided) {
        toast.error('გთხოვთ მიუთითეთ სწორი ელფოსტა.')
      }

      if (!name) {
        toast.error('გთხოვთ მიუთითეთ სახელი *')
      }
      if (!lastName) {
        toast.error('გთხოვთ მიუთითეთ გვარი *')
      }
      if (!idNumber) {
        toast.error('გთხოვთ მიუთითეთ პირადი ნომერი *')
      }
      if (!city) {
        toast.error('გთხოვთ მიუთითეთ ქალაქი *')
      }
      if (!address) {
        toast.error('გთხოვთ მიუთითეთ მისამართი *')
      }
      if (!phoneNumber) {
        toast.error('გთხოვთ მიუთითეთ ტელეფონი *')
      }
      if (!email) {
        toast.error('გთხოვთ მიუთითეთ, ელფოსტა *')
      }
      if (
        !name ||
        !lastName ||
        !idNumber ||
        !city ||
        !address ||
        !phoneNumber ||
        !email ||
        !validEmailProvided
      ) {
        return
      }

      const metadata = {
        name: name,
        lastName: lastName,
        id: idNumber,
        payment_method: paymentType,
        delivery: delivery,
        city: city,
        address: address,
        phone: phoneNumber,
        email: email,
      }
      setPaymentLoading(true)
      if (orderNotes) {
        // @ts-ignore
        metadata.orderNotes = orderNotes
      }

      const { data } = await axios.post('/stripe/create/pending/intent', {
        products: retrievedCart,
        metadata: metadata,
      })

      setName('')
      setLastName('')
      setIdNumber('')
      setCity('')
      setPhoneNumber('')
      setAddress('')
      setEmail('')
      setOrderNotes('')

      setPaymentLoading(false)
      if (data.paymentIntentId) {
        router.replace(`/pending_payment?paymentIntent=${data.paymentIntentId}`)
      }
    } catch (err: any) {
      console.error('Error creating pending payment:', err.message)
    }
  }

  return (
    <main className='bg-white flex items-start gap-4 mt-16 font-notoSans'>
      <div
        onClick={() => dispatch(toggleCart(false))}
        className={`fixed w-screen h-screen top-0 left-0 z-[500] bg-black/50 transition-all duration-200 ease-linear ${
          cartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className='w-full flex flex-col gap-5'>
        <h2 className='font-notoSans font-semibold text-[22px]'>
          BILLING DETAILS
        </h2>
        <form className='flex flex-col items-start gap-5 w-full'>
          <div className='flex items-center gap-3 w-full'>
            <div className='w-full flex flex-col items-start gap-1'>
              <label
                htmlFor='name'
                className='flex items-center gap-1.5 text-[15px]'
              >
                <span>სახელი</span>
                <span className='text-red-500'>*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                type='text'
                className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080]'
              />
            </div>
            <div className='w-full flex flex-col items-start gap-1'>
              <label
                htmlFor='lastName'
                className='flex items-center gap-1.5 text-[15px]'
              >
                <span>გვარი</span>
                <span className='text-red-500'>*</span>
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id='lastName'
                type='text'
                className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='idNumber'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>პირადი ნომერი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              value={idNumber}
              onChange={(e) => {
                if (!Number.isInteger(Number(e.target.value))) {
                  return
                }
                setIdNumber(e.target.value)
              }}
              id='idNumber'
              type='text'
              className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
            />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <div className='flex items-center gap-1.5 text-[15px]'>
              <span>ქვეყანა</span>
              <span className='text-red-500'>*</span>
            </div>
            <span className='text-[15px] font-semibold text-[#777780]'>
              Georgia
            </span>
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='city'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ქალაქი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id='city'
              type='text'
              className='w-full h-[42px] outline-none text-[15px] px-3 py-1 border border-[#D9D9D9] text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='address'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ქუჩის მისამართი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id='address'
              type='text'
              placeholder='სახლის ნომერი და ქუჩის მისამართი'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='phone'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ტელეფონი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => {
                if (
                  e.target.value !== '+' &&
                  !Number.isInteger(Number(e.target.value))
                ) {
                  return
                }
                setPhoneNumber(e.target.value)
              }}
              id='phone'
              type='text'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1'>
            <label
              htmlFor='email'
              className='flex items-center gap-1.5 text-[15px]'
            >
              <span>ელფოსტის მისამართი</span>
              <span className='text-red-500'>*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              type='email'
              className='w-full h-[42px] outline-none px-3 text-[15px] py-1 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
          <div className='w-full flex flex-col items-start gap-1 mt-5'>
            <label
              htmlFor='notes'
              className='flex items-center gap-1.5 text-[15px]'
            >
              Order notes (optional)
            </label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              id='notes'
              placeholder='Notes about your order, e.g. special notes for delivery.'
              className='w-full h-[180px] outline-none px-3 text-[15px] py-4 border border-[#D9D9D9] text-[#778080] placeholder:text-[#778080]'
            />
          </div>
        </form>
      </div>
      <div className='w-full bg-[#F7F7F7] p-5 flex flex-col gap-3 items-center'>
        <h2 className='text-[22px] font-semibold'>YOUR ORDER</h2>
        <div className='w-full bg-white flex flex-col p-5'>
          <div className='w-full flex items-center justify-between border-b-2 pb-3 border-[#E4E4E4]'>
            <h3 className='font-semibold text-[15px]'>PRODUCT</h3>
            <h3 className='font-semibold text-[15px]'>SUBTOTAL</h3>
          </div>
          {retrievedCart?.map((product, idx) => {
            return (
              <div
                key={idx}
                className='flex items-center justify-between border-b border-[#E4E4E4]'
              >
                <div className='flex items-center gap-2'>
                  <Link
                    href={`/products/${product.id}`}
                    className='text-[#777777] text-[15px] py-3'
                  >
                    <h3 className='max-w-[250px]'>{product.geo_title}</h3>
                  </Link>
                  <IoIosClose className='text-[#707070] text-[17px]' />
                  <span className='text-sm font-semibold text-[#777777]'>
                    {product.qty}
                  </span>
                </div>
                <div className='flex items-start gap-1'>
                  <span className='text-sm text-[#777777]'>
                    {(product.price * product.qty).toFixed(2)}
                  </span>
                  <TbCurrencyLari className='text-[#777777]' />
                </div>
              </div>
            )
          })}
          <div className='w-full flex items-center justify-between border-b border-[#E4E4E4] py-3'>
            <span className='text-sm font-semibold'>Subtotal</span>
            <div className='flex items-center gap-1.5 text-main'>
              <span className='font-semibold text-sm'>
                {totalPrice.toFixed(2)}
              </span>
              <TbCurrencyLari />
            </div>
          </div>
          <div className='w-full flex items-center justify-between py-3 border-b border-[#E4E4E4]'>
            <span className='text-sm font-semibold'>Shipping</span>
            <div className='flex flex-col items-end gap-2'>
              <button
                onClick={() => {
                  setDelivery('თვითგატანა')
                  setDeliveryPrice(0)
                }}
                className='flex items-center gap-2'
              >
                <span className='text-sm translate-y-[1px]'>თვითგატანა</span>
                <div
                  className={`w-[13px] h-[13px] ${
                    delivery === 'თვითგატანა' && '!border-[#005CC8]'
                  } rounded-full p-[2px] border border-[#616161] flex items-center justify-center`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all ease-linear ${
                      delivery === 'თვითგატანა' && 'bg-[#005CC8]'
                    }`}
                  ></div>
                </div>
              </button>
              <button
                onClick={() => {
                  setDelivery('მიწოდება თბილისში')
                  setDeliveryPrice(10)
                }}
                className='flex items-center gap-2'
              >
                <span className='text-sm translate-y-[1px]'>
                  მიწოდება თბილისში:
                </span>
                <div className='flex items-center gap-1.5 text-main'>
                  <span className='text-sm font-semibold'>10.00</span>
                  <TbCurrencyLari />
                </div>
                <div
                  className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                    delivery === 'მიწოდება თბილისში' && '!border-[#005CC8]'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all ease-linear ${
                      delivery === 'მიწოდება თბილისში' && 'bg-[#005CC8]'
                    }`}
                  ></div>
                </div>
              </button>
              <button
                onClick={() => {
                  setDelivery('მიწოდება რეგიონში')
                  setDeliveryPrice(20)
                }}
                className='flex items-center gap-2'
              >
                <span className='text-sm translate-y-[1px]'>
                  მიწოდება რეგიონში:
                </span>
                <div className='flex items-center gap-1.5 text-main'>
                  <span className='text-sm font-semibold'>20.00</span>
                  <TbCurrencyLari />
                </div>
                <div
                  className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                    delivery === 'მიწოდება რეგიონში' && '!border-[#005CC8]'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all ease-linear ${
                      delivery === 'მიწოდება რეგიონში' && 'bg-[#005CC8]'
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>
          <div className='w-full flex items-center justify-between pt-4'>
            <h3 className='text-xl font-semibold'>Total</h3>
            <div className='flex items-start gap-2 font-semibold text-main'>
              <h3 className='text-xl'>
                {(totalPrice + deliveryPrice).toFixed(2)}
              </h3>
              <TbCurrencyLari className='text-2xl' />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 items-start mt-3'>
          <button
            onClick={() => setPaymentType('საბანკო გადარიცხვა')}
            className='flex items-center gap-2'
          >
            <div
              className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                paymentType === 'საბანკო გადარიცხვა' && '!border-[#005CC8]'
              }`}
            >
              <div
                className={`w-full h-full rounded-full transition-all ease-linear ${
                  paymentType === 'საბანკო გადარიცხვა' && 'bg-[#005CC8]'
                }`}
              ></div>
            </div>
            <span className='text-sm translate-y-[1px]'>
              საბანკო გადარიცხვა
            </span>
          </button>
          <button
            onClick={() =>
              setPaymentType('გადახდა ნაღდი ფულით შეკვეთის მიღებისას')
            }
            className='flex items-center gap-2'
          >
            <div
              className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                paymentType === 'გადახდა ნაღდი ფულით შეკვეთის მიღებისას' &&
                '!border-[#005CC8]'
              }`}
            >
              <div
                className={`w-full h-full rounded-full transition-all ease-linear ${
                  paymentType === 'გადახდა ნაღდი ფულით შეკვეთის მიღებისას' &&
                  'bg-[#005CC8]'
                }`}
              ></div>
            </div>
            <span className='text-sm translate-y-[1px]'>
              გადახდა ნაღდი ფულით შეკვეთის მიღებისას
            </span>
          </button>
          <button
            onClick={() => setPaymentType('თიბისი ბანკის ონლაინ განვადება')}
            className='flex items-center gap-2'
          >
            <div
              className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                paymentType === 'თიბისი ბანკის ონლაინ განვადება' &&
                '!border-[#005CC8]'
              }`}
            >
              <div
                className={`w-full h-full rounded-full transition-all ease-linear ${
                  paymentType === 'თიბისი ბანკის ონლაინ განვადება' &&
                  'bg-[#005CC8]'
                }`}
              ></div>
            </div>
            <span className='text-sm translate-y-[1px]'>
              თიბისი ბანკის ონლაინ განვადება
            </span>
            <Image src={tbc_logo} width={110} height={110} alt='tbc_logo' />
          </button>
          <button
            onClick={() => setPaymentType('ონლაინ გადახდა')}
            className='flex items-center gap-2 -translate-y-3'
          >
            <div
              className={`w-[13px] h-[13px] rounded-full p-[2px] border border-[#616161] flex items-center justify-center ${
                paymentType === 'ონლაინ გადახდა' && '!border-[#005CC8]'
              }`}
            >
              <div
                className={`w-full h-full rounded-full transition-all ease-linear ${
                  paymentType === 'ონლაინ გადახდა' && 'bg-[#005CC8]'
                }`}
              ></div>
            </div>
            <span className='text-sm translate-y-[1px]'>ონლაინ გადახდა</span>
            <FaStripe className='text-[45px] text-[#665BFF]' />
          </button>
        </div>
        <p className='text-[#777777] text-sm border-t border-b py-3 -translate-y-3 border-[#E4E4E4]'>
          თქვენი პერსონალური მონაცემები გამოიყენება შეკვეთების გასაფორმებლად,
          საიტთან მუშაობის გასამარტივებლად და სხვა მიზნებისათვის,
        </p>
        {paymentType === 'ონლაინ გადახდა' && (
          <p className='text-sm mb-2 text-red-600'>
            ონლაინ გადახდის დროს არაა ინფორმაციის შევსება სავალდებულო *
          </p>
        )}
        <button
          disabled={paymentLoading}
          onClick={() => {
            if (paymentType === 'ონლაინ გადახდა') {
              createStripeCheckoutSession()
            } else {
              createPendingSession()
            }
          }}
          className='w-full py-3 bg-main hover:bg-main/90 h-[50px] flex items-center justify-center transition-all duration-200 ease-linear text-white font-semibold text-[15px]'
        >
          {paymentLoading ? (
            <div className='flex items-center gap-3'>
              Processing
              <div className='loader -translate-y-0.5'></div>
            </div>
          ) : (
            'Place order'
          )}
        </button>
      </div>
    </main>
  )
}

export default Checkout
