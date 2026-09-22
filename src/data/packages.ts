export type PackageId =
  | 'pretty-in-pink'
  | 'camp-slumberwood'
  | 'lets-glow-crazy'
  | 'game-on'
  | 'cozy-christmas'

export type PartyPackage = {
  id: PackageId
  name: string
  tagline: string
  description: string
  image: string
  photos?: string[]
  accent: string
  stripeEnvKey: string
  aiGeneratedBackground?: boolean
}

export const CONTACT = {
  email: 'partiesbytali@gmail.com',
} as const

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/** Introductory Grand Opening pricing */
export const PRICING = {
  label: 'Introductory Grand Opening Pricing',
  basePrice: 200,
  baseTents: 3,
  additionalPersonPrice: 50,
  maxGuests: 6,
} as const

export const INCLUSION_ROWS = [
  ['Tent', 'Blow up mattress', 'Bedding', 'Accent pillows'],
  ['Accent lighting', 'Bed trays', 'Name plates'],
] as const

export const packages: PartyPackage[] = [
  {
    id: 'pretty-in-pink',
    name: 'Pretty in Pink',
    tagline: 'Sparkle, white & best friend energy',
    description:
      "White tents, fairy lights, and delicate accents create a dreamy night that's equal parts cozy and magical. Plush pillows, personalized touches, and soft light pink details transport guests to a dreamlike world where twinkling lights, cozy corners, and magical moments fill the evening with wonder.",
    image: publicAsset('images/pretty-in-pink.jpg'),
    photos: [
      publicAsset('images/pretty-in-pink-tent.jpg'),
      publicAsset('images/pretty-in-pink-tray.jpg'),
    ],
    accent: 'blush',
    stripeEnvKey: 'VITE_STRIPE_LINK_PRETTY_IN_PINK',
    aiGeneratedBackground: true,
  },
  {
    id: 'camp-slumberwood',
    name: 'Camp Slumberwood',
    tagline: 'Cabin coziness, without leaving home',
    description:
      'Woodsy cabin vibes, warm neutral colors, and starry night lighting create the charm of a cozy backyard campout. Adventure inspired details set the scene for unforgettable evenings filled with laughter, connection, and a touch of outdoor adventure.',
    image: publicAsset('images/camp-slumberwood.jpg'),
    photos: [
      publicAsset('images/camp-slumberwood-closeup.jpg'),
      publicAsset('images/camp-slumberwood-tents.jpg'),
    ],
    accent: 'peach',
    stripeEnvKey: 'VITE_STRIPE_LINK_CAMP_SLUMBERWOOD',
    aiGeneratedBackground: true,
  },
  {
    id: 'cozy-christmas',
    name: 'Cozy Christmas',
    tagline: 'Fireplace glow & holiday magic',
    description:
      'White tents, plaid throws, and peppermint pillows by the firelight. A festive sleepover filled with gingerbread charm, personalized name plates, and warm fairy lights. Perfect for holiday gatherings and December birthdays.',
    image: publicAsset('images/cozy-christmas.png'),
    photos: [
      publicAsset('images/cozy-christmas.jpg'),
      publicAsset('images/cozy-christmas-pillows.jpg'),
    ],
    accent: 'mint',
    stripeEnvKey: 'VITE_STRIPE_LINK_COZY_CHRISTMAS',
    aiGeneratedBackground: true,
  },
  {
    id: 'game-on',
    name: 'Game On',
    tagline: 'Controllers up, play all night',
    description:
      'Ready, set, play! Scoreboard energy, bold colors, and a setup built for friendly competition create the ultimate gaming sleepover. Level Up pillows and ambient LED lighting set the stage for late night laughs, unforgettable moments, and epic memories.',
    image: publicAsset('images/game-on.jpg'),
    photos: [
      publicAsset('images/game-on-closeup.jpg'),
      publicAsset('images/game-on-tents.jpg'),
    ],
    accent: 'sky',
    stripeEnvKey: 'VITE_STRIPE_LINK_GAME_ON',
    aiGeneratedBackground: true,
  },
  {
    id: 'lets-glow-crazy',
    name: "Let's Glow Crazy",
    tagline: 'Neon nights & blacklight magic',
    description:
      'Neon colors, blacklight energy, and glow in the dark accents transform the space into an unforgettable glow party. Decorative pillows, UV reactive décor, and a bold “Let’s Glow Crazy” backdrop create an immersive atmosphere filled with vibrant color, high energy fun, and unforgettable memories.',
    image: publicAsset('images/lets-glow-crazy.jpg'),
    photos: [
      publicAsset('images/lets-glow-crazy-closeup.jpg'),
      publicAsset('images/lets-glow-crazy-tents.jpg'),
    ],
    accent: 'lavender',
    stripeEnvKey: 'VITE_STRIPE_LINK_GLOW_CRAZY',
    aiGeneratedBackground: true,
  },
]

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getStripeLink(envKey: string): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>
  const value = env[envKey]
  return value && value.trim().length > 0 ? value.trim() : undefined
}
