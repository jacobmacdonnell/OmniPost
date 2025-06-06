"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

export function NavbarAuthButtons() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  if (user) {
    return (
      <Link href="/dashboard">
        <Button className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 hover:text-white hover:border-slate-500 px-4 py-2">
          Dashboard
        </Button>
      </Link>
    );
  }
  return (
    <>
      <Link href="/login">
        <Button className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 hover:text-white hover:border-slate-500 px-4 py-2">
          Log In
        </Button>
      </Link>
      <Link href="/login">
        <Button className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2">
          Get Started
        </Button>
      </Link>
    </>
  );
} 