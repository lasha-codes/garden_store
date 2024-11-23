import ContactForm from './_components/form'
import PhoneSVG from './_components/phone'
import Socials from './_components/socials'

const Contact = () => {
  return (
    <main className='h-[90vh] w-full flex flex-col items-center mt-20 gap-5 xl:gap-20 xl:justify-center lg:m-0 lg:flex-row lg:justify-between lg:gap-0'>
      <Socials />
      <ContactForm />
      <PhoneSVG />
    </main>
  )
}

export default Contact
