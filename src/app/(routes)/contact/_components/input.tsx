import React from 'react'

const ContactInput = ({
  value,
  setValue,
  type,
  placeholder,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  type: 'text' | 'email'
  placeholder: string
}) => {
  return (
    <input
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      className='border border-[#E4E4E4] rounded-[5px] outline-none px-4 py-1.5 w-full text-[#777777] placeholder:text-[#777777] text-[15px]'
    />
  )
}

export default ContactInput
