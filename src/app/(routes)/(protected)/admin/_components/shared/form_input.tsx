import { FaYoutube } from 'react-icons/fa'
import { TbCurrencyLari } from 'react-icons/tb'

type InputProps = {
  value: string | number
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  placeholder: string
  type: string
  images?: string[]
}

const Input = ({ value, setValue, placeholder, type, images }: InputProps) => {
  if (type === 'upload') {
    return (
      <div className='w-full flex flex-col items-start gap-3 bg-[#111111] rounded-[10px]'>
        <div className='w-full flex items-center h-[60px]'>
          <div className='w-[210px] h-full p-1.5 text-sm font-semibold'>
            <label
              htmlFor='upload'
              className='h-full w-full flex items-center cursor-pointer justify-center bg-main hover:bg-main/90 transition-all duration-200 ease-linear rounded-[10px] text-white'
            >
              ატვირთვა
            </label>
            <input
              id='upload'
              type='file'
              className='absolute pointer-events-none opacity-0 h-0 w-0 invisible'
            />
          </div>

          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // @ts-ignore
              setValue(e.target.value)
            }}
            className='w-full bg-transparent text-[#575757] placeholder:text-[#575757] py-4 px-3 rounded-[10px] h-full outline-none text-sm font-semibold'
          />
        </div>
      </div>
    )
  } else if (type === 'pdf') {
    return (
      <div className='w-full flex flex-col items-start gap-3 bg-[#111111] rounded-[10px]'>
        <div className='w-full flex items-center h-[60px]'>
          <div className='w-[210px] h-full p-1.5 text-sm font-semibold'>
            <label
              htmlFor='upload'
              className='h-full w-full flex items-center cursor-pointer justify-center bg-main hover:bg-main/90 transition-all duration-200 ease-linear rounded-[10px] text-white'
            >
              PDF ატვირთვა
            </label>
            <input
              id='upload'
              type='file'
              className='absolute pointer-events-none opacity-0 h-0 w-0 invisible'
            />
          </div>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // @ts-ignore
              setValue(e.target.value)
            }}
            className='w-full bg-transparent text-[#575757] placeholder:text-[#575757] py-4 px-3 rounded-[10px] h-full outline-none text-sm font-semibold'
          />
        </div>
      </div>
    )
  } else if (type === 'youtube') {
    return (
      <div className='w-full flex flex-col items-start gap-3 bg-[#111111] rounded-[10px]'>
        <div className='w-full flex items-center h-[60px]'>
          <div className='w-[52px] h-full p-3 text-sm font-semibold'>
            <div className='w-full h-full flex items-center justify-center'>
              <FaYoutube className='text-[#FF0033] text-3xl' />
            </div>
          </div>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // @ts-ignore
              setValue(e.target.value)
            }}
            className='w-full bg-transparent text-[#575757] placeholder:text-[#575757] py-4 px-3 rounded-[10px] h-full outline-none text-sm font-semibold'
          />
        </div>
      </div>
    )
  } else if (placeholder === 'ფასი') {
    return (
      <div className='w-full flex items-center h-[52px] pr-3 bg-[#111111] rounded-[10px]'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!Number.isInteger(Number(e.target.value))) {
              return
            }
            // @ts-ignore
            setValue(e.target.value)
          }}
          className='w-full bg-transparent text-[#575757] placeholder:text-[#575757] py-4 px-6 rounded-[10px] outline-none text-sm font-semibold'
        />

        <TbCurrencyLari className='text-[#575757] text-xl' />
      </div>
    )
  } else {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (value === 'number') {
            // @ts-ignore
            setValue(Number(e.target.value))
          } else {
            // @ts-ignore
            setValue(e.target.value)
          }
        }}
        className='w-full bg-[#111111] text-[#575757] placeholder:text-[#575757] py-4 px-6 rounded-[10px] outline-none text-sm font-semibold'
      />
    )
  }
}

export default Input
