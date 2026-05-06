import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Singleton do cliente Supabase para reaproveitamento de conexão
export const supabase = createClient(supabaseUrl, supabaseAnonKey)