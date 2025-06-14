
import React from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { PrescriptionScanner } from '@/components/prescription/PrescriptionScanner';

export function ScanPrescriptionPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Scanner une ordonnance</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        <PrescriptionScanner />
      </div>
    </SidebarInset>
  );
}
