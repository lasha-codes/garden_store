import Form from '../../../../_components/shared/product_form'

const Update = () => {
  return (
    <main className='w-full flex flex-col items-start gap-5'>
      <h2 className='text-xl text-white'>პროდუქტის განახლება</h2>
      <Form type='update' />
    </main>
  )
}

export default Update
