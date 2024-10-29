type NavigationType = {
  eng_title: string
  geo_title: string
  path: string
}

export const navigation: NavigationType[] = [
  {
    eng_title: 'Explore',
    geo_title: 'დათვალიერება',
    path: '/explore',
  },
  {
    eng_title: 'About',
    geo_title: 'ჩვენს შესახებ',
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
