import React, { useState } from 'react';
import { Role } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { EmployeePage } from './pages/EmployeePage.tsx';
import { HRPage } from './pages/HRPage.tsx';
import { OpsPage } from './pages/OpsPage.tsx';

export default function App() {
  const [role, setRole] = useState<Role>(Role.EMPLOYEE);

  const renderContent = () => {
    switch (role) {
      case Role.EMPLOYEE:
        return <EmployeePage />;
      case Role.HR_REVIEWER:
        return <HRPage />;
      case Role.DEMO_OPERATOR:
        return <OpsPage />;
      default:
        return <EmployeePage />;
    }
  };

  return (
    <Layout role={role} setRole={setRole}>
      {renderContent()}
    </Layout>
  );
}
