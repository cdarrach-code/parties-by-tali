import { useEffect, useRef } from 'react'
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

function PackagePhotos({ name, photos }: { name: string; photos: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const looping = photos.length > 1
  const loopedPhotos = looping
    ? [photos[photos.length - 1], ...photos, photos[0]]
    : photos

  function scrollByPhoto(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollBy({
      left: direction * scroller.clientWidth,
      behavior: 'smooth',
    })
  }

  function jumpIfOnClone() {
    const scroller = scrollerRef.current
    if (!scroller || !looping) return
    const width = scroller.clientWidth
    if (width <= 0) return
    const index = Math.round(scroller.scrollLeft / width)
    const lastClone = photos.length + 1
    if (index <= 0) {
      scroller.scrollTo({ left: photos.length * width, behavior: 'auto' })
    } else if (index >= lastClone) {
      scroller.scrollTo({ left: width, behavior: 'auto' })
    }
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !looping) return
    let ready = false

    const startAtFirst = () => {
      const width = scroller.clientWidth
      if (ready || width <= 0 || scroller.scrollWidth < width * 2) return
      ready = true
      scroller.scrollTo({ left: width, behavior: 'auto' })
    }

    startAtFirst()
    const frame = window.requestAnimationFrame(startAtFirst)
    const observer = new ResizeObserver(startAtFirst)
    observer.observe(scroller)

    const onEnd = () => jumpIfOnClone()
    scroller.addEventListener('scrollend', onEnd)
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      scroller.removeEventListener('scrollend', onEnd)
    }
  }, [looping, photos])

  useEffect(() => {
    if (!looping) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      if (pausedRef.current) return
      scrollByPhoto(1)
    }, 4500)
    return () => window.clearInterval(id)
  }, [looping])

  if (!looping) {
    return (
      <div className="package-media">
        <img src={photos[0]} alt={`${name} sleepover setup`} loading="lazy" />
      </div>
    )
  }

  return (
    <div
      className="package-media has-gallery"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      <button
        type="button"
        className="package-carousel-btn is-prev"
        aria-label={`Previous ${name} photo`}
        onClick={() => scrollByPhoto(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <div
        ref={scrollerRef}
        className="package-photo-scroller"
        tabIndex={0}
        aria-label={`${name} photos`}
        onFocus={() => {
          pausedRef.current = true
        }}
        onBlur={() => {
          pausedRef.current = false
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollByPhoto(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollByPhoto(-1)
          }
        }}
      >
        {loopedPhotos.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={
              index === 1
                ? `${name} sleepover setup`
                : `${name} details`
            }
            loading="eager"
          />
        ))}
      </div>
      <button
        type="button"
        className="package-carousel-btn is-next"
        aria-label={`Next ${name} photo`}
        onClick={() => scrollByPhoto(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  )
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
                <PackagePhotos
                  name={pkg.name}
                  photos={[pkg.image, ...(pkg.photos ?? [])]}
                />
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
