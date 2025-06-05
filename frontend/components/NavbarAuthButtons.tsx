"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

export function NavbarAuthButtons() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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