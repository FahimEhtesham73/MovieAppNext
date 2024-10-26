"use client";

import Image from "next/image";
import { getImagePath } from "@/lib/tmdb";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export function CastCard({ member }: { member: CastMember }) {
  const profilePath = getImagePath(member.profile_path);

  return (
    <div key={member.id} className="text-center">
      <div className="relative mb-2 aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {profilePath ? (
          <Image
            src={profilePath}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <p className="font-medium line-clamp-1">{member.name}</p>
      <p className="text-sm text-muted-foreground line-clamp-1">
        {member.character}
      </p>
    </div>
  );
}