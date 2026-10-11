import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://xcrzazbdutpqeerygzlj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcnphemJkdXRwcWVlcnlnemxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MDA1NTIsImV4cCI6MjEwNzI3NjU1Mn0.SaJKFDRwPqHbjqGSuEZOZ_rLbsgSo57mBJuBoL7pL0I'

export const supabase = createClient(supabaseURL, supabaseAnonKey)