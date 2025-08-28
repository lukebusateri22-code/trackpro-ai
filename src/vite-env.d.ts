/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY?: string
  readonly VITE_VIDEO_STORAGE_BUCKET?: string
  readonly VITE_OPENAI_API_KEY?: string
  readonly VITE_REPLICATE_API_KEY?: string
  readonly VITE_VAPID_PUBLIC_KEY?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_ENVIRONMENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
