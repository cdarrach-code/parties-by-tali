import { publicAsset } from '../data/packages'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <img src={publicAsset('images/logo.png?v=2')} alt="Parties by Tali" />
      <p className="footer-copy">© {year} Parties by Tali. All rights reserved.</p>
    </footer>
  )
}
