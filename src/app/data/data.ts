import plant from './assets/plant.png'
import plant_stand from './assets/plant_stand.png'
import outdoor_pot from './assets/outdoor_pot.png'
import table_plant from './assets/table_plant.png'
import premium_quality from './assets/premium_quality.png'
import user_friendly from './assets/user_friendly.webp'
import most_used_tools from './assets/most_used_tools.webp'
import { FaViber, FaWhatsapp, FaFacebook } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

type NavigationType = {
  eng_title: string
  geo_title: string
  path: string
}

export const navigation: NavigationType[] = [
  {
    eng_title: 'Home',
    geo_title: 'მთავარი',
    path: '/',
  },
  {
    eng_title: 'About',
    geo_title: 'შესახებ',
    path: '/about',
  },
  {
    eng_title: 'Products',
    geo_title: 'პროდუქცია',
    path: '/products',
  },
  {
    eng_title: 'Contact',
    geo_title: 'კონტაქტი',
    path: '/contact',
  },
]

interface buttonsType {
  eng_title: string
  geo_title: string
  path: string
}

interface mainDataType {
  eng_line: string
  geo_line: string
  eng_title: string
  geo_title: string
  eng_description: string
  geo_description: string
  buttons: buttonsType[]
}

export const mainData: mainDataType = {
  eng_line: 'Interior Gardening',
  geo_line: 'ინტერიორის მცენარეები',
  eng_title: '',
  geo_title: 'ბაღის ხელსაწყოები',
  eng_description:
    'There are many violations of passages of Lorem ipsum available. but the majority have suffered alteration',
  geo_description: 'ქართული აღწერა რომელიც შეიცვლება გვერდის შესაბამისად',
  buttons: [
    {
      eng_title: 'Explore Now',
      geo_title: 'გადახედვა',
      path: '/products',
    },
    {
      eng_title: 'About us',
      geo_title: 'შესახებ',
      path: '/about',
    },
  ],
}

export const sliderData = [
  {
    image: plant_stand,
    eng_title: 'Plant Stands',
    geo_title: 'მცენარის საგდამები',
  },
  {
    image: plant,
    eng_title: 'Plant Families',
    geo_title: 'მცენარის სახეობები',
  },
  {
    image: outdoor_pot,
    eng_title: 'Outdoor Plant Pot',
    geo_title: 'უჯიშო მცენარეების დოქი',
  },
  {
    image: table_plant,
    eng_title: 'Table Plant',
    geo_title: 'მაგიდის მცენარე',
  },
]

export const categories = [
  {
    geo_title: 'ხშირად გამოყენებადი',
    eng_title: 'Most Used',
    geo_description: 'ტელესკოპური სეკატორი',
    eng_description: 'Telescopic blade',
    image: most_used_tools,
  },
  {
    geo_title: 'მაღალი ხარისხი',
    eng_title: 'Premium Quality',
    geo_description: 'ელექტრო ხერხი',
    eng_description: 'Electric saw',
    image: premium_quality,
  },
  {
    geo_title: 'მოსახერხებელი',
    eng_title: 'User-Friendly',
    geo_description: 'ელექრო მაკრატელი',
    eng_description: 'Electric scissor',
    image: user_friendly,
  },
]

type socialsType = {
  icon: IconType
  link: string
  color: string
}

export const socials: socialsType[] = [
  {
    icon: FaViber,
    link: `https://viber.com/596410041`,
    color: '#583FBB',
  },
  {
    icon: FaWhatsapp,
    link: `https://wa.me/${+995577400041}`,
    color: '#25D366',
  },
  {
    icon: FaFacebook,
    link: 'https://www.facebook.com/profile.php?id=61557246690936',
    color: '#0866FF',
  },
]
