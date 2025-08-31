import Header from '@/components/layout/header';
import Main from '@/components/layout/main';

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-1 flex-col space-y-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
          </div>
        </div>
      </Main>
    </>
  );
}
