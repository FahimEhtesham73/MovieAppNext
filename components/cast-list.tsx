import Image from "next/image";
import { getImagePath } from "@/lib/tmdb";
import { type MovieDetails } from "@/lib/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CastList({ cast }: { cast: MovieDetails["credits"]["cast"] }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Cast</h2>
      <ScrollArea>
        <div className="flex gap-4 pb-4">
          {cast.slice(0, 20).map((person) => (
            <Card key={person.id} className="w-[150px] shrink-0">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3]">
                  {person.profile_path ? (
                    <Image
                      src={getImagePath(person.profile_path)!}
                      alt={person.name}
                      fill
                      className="rounded-t-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="font-semibold line-clamp-1">{person.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {person.character}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}