import {
  CONTACT,
  INCLUSION_ROWS,
  PRICING,
  formatPrice,
  packages,
} from '../data/packages'

const inclusionList = (() => {
  const items = INCLUSION_ROWS.flat()
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`
})()

const themeList = (() => {
  const names = packages.map((pkg) => pkg.name)
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`
})()

const faqs = [
  {
    question: 'What’s included in a sleepover?',
    answer: `Every package includes ${inclusionList.toLowerCase()}.`,
  },
  {
    question: 'How much does it cost?',
    answer: `Introductory grand opening pricing starts at ${formatPrice(PRICING.basePrice)} and includes ${PRICING.baseTents} tents. Additional guests are ${formatPrice(PRICING.additionalPersonPrice)} each, up to ${PRICING.maxGuests} guests.`,
  },
  {
    question: 'How many guests can I book?',
    answer: `You can book 1 to ${PRICING.maxGuests} guests. Share your guest count when you book so we can create the perfect sleepover setup.`,
  },
  {
    question: 'What themes do you offer?',
    answer: `We currently offer ${themeList}. Each theme includes personalized décor, lighting, and cozy tent styling. If you would like to combine elements from different setups, please let us know and, depending on availability, we will work with you.`,
  },
  {
    question: 'How do I book a party?',
    answer: `Use Book a party or Request booking on the site, or reach us at ${CONTACT.email}. We’ll confirm your date, theme, and guest count.`,
  },
  {
    question: 'Is a deposit required?',
    answer:
      'We require a non-refundable $100 booking fee to secure your date and sleepover party. The remaining payment is due 7 days prior to the event. Bookings cancelled within 48 hours of the event are non-refundable. Changes to guest count and/or setup must be arranged 7 days prior to event.',
  },
  {
    question: 'How does set up and pick up work?',
    answer:
      'We’ll arrive to set up between 9:00 a.m. and 2:00 p.m. on the day of your event. Most setups take 45–90 minutes, while larger events may require up to 2–3 hours. Pickup begins at 10:00 a.m. the following day and typically takes 30–45 minutes. We’ll text you before we arrive, so you’ll know when to expect us. Timelines have some flexibility depending on the party’s start time.',
  },
  {
    question: 'How should I prepare the space for the party?',
    answer:
      'Please clear the party area before we arrive. Each guest setup requires approximately 40 inches of width by 5.5 feet of length. Please make sure there is enough clear floor space for each guest and that the area is clean and ready for setup before we arrive. All setups must be indoors. We do not offer outdoor setups. We ask that there be no children in the space during set up and tear down. There must be an adult, 18+, present for setup and pickup.',
  },
  {
    question: 'Who are the sleepovers for?',
    answer:
      'Parties By Tali specializes in themed sleepovers for children ages 4–12. Please email us if you are looking to book a party for older children.',
  },
  {
    question: 'Where do you service?',
    answer:
      'Parties By Tali is located in Dr. Phillips. We proudly serve Central Florida, including Orlando, Winter Garden, Windermere, Dr. Phillips, and surrounding communities. Travel within 10 miles is included. Locations more than 10 miles away are subject to a travel fee starting at $20, based on distance and travel time. Please contact us to confirm availability and pricing for your location.',
  },
  {
    question: 'How do you clean your inventory?',
    answer:
      'All bedding is laundered after every event. Hard surfaces are thoroughly cleaned and sanitized. Tents, pillows, and décor are steam-cleaned and disinfected.',
  },
  {
    question: 'Equipment Care',
    answer: 'To protect our inventory:',
    bullets: [
      'No shoes are permitted on the setups.',
      'We ask you to please avoid food and beverages that may stain the equipment.',
      'No pets are permitted on rental equipment.',
      'No smoking or vaping is permitted around rental equipment.',
      'Inventory can not be moved to another location once set up is complete.',
    ],
  },
  {
    question: 'What if something unexpected happens during the party?',
    answer:
      'Parties By Tali is not responsible for accidents, injuries, allergic reactions, or other incidents that may occur before, during, or after an event. Any damage to our inventory will be assessed after the event, and the client will be responsible for all applicable repair or replacement costs.',
  },
]

export function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="section-inner narrow">
        <header className="section-header">
          <p className="eyebrow">Good to know</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p className="section-sub">
            A few quick answers before you book your themed sleepover.
          </p>
        </header>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
              {'bullets' in item && item.bullets ? (
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
