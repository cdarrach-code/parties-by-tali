import {
  PRICING,
  INCLUSION_ROWS,
  formatPrice,
  getStripeLink,
  packages,
  type PackageId,
} from '../data/packages'

type PackagesProps = {
  onRequestBooking: (themeId: PackageId) => void
}

export function Packages({ onRequestBooking }: PackagesProps) {
  return (
    <section
      className="section packages"
      id="packages"
      aria-labelledby="packages-title"
    >
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">{PRICING.label}</p>
          <h2 id="packages-title">Book your themed sleepover</h2>
          <p className="section-sub">
            Starting at {formatPrice(PRICING.basePrice)}. Includes{' '}
            {PRICING.baseTents} tents. {formatPrice(PRICING.additionalPersonPrice)}{' '}
            per additional guest (up to {PRICING.maxGuests}). Share your guest
            count when booking so we can create the perfect sleepover experience.
          </p>
        </header>

        <div className="pricing-banner" aria-label="Grand opening pricing">
          <p className="pricing-banner-price">
            <span>{formatPrice(PRICING.basePrice)}</span>
            <small>
              includes {PRICING.baseTents} tents
            </small>
          </p>
          <p className="pricing-banner-extra">
            {formatPrice(PRICING.additionalPersonPrice)} per additional guest
            <span>up to {PRICING.maxGuests} guests</span>
          </p>
        </div>

        <div
          className="inclusion-rows"
          role="group"
          aria-label="What every package includes"
        >
          {INCLUSION_ROWS.map((row) => (
            <ul key={row.join('-')} className="inclusion-strip">
              {row.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>

        <div className="package-grid">
          {packages.map((pkg) => {
            const stripe = getStripeLink(pkg.stripeEnvKey)

            return (
              <article
                key={pkg.id}
                className={`package-panel accent-${pkg.accent}`}
                id={`package-${pkg.id}`}
              >
                <div className="package-media">
                  <img src={pkg.image} alt={`${pkg.name} sleepover setup`} loading="lazy" />
                </div>
                <div className="package-body">
                  <p className="package-tagline">{pkg.tagline}</p>
                  <h3>{pkg.name}</h3>
                  <div className="package-copy">
                    <p className="package-desc">{pkg.description}</p>
                    {pkg.aiGeneratedBackground ? (
                      <p className="ai-bg-note">
                        Some backgrounds have been AI generated.
                      </p>
                    ) : null}
                  </div>
                  <p className="package-price">
                    <span>From {formatPrice(PRICING.basePrice)}</span>
                    <small>
                      Includes {PRICING.baseTents} tents ·{' '}
                      {formatPrice(PRICING.additionalPersonPrice)} per additional
                      guest
                    </small>
                  </p>
                  {stripe ? (
                    <a
                      className="btn"
                      href={stripe}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book & pay
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => onRequestBooking(pkg.id)}
                    >
                      Request booking
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
