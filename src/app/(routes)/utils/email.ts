import { toast } from 'sonner'
import axios from 'axios'

export const contactViaEmail = async (
  fullName: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) => {
  try {
    if (!fullName || !email || !phone || !subject || !message) {
      toast.error('გთხოვთ შეავსეთ ყველა ინფუთი *')
      return { success: false }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailsValid = emailRegex.test(email)

    if (!emailsValid) {
      toast.error('შეიყვანეთ ნამდვილი ელფოსტა.')
      return { success: false }
    }

    const { data } = await axios.post('/email/contact', {
      fullName,
      email,
      phone,
      subject,
      message,
    })

    if (data.information) {
      toast.success('ემაილი წარმატებით გაიგზავნა')
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
