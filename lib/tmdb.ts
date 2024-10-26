import { z } from "zod";
import { MovieSchema } from "./types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_BASE = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  throw new Error("TMDB API key is not defined in environment variables");
}

export function getImagePath(path: string | null, size: "w500" | "original" = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchMovies(page = 1, query?: string) {
  try {
    const endpoint = query
      ? `${TMDB_API_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
      : `${TMDB_API_BASE}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

    const response = await fetch(endpoint, { 
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      results: MovieSchema.array().parse(data.results),
      page: data.page,
      total_pages: data.total_pages
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], page: 1, total_pages: 1 };
  }
}

export async function fetchMovieDetails(id: string) {
  try {
    const [detailsRes, creditsRes, recommendationsRes] = await Promise.all([
      fetch(`${TMDB_API_BASE}/movie/${id}?api_key=${TMDB_API_KEY}`, {
        next: { revalidate: 3600 },
        headers: { 'Accept': 'application/json' }
      }),
      fetch(`${TMDB_API_BASE}/movie/${id}/credits?api_key=${TMDB_API_KEY}`, {
        next: { revalidate: 3600 },
        headers: { 'Accept': 'application/json' }
      }),
      fetch(`${TMDB_API_BASE}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`, {
        next: { revalidate: 3600 },
        headers: { 'Accept': 'application/json' }
      }),
    ]);

    if (!detailsRes.ok || !creditsRes.ok || !recommendationsRes.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const [details, credits, recommendations] = await Promise.all([
      detailsRes.json(),
      creditsRes.json(),
      recommendationsRes.json(),
    ]);

    return {
      ...details,
      credits,
      recommendations: {
        ...recommendations,
        results: recommendations.results.slice(0, 5)
      }
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
}