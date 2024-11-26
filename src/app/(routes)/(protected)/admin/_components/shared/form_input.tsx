type InputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  type: string
}

const Input = ({ value, setValue, placeholder, type }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
      }}
      className='w-full bg-[#111111] text-[#575757] placeholder:text-[#575757] py-4 px-6 rounded-[10px] outline-none text-sm font-semibold'
    />
  )
}

export default Input
