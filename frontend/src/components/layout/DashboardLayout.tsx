import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={cn(
        'flex-1 flex flex-col min-h-screen transition-all duration-300',
        sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
      )}>
        <TopNavbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          pageTitle={pageTitle}
        />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
