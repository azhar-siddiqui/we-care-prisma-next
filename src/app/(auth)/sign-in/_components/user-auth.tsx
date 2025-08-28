"use client";

import Link from "next/link";
import { HTMLAttributes, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema } from "@/validation/auth/admin/login";
import { LoaderCircle } from "lucide-react";

import { toast } from "sonner";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

export function UserAuthForm({
  className,
  ...props
}: Readonly<UserAuthFormProps>) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // USER CREDENTIALS
      // email: "jhondoe@wecare.com",
      // password: "Jhon@123",
      // ADMIN CREDENTIALS
      email: "azhartsiddiqui@gmail.com",
      password: "qwer1234",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        console.log("data", data);
      } catch (error) {
        console.log("An error occurred while login===>", error);
        toast.error(`${error}`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Jhon@we-care.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2 ">
            <Switch id="remember-me" />
            <Label htmlFor="remember-me">Remember me</Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-muted-foreground text-md font-light hover:opacity-75 hover:text-primary hover:underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="mt-2" disabled={isPending}>
          {isPending && <LoaderCircle className="size-4 animate-spin" />}
          Login
        </Button>

        <Link
          href="/sign-up"
          className="text-muted-foreground text-sm sm:text-md text-center"
        >
          Dont have an account?{" "}
          <span className="text-primary font-medium hover:opacity-75 hover:text-primary hover:underline underline-offset-4 ">
            Sign up now
          </span>
        </Link>
      </form>
    </Form>
  );
}
