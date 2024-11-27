import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata: Metadata = {
  metadataBase: new URL(`${baseUrl}`),
  keywords: ['ბაღის ხელსაწყოწები', 'საბაღე ინსტრუმენტები'],
  title: {
    default: 'Ingarden',
    template: '%s | Ingarden',
  },
  openGraph: {
    description: 'აქ შეგიძლია შეიძინო საბაღე ინსტრუმენტები, ხელსაწყოები.',
    images: [''],
  },
}

const ServerWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default ServerWrapper
