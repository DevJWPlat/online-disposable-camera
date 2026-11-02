export const navItems = [
  ['Themes', '#themes'],
  ['Custom themes', '#custom'],
  ['How it works', '#how-it-works'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
]

export const themeCards = [
  { name: 'Classic Editorial', note: 'Clean typography, timeless layouts and a polished editorial feel.' },
  { name: 'Soft Film', note: 'Warm tones, tactile textures and a relaxed analogue-inspired look.' },
  { name: 'After Dark', note: 'Flash photography, bold contrast and a late-night party atmosphere.' },
]

export const guestTiers = [
  { guests: '25', label: 'Up to 25 guests', price: '£14.99' },
  { guests: '50', label: 'Up to 50 guests', price: '£24.99' },
  { guests: '100', label: 'Up to 100 guests', price: '£39.99' },
  { guests: '175', label: 'Up to 175 guests', price: '£54.99' },
  { guests: '250', label: 'Up to 250 guests', price: '£69.99' },
  { guests: '251+', label: '251+ guests', price: 'Contact for pricing' },
]

export const included = [
  ['fa-solid fa-camera-retro', '25 photos per guest', 'A simple disposable-camera limit that keeps every shot intentional.'],
  ['fa-solid fa-mobile-screen-button', 'No app download', 'Guests open a link or scan a QR code and start shooting in their browser.'],
  ['fa-solid fa-bolt', 'Flash support', 'Rear-camera torch where supported, with a bright screen-flash fallback for selfies.'],
  ['fa-solid fa-images', 'Private gallery', 'Photos stay out of sight until the gallery opens at the time you choose.'],
  ['fa-solid fa-file-zipper', 'One ZIP download', 'Download the whole event in one go, including on iPhone.'],
  ['fa-solid fa-user-lock', 'Private admin', 'Your own login for viewing photos, participants and event stats.'],
]

export const faqs = [
  ['Do guests need to download an app?', 'No. Guests scan your QR code or open your link, and the camera opens straight in their normal browser. Nothing to install and no account to create.'],
  ['Does it work on iPhone and Android?', 'Yes. It’s built for modern iPhones and Android phones, including the flash on the back camera where the phone supports it.'],
  ['How many photos can each guest take?', '25 as standard, just like a real disposable camera. If you’d like more or fewer, just ask and I’ll set it up for your event.'],
  ['When can we see the photos?', 'Whenever you choose. Most couples pick the morning after, so the photos stay a surprise until then.'],
  ['Who can see the photos?', 'Only you. Photos stay hidden until your gallery opens, and only your private login can see them. If you want, you can switch on a secret guest gallery link, and switch it off again at any time.'],
  ['What if the venue has poor signal?', 'Photos upload as they’re taken, so guests need mobile signal or the venue Wi-Fi. If a photo doesn’t send, it isn’t taken off their roll, so they can simply try again.'],
  ['Can we download all the photos?', 'Yes. Select as many as you like, or all of them, and download them as one ZIP file. It works on iPhone too.'],
  ['How long are the photos kept?', 'Your gallery stays online for three months after the event. You can download everything at any time, and if you need longer, just ask.'],
  ['Can the design match our wedding or event?', 'Yes. Pick a ready-made theme and add your names, date and photos, or go fully custom with a design built around your invitations, colours or theme.'],
  ['Do we get our own link?', 'Yes. Every event gets its own link, like your-event.onlinedisposablecamera.co.uk, plus a QR code to print. A custom domain can be arranged too.'],
  ['How far in advance should we book?', 'Ready-made themes are ready in minutes: create your event, try the camera, then go live. For a fully custom design, get in touch at least four weeks before your event.'],
  ['How do we pay?', 'Online by card, Apple Pay or Google Pay, when you’re ready to go live. You can set everything up and try the camera with 5 test photos first. Pay once per event, with nothing to renew.'],
  ['What’s the yearly pass?', 'For anyone planning lots of events, like venues and planners. It’s £149 a year for unlimited events of up to 100 guests each, and bigger events just pay the difference. It renews yearly and you can cancel any time.'],
  ['Is it just for weddings?', 'Not at all. Hen dos, birthdays, anniversaries, parties and work events all work brilliantly, each with its own look.'],
]

// The customer app: sign in, create an event, try it and pay.
export const appUrl = 'https://app.onlinedisposablecamera.co.uk'
export const startUrl = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return `${appUrl}/events/new${query ? `?${query}` : ''}`
}

export const contactEmail = 'hello@onlinedisposablecamera.co.uk'

// Add your profile URLs here and the icons appear in the footer. Leave blank to hide.
export const socialLinks = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: '' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: '' },
]

// Real quotes from real customers, used with their permission. Use their own words.
// The "Kind words" section stays hidden until there are at least two here.
// Example:
//   { quote: 'Our guests loved it and we got hundreds of photos we never would have seen.', name: 'Caz & Dan', event: 'Wedding', date: 'October 2026' },
export const testimonials = [
]

// Optional: your Google Business Profile review link. Leave blank to hide the button.
export const googleReviewsUrl = ''
