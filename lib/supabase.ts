import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zhdxxgbbtlljsgmmnuuz.supabase.co";
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZHh4Z2JidGxsanNnbW1udXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTI4NjEsImV4cCI6MjA3ODM2ODg2MX0.E3ymMFFPBprpCOKfyE01DwykuMpooqc7qTm_R_yXaFg";//se pega en comillas porque es una cadena

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})