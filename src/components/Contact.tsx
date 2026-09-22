import { CONTACT } from '../data/packages'

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-inner narrow">
        <p className="eyebrow">Let’s chat</p>
        <h2 id="contact-title">Ready to party?</h2>
        <p className="section-sub">
          We&apos;re open for business. Send us an email.
        </p>
        <div className="contact-actions">
          <a className="btn" href={`mailto:${CONTACT.email}`}>
            Email us
          </a>
        </div>
        <p className="contact-details">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </div>
    </section>
  )
}
