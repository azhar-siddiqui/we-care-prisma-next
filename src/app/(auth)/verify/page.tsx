import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { VerifyForm } from './_components/verify-form';

export default function VerifyPage() {
  return (
    <Card className="gap-4 w-full min-w-md">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Verify account</CardTitle>
        <CardDescription>Please enter the one-time password sent to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="size-8 mx-auto" />}>
          <VerifyForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
