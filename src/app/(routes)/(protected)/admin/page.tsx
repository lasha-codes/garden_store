import Analytics from './_components/analytics'
import NewProducts from './_components/new_products'

const AdminPage = () => {
  return (
    <main className='w-full flex flex-col items-start gap-10'>
      <Analytics />
      <NewProducts />
    </main>
  )
}

export default AdminPage
