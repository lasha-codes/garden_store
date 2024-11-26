'use client'

import { useState, useEffect } from 'react'
import Input from './form_input'
import Textarea from './form_textarea'
import { useParams, useRouter } from 'next/navigation'
import { getProductById, updateProduct } from '../../_utils/utils'
import { Product } from '@/types/globalTypes'

type FormProps = {
  type: 'update' | 'add'
}

const Form = ({ type }: FormProps) => {
  const params = useParams()
  const router = useRouter()
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
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (type === 'update' && params?.id) {
      getProductById(params.id as string).then((product) => {
        if (product) {
          setGeoTitle(product.geo_title)
          setEngTitle(product.eng_title)
          setGeoDescription(product.geo_description)
          setEngDescription(product.eng_description)
          setImages(product.images)
          setColor(product?.color || '')
          setBrand(product?.brand || '')
          setModel(product?.model || '')
          setSize(product?.size || '')
          setMaterial(product?.material || '')
          setWeight(product?.weight || '')
          setQty(product.qty)
          setPrice(product.price.toString())
          setPdf(product.PDF || '')
          setYoutubeLink(product?.youtubeURL || '')
        } else {
          router.replace('/admin/products')
        }
      })
    }
  }, [params])

  return (
    <form
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()
        const product: Product = {
          geo_title: geoTitle,
          eng_title: engTitle,
          eng_description: engDescription,
          geo_description: geoDescription,
          images: images,
          qty: qty,
          price: Number(price),
          currency: 'lari',
        }
        if (pdf) {
          product.PDF = pdf
        }
        if (youtubeLink) {
          product.youtubeURL = youtubeLink
        }
        if (color) {
          product.color = color
        }
        if (brand) {
          product.brand = brand
        }
        if (model) {
          product.model = model
        }
        if (size) {
          product.size = size
        }
        if (material) {
          product.material = material
        }
        if (weight) {
          product.weight = weight
        }
        if (params?.id && type === 'update') {
          // @ts-ignore
          const data: { success: boolean } = await updateProduct(
            product,
            params.id as string
          )
          if (data.success) {
            setGeoDescription('')
            setEngDescription('')
            setGeoTitle('')
            setEngTitle('')
            setImage('')
            setPdf('')
            setYoutubeLink('')
            setColor('')
            setBrand('')
            setModel('')
            setSize('')
            setMaterial('')
            setWeight('')
            setQty(0)
            setPrice('')
            router.push('/admin/products')
          }
        }
      }}
      className='w-full flex flex-col items-start gap-3'
    >
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
          images={images}
          setImages={setImages}
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
