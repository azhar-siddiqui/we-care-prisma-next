'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DatetimePicker } from '@/components/ui/extension/datetime-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn, detectOS } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Plus, Save, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import z from 'zod';

import { getAllDoctorApiAction } from '@/actions/doctors/doctors';
import { addPatientApiAction } from '@/actions/patient/patient';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Age, Designation, Doctor, Gender } from '@/generated/prisma';
import { patientRegistrationFormSchema } from '@/validation/patient-registration/patient-registration-form-validation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import DoctorForm from './doctor-form';

type patientRegistrationValues = z.infer<typeof patientRegistrationFormSchema>;

export default function PatientRegistrationForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [isPatientFormPending, startPatientFormTransition] = useTransition();

  const [getAllDoctorsIsPending, getAllDoctorsStartTransition] = useTransition();

  const form = useForm<patientRegistrationValues>({
    resolver: zodResolver(patientRegistrationFormSchema),
    defaultValues: {
      patientRegistrationDate: new Date(),
      doctorId: '',
      designation: Designation.Mr,
      patientName: '',
      phone: '',
      gender: Gender.Male,
      age: undefined,
      ageType: Age.Year,
      email: '',
      address: '',
    },
  });

  const designation = useWatch({ control: form.control, name: 'designation' });
  const doctorId = useWatch({ control: form.control, name: 'doctorId' });

  function onSubmit(values: patientRegistrationValues) {
    startPatientFormTransition(async () => {
      const response = await addPatientApiAction(values);

      if (response.success) {
        toast.success(response.message);
        form.reset();
        form.setValue('doctorId', doctors[0].id, {
          shouldValidate: true,
          shouldDirty: true,
        });
        router.push(`/patient-registration/${response.data?.id}`);
      } else {
        toast.error(`${response.error}`);
      }
    });
  }

  const selectedDoctor = useMemo(() => {
    setOpen(false);
    return doctors.find((d) => d.id === doctorId);
  }, [doctorId, doctors]);

  const fetchDoctors = useCallback(async () => {
    getAllDoctorsStartTransition(async () => {
      try {
        const response = await getAllDoctorApiAction();
        if (response.success && response.data) {
          setDoctors(response.data);
          if (response.data.length > 0 && !form.getValues('doctorId')) {
            form.setValue('doctorId', response.data[0].id, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        } else {
          toast.error(`Failed to fetch doctors: ${response?.error}`);
        }
      } catch (error) {
        console.error('Get All doctors error', error);
        toast.error(`${error}`);
      }
    });
  }, [form]);

  useEffect(() => {
    // Only auto-set gender for certain designations
    if (designation === Designation.Miss) {
      form.setValue('gender', Gender.Female);
    } else if (designation === Designation.Mr) {
      form.setValue('gender', Gender.Male);
    }
    // Optional: for other titles, you could clear gender or leave as-is
  }, [designation, form]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    const os = detectOS();
    setIsMac(os === 'mac');
  }, []);

  return (
    <>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8 items-center justify-between space-y-2 gap-y-2 sm:flex w-full">
              <h1 className="mb-4 w-full text-2xl font-bold tracking-tight md:mb-auto">
                New Patient Registration
              </h1>
              <FormField
                control={form.control}
                name="patientRegistrationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <DatetimePicker
                      {...field}
                      format={[
                        ['days', 'months', 'years'],
                        ['hours', 'minutes', 'am/pm'],
                      ]}
                    />
                  </FormItem>
                )}
              />
            </div>
            <Card>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="doctorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Refer Doctor</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {selectedDoctor ? (
                                  <span className="flex flex-col text-left">
                                    {selectedDoctor.doctorName}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-x-2">
                                    <Search className="size-4" />{' '}
                                    {getAllDoctorsIsPending
                                      ? 'Loading Doctors...'
                                      : 'Search Doctor'}
                                  </span>
                                )}

                                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                                  <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span> D
                                </kbd>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[288px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search Patient" />
                              <CommandList>
                                <CommandEmpty>No Doctor found.</CommandEmpty>
                                <CommandGroup>
                                  {doctors.map((doctor) => (
                                    <CommandItem
                                      key={doctor.id}
                                      value={`${doctor.doctorName}`}
                                      onSelect={() => form.setValue('doctorId', doctor.id)}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          doctor.id === field.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                      />
                                      {doctor.doctorName === 'Self'
                                        ? doctor.doctorName
                                        : `Dr. ${doctor.doctorName}`}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <div className="flex items-end">
                      <Button
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          setOpenDialog(!openDialog);
                        }}
                      >
                        <Plus className="size-4" />
                        Add Docter
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desiganation</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Designation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Designation).map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              form.formState.errors.patientName?.message ?? 'Enter Patient Name'
                            }
                            {...field}
                            autoComplete="off"
                            autoFocus
                            className={cn(
                              form.formState.errors.patientName && 'placeholder:text-red-500',
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
                            placeholder={
                              form.formState.errors.phone?.message ?? 'Enter Phone Number'
                            }
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex items-center justify-between"
                          >
                            {Object.values(Gender).map((gender) => (
                              <FormItem
                                className="flex items-center gap-0 space-y-0 space-x-3"
                                key={gender}
                              >
                                <FormControl>
                                  <RadioGroupItem value={gender} />
                                </FormControl>
                                <FormLabel className="cursor-pointer font-normal">
                                  {gender}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={form.formState.errors.age?.message ?? 'Enter Age'}
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number(e.target.value) : undefined)
                              }
                              min="0"
                              max="150"
                              autoComplete="off"
                              className={cn(
                                '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                                form.formState.errors.age && 'placeholder:text-red-500',
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ageType"
                      render={({ field }) => (
                        <FormItem className="min:w-fit w-full">
                          <FormLabel>Age Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full min-w-[8rem]">
                                <SelectValue placeholder="Select Age type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Age).map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="xl:col-span-3">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={form.formState.errors.email?.message ?? 'Enter Email'}
                            {...field}
                            value={field.value ?? ''}
                            autoComplete="off"
                            className={cn(
                              form.formState.errors.email && 'placeholder:text-red-500',
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="xl:col-span-3">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Patient Address"
                            className="h-26 resize-none"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex sm:justify-end">
                  <Button
                    type="submit"
                    className="w-full sm:w-fit"
                    disabled={getAllDoctorsIsPending ?? isPatientFormPending}
                  >
                    <Save className="size-4" />
                    Save & Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
      <DoctorForm open={openDialog} setOpen={setOpenDialog} fetchDoctors={fetchDoctors} />
    </>
  );
}
