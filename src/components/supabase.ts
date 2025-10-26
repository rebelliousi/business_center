import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://gxkrbwcqukfeniivqhxa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a3Jid2NxdWtmZW5paXZxaHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0Mjg0MTUsImV4cCI6MjA3NzAwNDQxNX0.-NnRHfBxKTrZ2MaYWhWJRl1gH9Dxo96aqwAOe92P9UA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  name: string;
  bio: string;
  expertise: string;
  image_url: string | null;
  created_at: string;
}

export interface Discount {
  id: string;
  title: string;
  description: string;
  discount_percentage: number;
  valid_until: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Course[];
}

export async function getTeachers() {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Teacher[];
}

export async function getActiveDiscounts() {
  const { data, error } = await supabase
    .from('discounts')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Discount[];
}
