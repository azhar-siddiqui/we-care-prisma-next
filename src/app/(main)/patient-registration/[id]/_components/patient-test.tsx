import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowRight, Search } from 'lucide-react';
import React from 'react';

const data = Array.from({ length: 50 });

interface PatientTestPage {
  id: string;
}

function PatientTestPage({ id }: PatientTestPage) {
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <div className="grid col-span-2 lg:col-span-1">
        <Card className="p-0 gap-0">
          <CardHeader className="px-4 pt-4">
            <Input placeholder="Search test" startIcon={<Search className="size-4" />} />
          </CardHeader>
          <CardContent className={cn('px-0 h-screen max-h-[calc(100vh-150px)] overflow-y-auto ')}>
            {data.map((_, i) => (
              <React.Fragment key={`${_}-${i}`}>
                <div className="flex items-center justify-between p-4">
                  <p className="font-semibold">Description {i + 1}</p>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                {i !== data.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid col-span-2 lg:col-span-1">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>content</CardContent>
        </Card>
      </div>
    </div>
  );
}
export default PatientTestPage;
