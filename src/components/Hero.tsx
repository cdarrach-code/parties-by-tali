import { publicAsset } from '../data/packages'

type HeroProps = {
  onBookParty: () => void
}

export function Hero({ onBookParty }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner">
        <img
          className="hero-logo"
          src={publicAsset('images/logo.png?v=2')}
          alt=""
        />
        <h1 id="hero-brand" className="hero-brand visually-hidden">
          Parties by Tali
        </h1>
        <p className="hero-lead">
          Themed sleepover tent experiences that turn ordinary spaces into
          extraordinary celebrations.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn" onClick={onBookParty}>
            Book a party
          </button>
          <a className="btn btn-ghost" href="#themes">
            Explore themes
          </a>
        </div>
      </div>
    </section>
  )
}
