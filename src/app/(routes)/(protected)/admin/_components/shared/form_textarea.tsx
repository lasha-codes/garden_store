type TextareaProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

const Textarea = ({ value, setValue, placeholder }: TextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
      className='bg-[#111111] outline-none resize-none h-[140px] px-6 py-4 text-[#575757] placeholder:text-[#575757] font-semibold text-sm w-full rounded-[10px]'
    />
  )
}

export default Textarea
