import { packages } from '../data/packages'

export function Themes() {
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

        <ul className="theme-mosaic">
          {packages.map((pkg, index) => (
            <li
              key={pkg.id}
              className={`theme-tile accent-${pkg.accent}`}
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <a href={`#package-${pkg.id}`}>
                <div className="theme-tile-media">
                  <img src={pkg.image} alt="" loading="lazy" />
                  {pkg.comingSoon && (
                    <span className="coming-soon-banner">Coming Soon</span>
                  )}
                </div>
                <div className="theme-tile-copy">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.tagline}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
