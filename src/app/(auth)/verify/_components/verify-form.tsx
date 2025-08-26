"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const formSchema = z.object({
  otp: z.string().min(5, {
    message: "Your one-time password must be 5 characters.",
  }),
});

export const VerifyForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  // Instantly redirect to /sign-up if email is missing
  if (!email || email === "") {
    redirect("/sign-up");
  }

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit({ otp }: z.infer<typeof formSchema>) {
    try {
      const verifyEmail = {
        email,
        otp,
      };
      console.log("verifyEmail", verifyEmail);
      startTransition(async () => {
        try {
          router.push("/sign-up");
          form.reset();
        } catch (error) {
          console.log("An error occurred===>", error);
          toast.error(`Failed to submit the form. Please try again. ${error}`);
        }
      });
    } catch (error) {
      toast.error(`Failed to submit the form. Please try again. ${error}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center w-full space-y-4">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={5}
                  containerClassName="gap-x-4"
                  {...field}
                  id="otp-input"
                  aria-label="Enter your one-time password"
                  autoFocus
                >
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <LoaderCircle className="size-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
