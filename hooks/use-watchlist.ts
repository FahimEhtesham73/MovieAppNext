"use client";

import { useState, useEffect } from "react";
import { type Movie } from "@/lib/types";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const addToWatchlist = (movie: Movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (movieId: number) => {
    const newWatchlist = watchlist.filter((m) => m.id !== movieId);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
}