'use client'
import { Product } from '@/types/globalTypes'
import { useState } from 'react'
import Input from './form_input'

type FormProps = {
  product?: Product
  type: 'update' | 'add'
}

const Form = ({ product, type }: FormProps) => {
  const [geoTitle, setGeoTitle] = useState<string>('')

  return (
    <form className='w-full flex flex-col items-start gap-3'>
      <div className='w-full flex items-center gap-3'>
        <Input
          type='text'
          placeholder='პროდუქტის სახელი (ქარ)'
          value={geoTitle}
          setValue={setGeoTitle}
        />
      </div>
    </form>
  )
}

export default Form
