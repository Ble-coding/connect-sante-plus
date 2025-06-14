
import React from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { InsuranceManager } from '@/components/insurance/InsuranceManager';

export function InsurancePage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes assurances</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        <InsuranceManager />
      </div>
    </SidebarInset>
  );
}
