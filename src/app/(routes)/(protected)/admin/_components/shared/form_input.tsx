import { FaYoutube } from 'react-icons/fa'
import { TbCurrencyLari } from 'react-icons/tb'
import { uploadFile } from '../../_utils/utils'
import Image from 'next/image'
import { IoIosClose } from 'react-icons/io'

type InputProps = {
  value: string | number
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  placeholder: string
  type: string
  images?: string[]
  setImages?: React.Dispatch<React.SetStateAction<string[]>>
}

const Input = ({
  value,
  setValue,
  placeholder,
  type,
  images,
  setImages,
}: InputProps) => {
  if (type === 'upload') {
    return (
      <div className='w-full flex flex-col items-start gap-3 bg-transparent rounded-[10px]'>
        <div className='w-full flex items-center h-[60px]'>
          <div className='w-[210px] h-full p-1.5 text-sm font-semibold'>
            <label
              htmlFor='upload'
              className='h-full w-full flex items-center cursor-pointer justify-center bg-main hover:bg-main/90 transition-all duration-200 ease-linear rounded-[10px] text-white'
            >
              ატვირთვა
            </label>
            <input
              onChange={(e) =>
                uploadFile(
                  e,
                  null,
                  setImages as React.Dispatch<React.SetStateAction<string[]>>
                )
              }
              id='upload'
              type='file'
              className='absolute pointer-events-none opacity-0 h-0 w-0 invisible'
            />
          </div>
        </div>
        <div
          className={`w-full h-fit p-3 justify-center rounded-[10px] flex items-center flex-wrap gap-3 bg-[#111111] ${
            images!.length < 1 && 'hidden'
          }`}
        >
          {images &&
            images.length > 0 &&
            images.map((src, idx) => {
              return (
                <div
                  key={idx}
                  className='h-[100px] w-[120px] rounded-[10px] overflow-hidden border flex relative items-center justify-center p-1'
                >
                  <Image
                    src={src}
                    alt='product image'
                    width={120}
                    height={100}
                    className='object-contain rounded-[5px]'
                  />
                  <button
                    onClick={() => {
                      const filteredImages = [...images].filter((path) => {
                        return path !== src
                      })
                      setImages!(filteredImages)
                    }}
                    type='button'
                    className='p-1 rounded-[5px] bg-[#1D1D1D] absolute z-[10] right-2 top-2 cursor-pointer text-white'
                  >
                    <IoIosClose />
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    )
  } else if (type === 'pdf') {
    return (
      <div className='w-full flex flex-col items-start gap-3 bg-[#111111] rounded-[10px]'>
        <div className='w-full flex items-center h-[60px]'>
          <div className='w-[210px] h-full p-1.5 text-sm font-semibold'>
            <label
              htmlFor='pdf'
              className='h-full w-full flex items-center cursor-pointer justify-center bg-main hover:bg-main/90 transition-all duration-200 ease-linear rounded-[10px] text-white'
            >
              PDF ატვირთვა
            </label>
            <input
              id='pdf'
              type='file'
              onChange={(e) =>
                uploadFile(
                  e,
                  setValue as React.Dispatch<React.SetStateAction<string>>,
                  null
                )
              }
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
  } else if (placeholder === 'ფერი ( NR )') {
    return (
      <div
        className='w-full flex items-center rounded-[10px] h-[52px] pr-3 bg-[#111111] rounded-
      [10px]'
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // @ts-ignore
            setValue(e.target.value)
          }}
          className='w-full bg-transparent text-[#575757] placeholder:text-[#575757] py-4 px-6 rounded-[10px] outline-none text-sm font-semibold'
        />
        <div
          className='h-[15px] w-[15px] rounded-[10px]'
          style={{
            background: value,
          }}
        />
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
