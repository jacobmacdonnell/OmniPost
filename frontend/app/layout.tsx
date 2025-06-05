import type { Metadata } from 'next'
import './globals.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient';

export const metadata: Metadata = {
  title: 'OmniPost',
  description: 'AI-powered content generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
