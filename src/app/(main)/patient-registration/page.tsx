import Header from '@/components/layout/header';
import Main from '@/components/layout/main';
import PatientRegistrationForm from './_components/patient-registration-form';

export default function PatientRegistrationPage() {
  return (
    <>
      <Header />
      <Main className="md:p-4">
        <PatientRegistrationForm />
      </Main>
    </>
  );
}
