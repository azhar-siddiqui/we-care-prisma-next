'use client';
import { useRouter } from 'next/navigation';

import { HTMLAttributes, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { signUpApiAction } from '@/actions/auth/sign-up';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { signUpAdminSchema } from '@/validation/auth/admin/signup';
import { toast } from 'sonner';

type SignUpFormProps = HTMLAttributes<HTMLFormElement>;

export const SignUpForm = ({ className, ...props }: Readonly<SignUpFormProps>) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpAdminSchema>>({
    resolver: zodResolver(signUpAdminSchema),
    defaultValues: {
      labName: 'Medicare Pathology Lab',
      ownerName: 'Azhar',
      email: 'azhartsiddiqui@gmail.com',
      password: 'AzharT@1998',
      contactNumber: '',
      previousSoftware: '',
    },
  });

  function onSubmit(value: z.infer<typeof signUpAdminSchema>) {
    startTransition(async () => {
      const response = await signUpApiAction(value);
      if (response.success) {
        toast.success(`${response.message}`);
        router.push(`/verify?email=${encodeURIComponent(value.email)}`);
      } else {
        toast.error(`${response.error}`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid grid-cols-1 gap-3 md:grid-cols-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="labName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Lab Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={form.formState.errors.labName?.message ?? 'HealthLab'}
                  {...field}
                  autoComplete="off"
                  autoFocus
                  className={cn(form.formState.errors.labName && 'placeholder:text-red-400')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={form.formState.errors.ownerName?.message ?? 'John Doe'}
                  {...field}
                  className={cn(form.formState.errors.ownerName && 'placeholder:text-red-400')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={form.formState.errors.email?.message ?? 'name@example.com'}
                  {...field}
                  className={cn(form.formState.errors.email && 'placeholder:text-red-400')}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder={form.formState.errors.password?.message ?? '********'}
                  inputClassName={cn(form.formState.errors.password && 'placeholder:text-red-400')}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder={
                    form.formState.errors.contactNumber?.message ?? 'Enter Contact Number'
                  }
                  {...field}
                  defaultCountry="IN"
                  autoComplete="off"
                  className={cn(
                    form.formState.errors.contactNumber && 'border border-red-500 rounded-md',
                  )}
                  inputClassName={cn(
                    'rounded-none ',
                    form.formState.errors.contactNumber && 'placeholder:text-red-400 border-0',
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previousSoftware"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Previous Software</FormLabel>
              <FormControl>
                <Input
                  placeholder="LabSoftwareX"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-2 md:col-span-4" disabled={isPending}>
          {isPending && <LoaderCircle className="size-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
};
