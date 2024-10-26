import { type Movie } from "@/lib/types";
import MovieCard from "./movie-card";

export default function RecommendedMovies({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Recommended Movies</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}