// Cloudflare Pages Function: POST /api/enquiry
// Emails each enquiry to you via Resend (https://resend.com).
//
// Set these in Cloudflare → Workers & Pages → (your Pages project) → Settings → Variables and secrets:
//   RESEND_API_KEY  (secret)  your Resend API key
//   ENQUIRY_TO                where enquiries go, e.g. hello@onlinedisposablecamera.co.uk
//   ENQUIRY_FROM              a sender on your verified Resend domain,
//                             e.g. Online Disposable Camera <enquiries@onlinedisposablecamera.co.uk>

const LIMITS = {
  name: 120,
  email: 200,
  eventDate: 20,
  eventType: 60,
  guests: 40,
  theme: 60,
  message: 4000,
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function clean(value, max) {
  return String(value ?? '').trim().slice(0, max)
}

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'That request could not be read.' }, 400)
  }

  // Honeypot filled in: pretend it worked so bots move on.
  if (body?.website) return json({ ok: true })

  const enquiry = {}
  for (const [key, max] of Object.entries(LIMITS)) enquiry[key] = clean(body?.[key], max)

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)
  if (!enquiry.name || !emailLooksValid || !enquiry.message) {
    return json({ ok: false, error: 'Please add your name, a valid email address and a message.' }, 400)
  }

  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO || !env.ENQUIRY_FROM) {
    console.error('Enquiry email is not configured: missing RESEND_API_KEY, ENQUIRY_TO or ENQUIRY_FROM')
    return json({ ok: false, error: 'Enquiries are not switched on yet.' }, 500)
  }

  const text = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Event type: ${enquiry.eventType || '-'}`,
    `Event date: ${enquiry.eventDate || '-'}`,
    `Guests: ${enquiry.guests || '-'}`,
    `Theme: ${enquiry.theme || '-'}`,
    '',
    enquiry.message,
  ].join('\n')

  const subjectName = enquiry.name.replace(/[\r\n]+/g, ' ')
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: [env.ENQUIRY_TO],
      reply_to: enquiry.email,
      subject: `New enquiry: ${enquiry.eventType || 'Event'} – ${subjectName}`,
      text,
    }),
  })

  if (!response.ok) {
    console.error('Resend error', response.status, await response.text())
    return json({ ok: false, error: 'Your enquiry could not be sent just now.' }, 502)
  }

  return json({ ok: true })
}
