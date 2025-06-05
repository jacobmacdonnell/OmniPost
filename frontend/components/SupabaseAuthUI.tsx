import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';

export default function SupabaseAuthUI() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      onlyThirdPartyProviders
      redirectTo={typeof window !== 'undefined' ? window.location.origin + '/dashboard' : '/dashboard'}
    />
  );
}