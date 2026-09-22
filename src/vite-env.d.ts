/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_LINK_PRETTY_IN_PINK?: string
  readonly VITE_STRIPE_LINK_CAMP_SLUMBERWOOD?: string
  readonly VITE_STRIPE_LINK_GLOW_CRAZY?: string
  readonly VITE_STRIPE_LINK_GAME_ON?: string
  readonly VITE_STRIPE_LINK_COZY_CHRISTMAS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
