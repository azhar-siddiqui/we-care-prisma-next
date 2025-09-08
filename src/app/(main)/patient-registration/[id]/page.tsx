import Header from '@/components/layout/header';
import Main from '@/components/layout/main';
import PatientTestPage from './_components/patient-test';

export default async function PatientTest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <Main className="md:p-4">
        <PatientTestPage id={id} />
      </Main>
    </>
  );
}
