'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { FaUsers } from 'react-icons/fa'
import { CiGrid41 } from 'react-icons/ci'
import AnalyticsCard from './analytics_card'
import { HiOutlineTicket } from 'react-icons/hi'

const Analytics = () => {
  const { users } = useSelector((state: RootState) => state.users)
  const { products } = useSelector((state: RootState) => state.products)
  const { paidPayments } = useSelector((state: RootState) => state.payments)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-5'>
      <AnalyticsCard title='პროდუქტი' Icon={CiGrid41} count={products.length} />
      <AnalyticsCard
        title='მომხმარებლები'
        Icon={FaUsers}
        count={users.length}
      />
      <AnalyticsCard
        title='წარმატებული გადახდები'
        Icon={HiOutlineTicket}
        count={paidPayments.length}
      />
    </div>
  )
}

export default Analytics
