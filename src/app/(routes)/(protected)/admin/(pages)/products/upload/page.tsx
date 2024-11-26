import Form from '../../../_components/shared/product_form'

const Upload = () => {
  return (
    <main className='w-full flex flex-col items-start gap-5'>
      <h2 className='text-xl text-white'>პროდუქტის დამატება</h2>
      <Form type='add' />
    </main>
  )
}

export default Upload
