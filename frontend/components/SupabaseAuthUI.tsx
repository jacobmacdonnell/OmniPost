'use client'

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';

export default function SupabaseAuthUI() {
  const supabase = createClient();
  
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      onlyThirdPartyProviders
      redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/dashboard'}
    />
  );
}