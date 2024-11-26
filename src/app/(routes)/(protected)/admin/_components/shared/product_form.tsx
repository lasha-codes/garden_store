'use client'
import { Product } from '@/types/globalTypes'
import { useState } from 'react'
import Input from './form_input'
import Textarea from './form_textarea'

type FormProps = {
  type: 'update' | 'add'
}

const Form = ({ type }: FormProps) => {
  const [geoTitle, setGeoTitle] = useState<string>('')
  const [engTitle, setEngTitle] = useState<string>('')
  const [geoDescription, setGeoDescription] = useState<string>('')
  const [engDescription, setEngDescription] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [qty, setQty] = useState<number>(0)
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [material, setMaterial] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [pdf, setPdf] = useState<string>('')
  const [youtubeLink, setYoutubeLink] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  return (
    <form className='w-full flex flex-col items-start gap-3'>
      <div className='w-full flex items-center gap-3'>
        <Input
          type='text'
          placeholder='პროდუქტის სახელი (ქარ)'
          value={geoTitle}
          setValue={setGeoTitle}
        />
        <Input
          type='text'
          placeholder='პროდუქტის სახელი (ENG)'
          value={engTitle}
          setValue={setEngTitle}
        />
      </div>
      <div className='flex  items-start w-full gap-3 max-md:flex-col'>
        <Textarea
          value={geoDescription}
          setValue={setGeoDescription}
          placeholder='პროდუქტის აღწერა (ქარ)'
        />
        <Textarea
          value={engDescription}
          setValue={setEngDescription}
          placeholder='პროდუქტის აღწერა (ENG)'
        />
      </div>
      <div className='w-full flex flex-col items-start gap-3'>
        <Input
          type='upload'
          placeholder='სურათის ლინკი'
          value={image}
          setValue={setImage}
        />
        <Input
          type='pdf'
          placeholder='PDF ლინკი ( NR )'
          value={pdf}
          setValue={setPdf}
        />
        <Input
          type='youtube'
          placeholder='YOUTUBE ვიდეო ( NR )'
          value={youtubeLink}
          setValue={setYoutubeLink}
        />
      </div>
      <div className='grid grid-cols-4 gap-3 w-full max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
        <Input
          type='text'
          placeholder='ფერი ( NR )'
          value={color}
          setValue={setColor}
        />

        <Input
          type='text'
          placeholder='ბრენდი ( NR )'
          value={brand}
          setValue={setBrand}
        />
        <Input
          type='text'
          placeholder='მოდელი ( NR )'
          value={model}
          setValue={setModel}
        />
        <Input
          type='text'
          placeholder='ზომა ( NR )'
          value={size}
          setValue={setSize}
        />
        <Input
          type='text'
          placeholder='მატერიალი ( NR )'
          value={material}
          setValue={setMaterial}
        />
        <Input
          type='text'
          placeholder='წონა ( NR )'
          value={weight}
          setValue={setWeight}
        />
        <Input
          type='number'
          placeholder='მარაგი'
          value={qty}
          setValue={setQty}
        />
        <Input
          type='string'
          placeholder='ფასი'
          value={price}
          setValue={setPrice}
        />
      </div>
      <button className='w-fit bg-main text-sm px-10 hover:bg-main/90 transition-all duration-200 ease-linear mt-5 py-3 text-white font-semibold rounded-[10px]'>
        {type === 'update' ? 'განახლება' : 'დამატება'}
      </button>
    </form>
  )
}

export default Form
