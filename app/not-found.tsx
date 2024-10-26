import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Not Found</h1>
      <p className="mb-8 text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}