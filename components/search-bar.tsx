"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { Dialog, DialogTitle } from "@/components/ui/dialog";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useHotkeys("k", (e) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      setOpen(true);
    }
  });

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/?search=${encodeURIComponent(debouncedSearch)}`);
      setOpen(false);
    } else if (searchParams.has("search")) {
      router.push("/");
    }
  }, [debouncedSearch, router, searchParams]);

  return (
    <>
      <div className="relative w-full max-w-sm">
        <Button
          variant="outline"
          className="relative w-full justify-start text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search movies...
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <CommandDialog>
          <DialogTitle className="sr-only">Search Movies</DialogTitle>
          <CommandInput 
            placeholder="Search movies..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => {
                router.push("/watchlist");
                setOpen(false);
              }}>
                My Watchlist
              </CommandItem>
              <CommandItem onSelect={() => {
                router.push("/?search=action");
                setOpen(false);
              }}>
                Action Movies
              </CommandItem>
              <CommandItem onSelect={() => {
                router.push("/?search=comedy");
                setOpen(false);
              }}>
                Comedy Movies
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Dialog>
    </>
  );
}