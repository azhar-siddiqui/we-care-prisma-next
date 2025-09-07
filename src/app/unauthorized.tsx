"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
  const pathName = usePathname();

  return (
    <main className="flex grow items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Unauthorized</h1>
          <p className="text-muted-foreground">Please sign in to continue.</p>
        </div>
        <div>
          <Link
            href={`/sign-in?redirect=${pathName}`}
            className={buttonVariants({ variant: "default" })}
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
