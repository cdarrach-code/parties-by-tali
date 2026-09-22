import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import {
  PRICING,
  type PackageId,
  packages,
} from '../data/packages'

type BookingFormProps = {
  open: boolean
  themeId: PackageId | ''
  onClose: () => void
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const FORM_NAME = 'booking'

const GUEST_COUNTS = Array.from(
  { length: PRICING.maxGuests },
  (_, index) => index + 1,
)

function formatEventDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function todayIsoDate(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function encodeFormBody(data: Record<string, string>): string {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')
}

export function BookingForm({ open, themeId, onClose }: BookingFormProps) {
  const titleId = useId()
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const dateId = useId()
  const guestsId = useId()
  const themeFieldId = useId()
  const nameRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [guests, setGuests] = useState('')
  const [theme, setTheme] = useState(themeId)
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')

  useEffect(() => {
    if (!open) return
    setName('')
    setEmail('')
    setPhone('')
    setEventDate('')
    setGuests('')
    setTheme(themeId)
    setBotField('')
    setStatus('idle')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => nameRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open, themeId])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const themeName =
      packages.find((pkg) => pkg.id === theme)?.name ?? theme

    setStatus('submitting')
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormBody({
          'form-name': FORM_NAME,
          'bot-field': botField,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          eventDate: formatEventDate(eventDate),
          guests,
          theme: themeName,
        }),
      })
      if (!response.ok) throw new Error(`Form submit failed (${response.status})`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="booking-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="booking-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="booking-close"
          aria-label="Close booking form"
          onClick={onClose}
        >
          ×
        </button>
        <p className="eyebrow">Book a party</p>
        <h2 id={titleId}>
          {status === 'success' ? 'Request received' : 'Request your sleepover'}
        </h2>

        {status === 'success' ? (
          <div className="booking-success">
            <p className="booking-lead">
              Thanks! Tali will review your details and follow up by email to
              confirm your date.
            </p>
            <div className="booking-actions">
              <button type="button" className="btn" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="booking-lead">
              Share a few details and Tali will follow up by email to confirm
              your date.
            </p>
            <form
              className="booking-form"
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="booking-honeypot" aria-hidden="true">
                <label>
                  Don’t fill this out
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(event) => setBotField(event.target.value)}
                  />
                </label>
              </p>
              <label htmlFor={nameId}>
                Name
                <input
                  ref={nameRef}
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label htmlFor={emailId}>
                Email address
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label htmlFor={phoneId}>
                Phone number
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>
              <label htmlFor={dateId}>
                Event date
                <input
                  id={dateId}
                  name="eventDate"
                  type="date"
                  required
                  min={todayIsoDate()}
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                />
              </label>
              <label htmlFor={guestsId}>
                Number of guests
                <select
                  id={guestsId}
                  name="guests"
                  required
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                >
                  <option value="" disabled>
                    Select guests
                  </option>
                  {GUEST_COUNTS.map((count) => (
                    <option key={count} value={count}>
                      {count === 1 ? '1 guest' : `${count} guests`}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor={themeFieldId}>
                Theme
                <select
                  id={themeFieldId}
                  name="theme"
                  required
                  value={theme}
                  onChange={(event) =>
                    setTheme(event.target.value as PackageId | '')
                  }
                >
                  <option value="" disabled>
                    Select a theme
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </label>
              {status === 'error' && (
                <p className="booking-error" role="alert">
                  Something went wrong sending your request. Please try again,
                  or email partiesbytali@gmail.com.
                </p>
              )}
              <div className="booking-actions">
                <button
                  type="submit"
                  className="btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send request'}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                  disabled={status === 'submitting'}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
