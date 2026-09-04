import React from 'react';
import { HardwareStoreProvider, useHardwareStore } from './context/HardwareStoreContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { POSView } from './components/pos/POSView';
import { InventoryView } from './components/inventory/InventoryView';
import { WhatsAppOrdersView } from './components/whatsapp/WhatsAppOrdersView';
import { InvoicesView } from './components/billing/InvoicesView';
import { PaymentsView } from './components/payment/PaymentsView';
import { StorefrontView } from './components/storefront/StorefrontView';

const AppContent: React.FC = () => {
  const { appMode, activeTab } = useHardwareStore();

  if (appMode === 'storefront') {
    return <StorefrontView />;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'pos' && <POSView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'whatsapp' && <WhatsAppOrdersView />}
          {activeTab === 'invoices' && <InvoicesView />}
          {activeTab === 'payments' && <PaymentsView />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HardwareStoreProvider>
      <AppContent />
    </HardwareStoreProvider>
  );
}
