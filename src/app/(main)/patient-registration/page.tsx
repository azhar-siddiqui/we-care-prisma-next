import Header from '@/components/layout/header';
import Main from '@/components/layout/main';
import dynamic from 'next/dynamic';

const PatientRegistrationForm = dynamic(() => import('./_components/patient-registration-form'), {
  loading: () => <p>Loading...</p>,
});

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
