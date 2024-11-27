import { GrHomeRounded } from 'react-icons/gr'
import { CiGrid41 } from 'react-icons/ci'
import { TbTicket } from 'react-icons/tb'

export const navigation = [
  {
    icon: GrHomeRounded,
    name: 'სამართავი პანელი',
    href: '/admin',
    size: '20px',
  },
  {
    icon: CiGrid41,
    name: 'პროდუქცია',
    href: '/admin/products',
  },
  {
    icon: TbTicket,
    name: 'გადახდები',
    href: '/admin/payments',
  },
]

export const months = [
  'იანვარი',
  'თებერვალი',
  'მარტი',
  'აპრილი',
  'მაისი',
  'ივნისი',
  'ივლისი',
  'აგვისტო',
  'სექტემბერი',
  'ოქტომბერი',
  'ნოემბერი',
  'დეკემბერი',
]
