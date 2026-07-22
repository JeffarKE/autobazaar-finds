"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          setMessage(`❌ Connection failed: ${error.message}`);
        } else {
          setMessage("✅ Successfully connected to Supabase!");
        }
      } catch (err) {
        setMessage(`❌ Unexpected error: ${String(err)}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-4 text-3xl font-bold">Supabase Test</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}