import { reactive } from 'vue'

// Shared enquiry form state, so the theme cards and pricing calculator
// can pre-fill the contact form before scrolling down to it.
export const enquiry = reactive({
  name: '',
  email: '',
  eventDate: '',
  eventType: 'Wedding',
  guests: 'Not sure yet',
  theme: 'Not sure yet',
  message: '',
  website: '', // honeypot: real people never see or fill this in
})

export const eventTypes = ['Wedding', 'Hen do', 'Birthday', 'Party', 'Corporate event', 'Something else']

export const guestOptions = [
  'Not sure yet',
  'Up to 25 guests',
  'Up to 50 guests',
  'Up to 100 guests',
  'Up to 175 guests',
  'Up to 250 guests',
  '251+ guests',
]

export const themeOptions = ['Not sure yet', 'Classic Editorial', 'Soft Film', 'After Dark', 'Fully custom']

export function startEnquiry(fields = {}) {
  Object.assign(enquiry, fields)
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
