'use client'
import { useState } from 'react'
import ContactInput from './input'
import { contactViaEmail } from '@/services/email'

const ContactForm = () => {
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  return (
    <form
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        const { success }: { success: boolean } = await contactViaEmail(
          fullName,
          email,
          phone,
          subject,
          message
        )
        if (success) {
          setFullName('')
          setEmail('')
          setPhone('')
          setSubject('')
          setMessage('')
        }
      }}
      className='flex flex-col items-start gap-10 font-poppins w-[350px]'
    >
      <h2 className='text-4xl font-semibold'>CONTACT US</h2>
      <div className='flex flex-col items-start gap-3.5 w-full'>
        <ContactInput
          type='text'
          value={fullName}
          setValue={setFullName}
          placeholder='Full Name *'
        />
        <ContactInput
          type='email'
          value={email}
          setValue={setEmail}
          placeholder='Email *'
        />
        <ContactInput
          type='text'
          value={phone}
          setValue={setPhone}
          placeholder='Phone *'
        />
        <ContactInput
          type='text'
          value={subject}
          setValue={setSubject}
          placeholder='Subject *'
        />
        <textarea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          placeholder='Message *'
          className='border border-[#E4E4E4] rounded-[5px] outline-none px-4 py-2 w-full text-[#777777] h-[100px] placeholder:text-[#777777] text-[15px] resize-none'
        />
      </div>
      <button className='bg-main w-full py-2.5 -translate-y-2.5 hover:bg-main/90 transition-all duration-200 ease-linear rounded-full tracking-wide text-white'>
        SUBMIT
      </button>
    </form>
  )
}

export default ContactForm
