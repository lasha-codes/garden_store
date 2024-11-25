'use client'
import calendar from '../icons/calendar.png'
import expand from '../icons/expand.png'
import exit from '../icons/exit.png'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Header = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [currentDate, setCurrentDate] = useState<string>('')
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)
  let fullScreen: boolean = isFullScreen

  const georgianMonths = [
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

  useEffect(() => {
    if (!isClient) {
      return setIsClient(true)
    }
    const timeInterval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const today = new Date()
    const day = today.getDate()
    const year = today.getFullYear()
    const month = georgianMonths[today.getMonth()]

    const formattedDate = `${day} ${month} ${year}`

    setCurrentDate(formattedDate)

    return () => clearInterval(timeInterval)
  }, [isClient])

  useEffect(() => {
    const toggleFullScreen = () => {
      fullScreen = !!document.fullscreenElement
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', toggleFullScreen)

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullScreen)
  }, [])

  const formatCurrentTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  const handleExpand = () => {
    fullScreen = !fullScreen
    setIsFullScreen(fullScreen)
    if (fullScreen) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header className='w-full py-6 bg-[#111111] flex px-5 items-center justify-between'>
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-3.5'>
          <Image src={calendar} width={26} alt='icon' />
          <span className='text-[#585858] font-semibold text-sm'>
            {currentDate}
          </span>
        </div>
        <span className='text-sm font-semibold text-[#383838] flex items-center'>
          {isClient && formatCurrentTime(time)}
        </span>
      </div>

      <div className='flex items-center gap-6'>
        <button onClick={handleExpand} className='w-[23px] cursor-pointer'>
          <Image
            src={expand}
            className='w-full h-full object-contain'
            alt='expand'
          />
        </button>
        <button className='w-[23px] cursor-pointer'>
          <Image
            src={exit}
            className='w-full h-full object-contain'
            alt='exit'
          />
        </button>
      </div>
    </header>
  )
}

export default Header
