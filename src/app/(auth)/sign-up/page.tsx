import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { SignUpForm } from './_components/signup-form';

export default function SignUpPage() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Create an account</CardTitle>
        <CardDescription>Enter your email and password to login an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-center space-y-2">
        <Link href="/sign-in" className="text-muted-foreground text-sm sm:text-md text-center">
          Already have an account?{' '}
          <span className="text-primary font-medium hover:opacity-75 hover:text-primary hover:underline underline-offset-4 ">
            Sign In
          </span>
        </Link>
        <p className="text-muted-foreground px-8 text-center text-sm">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="hover:text-primary underline underline-offset-4">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="hover:text-primary underline underline-offset-4">
            Privacy Policy
          </a>{' '}
          .
        </p>
      </CardFooter>
    </Card>
  );
}
