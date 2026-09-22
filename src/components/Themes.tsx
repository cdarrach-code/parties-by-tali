import { useRef } from 'react'
import { packages } from '../data/packages'

export function Themes() {
  const scrollerRef = useRef<HTMLUListElement>(null)

  function scrollByTile(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const tile = scroller.querySelector<HTMLElement>('.theme-tile')
    const gap = 16
    const amount = (tile?.offsetWidth ?? 280) + gap
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section className="section themes" id="themes" aria-labelledby="themes-title">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Choose your vibe</p>
          <h2 id="themes-title">Dreamy sleepover themes</h2>
          <p className="section-sub">
            Celebrate birthdays, family gatherings, friendships, and special
            holidays with unforgettable moments and joyful memories.
          </p>
        </header>

        <div className="theme-carousel">
          <button
            type="button"
            className="theme-carousel-btn is-prev"
            aria-label="Previous themes"
            onClick={() => scrollByTile(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>

          <ul
            ref={scrollerRef}
            className="theme-mosaic"
            aria-label="Sleepover themes"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                scrollByTile(1)
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                scrollByTile(-1)
              }
            }}
          >
            {packages.map((pkg, index) => (
              <li
                key={pkg.id}
                className={`theme-tile accent-${pkg.accent}`}
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <a href={`#package-${pkg.id}`}>
                  <div className="theme-tile-media">
                    <img src={pkg.image} alt="" loading="lazy" />
                  </div>
                  <div className="theme-tile-copy">
                    <h3>{pkg.name}</h3>
                    <p>{pkg.tagline}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="theme-carousel-btn is-next"
            aria-label="Next themes"
            onClick={() => scrollByTile(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
