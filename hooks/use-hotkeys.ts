"use client";

import { useEffect } from "react";

type Handler = (e: KeyboardEvent) => void;

export function useHotkeys(key: string, callback: Handler) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback(e);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
}