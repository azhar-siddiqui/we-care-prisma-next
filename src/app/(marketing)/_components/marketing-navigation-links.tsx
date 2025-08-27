import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MarketingNavigationLink() {
  return (
    <Link href="/sign-in" className={cn(buttonVariants({ variant: "default" }))}>
      Login
    </Link>
  );
}
