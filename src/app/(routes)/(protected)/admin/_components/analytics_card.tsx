import { IconType } from 'react-icons/lib'

type CardPropsType = {
  Icon: IconType
  title: string
  count: number
}

const AnalyticsCard = ({ Icon, title, count }: CardPropsType) => {
  return (
    <div className='bg-[#111111] rounded-[10px] flex items-center p-5 w-full h-[180px] justify-between'>
      <div className='flex flex-col items-start gap-1'>
        <h4 className='text-2xl text-main font-semibold'>{count}</h4>
        <span className='text-white/80 text-[15px]'>{title}</span>
      </div>
      <div className='bg-[#171717] p-7 rounded-full'>
        {<Icon className='text-[#555555] text-3xl' />}
      </div>
    </div>
  )
}

export default AnalyticsCard
