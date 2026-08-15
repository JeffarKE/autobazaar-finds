"use client";

import { Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

export default function ThemeToggle({ darkSurface = false }: { darkSurface?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <label
      className={`relative flex h-10 items-center gap-2 rounded-full border px-3 transition ${
        darkSurface
          ? "border-white/15 bg-white/10 text-white hover:bg-white/15"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-gray-200"
      }`}
      title="Choose appearance"
    >
      <Monitor className="h-4 w-4 shrink-0" />
      <span className="hidden text-xs font-semibold sm:inline">Theme</span>
      <select
        value={theme ?? "system"}
        onChange={(event) => setTheme(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Appearance: System, Light or Dark"
      >
        {themes.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </label>
  );
}
