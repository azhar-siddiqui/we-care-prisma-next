'use client';

import { addDoctorApiAction } from '@/actions/doctors/doctors';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { cn } from '@/lib/utils';
import { doctorFormSchema } from '@/validation/doctor/doctor';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface DoctorFormProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDoctors: () => Promise<void>;
}

type doctorFormValues = z.infer<typeof doctorFormSchema>;

const DoctorForm = ({ open, setOpen, fetchDoctors }: DoctorFormProp) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<doctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      doctorName: '',
      email: undefined,
      commission: undefined,
      phone: '',
      degree: '',
    },
  });

  function handleDialog() {
    form.reset();
    setOpen((prev) => !prev);
  }

  function onSubmit(value: z.infer<typeof doctorFormSchema>) {
    startTransition(async () => {
      const response = await addDoctorApiAction(value);
      if (response.success) {
        toast.success(response.message);
        form.reset();
        setOpen(false);
        await fetchDoctors();
      } else {
        toast.error(`${response.error}`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add Doctor Detail</DialogTitle>
          <DialogDescription>
            Enter the doctor&apos;s information below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full space-y-4">
            <FormField
              control={form.control}
              name="doctorName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Doctor Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={form.formState.errors.doctorName?.message ?? 'Enter Doctor Name'}
                      {...field}
                      autoComplete="off"
                      autoFocus
                      className={cn(form.formState.errors.doctorName && 'placeholder:text-red-500')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={form.formState.errors.email?.message ?? 'Enter Email'}
                      {...field}
                      value={field.value ?? ''}
                      autoComplete="off"
                      className={cn(
                        'rounded-none',
                        form.formState.errors.email && 'placeholder:text-red-500',
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commision in (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.formState.errors.commission?.message ?? 'Enter Commission (0-100)'
                      }
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? undefined : Number(value));
                      }}
                      autoComplete="off"
                      type="number"
                      className={cn(
                        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                        form.formState.errors.commission && 'placeholder:text-red-500',
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Phone Number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder={form.formState.errors.phone?.message ?? 'Enter Phone Number'}
                      {...field}
                      defaultCountry="IN"
                      autoComplete="off"
                      className={cn(
                        'rounded-none',
                        form.formState.errors.phone && 'placeholder:text-red-500',
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={form.formState.errors.degree?.message ?? 'Enter Degree'}
                      {...field}
                      autoComplete="off"
                      className={cn(form.formState.errors.degree && 'placeholder:text-red-500')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorForm;
