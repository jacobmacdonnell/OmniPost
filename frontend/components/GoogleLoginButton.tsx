import { supabase } from "@/lib/supabaseClient";

export function GoogleLoginButton() {
  return (
    <button
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            scopes: "https://www.googleapis.com/auth/userinfo.email"
          }
        })
      }
    >
      Sign in with Google
    </button>
  );
} 