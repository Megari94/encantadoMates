import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Faltan las variables de entorno VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
    'Copiá .env.example a .env y completá tus credenciales de Supabase.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export const PRODUCTS_TABLE = 'products'
export const PRODUCT_IMAGES_BUCKET = 'product-images'
export const TESTIMONIALS_TABLE = 'testimonials'

export const PRODUCT_CATEGORIES = [
  { value: 'mate', label: 'Mates' },
  { value: 'termo', label: 'Termos' },
  { value: 'bombilla', label: 'Bombillas' },
  { value: 'accesorio', label: 'Accesorios' },
]
