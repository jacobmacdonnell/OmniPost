# OmniPost: Google Auth with Supabase Integration Plan

## Overview
Implement Google authentication as the sole login method for OmniPost using Supabase Auth. This will provide secure, scalable user management and enable future features like user content history, settings, and analytics.

---

## 1. Supabase Project Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a new project.
   - Note your project URL and anon key (found in Project Settings > API).

2. **Enable Google Auth Provider**
   - In the Supabase dashboard, go to **Authentication > Providers > Google**.
   - In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create OAuth 2.0 credentials:
     - Set the redirect URI to:
       ```
       https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
       ```
   - Copy your Google Client ID and Secret into Supabase and enable the provider.

---

## 2. Install Supabase in the Frontend

```bash
cd frontend
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## 3. Configure Environment Variables

Create or update `frontend/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 4. Create Supabase Client

Create `frontend/lib/supabaseClient.ts`:
```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 5. Set Up Auth Context in Next.js

- Follow the [Supabase Auth Helpers for Next.js guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) to wrap your app with `SessionContextProvider`.
- For Next.js App Router, use the provider in `layout.tsx`.

---

## 6. Add Google Login Button

Create a reusable login button component (e.g., `frontend/components/GoogleLoginButton.tsx`):
```tsx
import { supabase } from "@/lib/supabaseClient";

export function GoogleLoginButton() {
  return (
    <button
      onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
    >
      Sign in with Google
    </button>
  );
}
```
- Replace all "Get Started", "Start Free Trial", etc. buttons with this component.

---

## 7. Protect Authenticated Routes

- Use Supabase Auth helpers to check for a session on protected pages (e.g., dashboard, account).
- Redirect unauthenticated users to the login page or show the login button.

---

## 8. (Optional) Store User Data

- Use Supabase's Postgres DB to store user-specific data (content history, settings, etc.) as you build out more features.

---

## 9. Resources
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Google OAuth Setup Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## 10. Next Steps
- [ ] Complete Supabase project and Google OAuth setup
- [ ] Add environment variables
- [ ] Add Supabase client and context provider
- [ ] Add Google login button and update all entry points
- [ ] Protect all authenticated routes
- [ ] Expand to user data storage as needed 