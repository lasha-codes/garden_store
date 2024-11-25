'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

import { FaUsers } from 'react-icons/fa'
import { CiGrid41 } from 'react-icons/ci'
import { HiOutlineTicket } from 'react-icons/hi'
import AnalyticsCard from './analytics_card'

const Analytics = () => {
  const { users } = useSelector((state: RootState) => state.users)
  const { products } = useSelector((state: RootState) => state.products)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-5'>
      <AnalyticsCard
        title='პროდუქცია'
        Icon={CiGrid41}
        count={products.length}
      />
      <AnalyticsCard
        title='მომხმარებლები'
        Icon={FaUsers}
        count={users.length}
      />
    </div>
  )
}

export default Analytics