import { useEffect, useState } from 'react'

const links = [
  { href: '#themes', label: 'Themes' },
  { href: '#packages', label: 'Packages' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

type HeaderProps = {
  onBookParty: () => void
}

export function Header({ onBookParty }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand-mark" href="#top" onClick={() => setOpen(false)}>
        <img src="/images/logo.png?v=2" alt="Parties by Tali" />
      </a>

      <button
        className={`nav-toggle${open ? ' is-open' : ''}`}
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => {
            setOpen(false)
            onBookParty()
          }}
        >
          Book a party
        </button>
      </nav>
    </header>
  )
}
