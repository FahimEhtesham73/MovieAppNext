"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Film } from "lucide-react";
import { SearchBar } from "./search-bar";

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="font-bold">MovieVault</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchBar />

          <Link href="/watchlist">
            <Button variant="outline">Watchlist</Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}