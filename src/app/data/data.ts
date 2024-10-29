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
    eng_title: 'News',
    geo_title: 'სიახლეები',
    path: '/news',
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
  geo_line: 'ინტერირის მცენარეები',
  eng_title: 'THE SHOP FOR THE URBAN GARDENS',
  geo_title: 'მაღაზია ბაღის მცენარეებისთვის',
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
      eng_title: 'Learn More',
      geo_title: 'გაიგეთ მეტი',
      path: '/news',
    },
  ],
}
