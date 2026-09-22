import { useState } from 'react'
import { BookingForm } from './components/BookingForm'
import { Celebrate } from './components/Celebrate'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Packages } from './components/Packages'
import { ThankYou } from './components/ThankYou'
import { Themes } from './components/Themes'
import type { PackageId } from './data/packages'
import './App.css'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingThemeId, setBookingThemeId] = useState<PackageId | ''>('')

  const openBooking = (themeId: PackageId | '' = '') => {
    setBookingThemeId(themeId)
    setBookingOpen(true)
  }

  return (
    <>
      <Header onBookParty={() => openBooking()} />
      <main>
        <Hero onBookParty={() => openBooking()} />
        <Intro />
        <Themes />
        <Packages onRequestBooking={openBooking} />
        <Celebrate />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ThankYou />
      <BookingForm
        open={bookingOpen}
        themeId={bookingThemeId}
        onClose={() => setBookingOpen(false)}
      />
    </>
  )
}
