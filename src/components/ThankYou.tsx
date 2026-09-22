import { useEffect, useState } from 'react'

export function ThankYou() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => setVisible(window.location.hash === '#booked')
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  if (!visible) return null

  return (
    <div className="thank-you" id="booked" role="status">
      <div className="thank-you-inner">
        <h2>You&apos;re booked, almost!</h2>
        <p>
          Thanks for your payment. We&apos;ll reach out shortly to confirm your
          date, guest count, and setup details.
        </p>
        <a className="btn btn-sm" href="#top" onClick={() => setVisible(false)}>
          Back to top
        </a>
      </div>
    </div>
  )
}
