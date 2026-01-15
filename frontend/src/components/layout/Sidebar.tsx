import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Briefcase,
  Award,
  MessageSquare,
  FolderOpen,
  User,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LogOut,
  Menu,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Bell, label: 'Notices', path: '/notices' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Briefcase, label: 'Placements', path: '/placements' },
  { icon: Award, label: 'Skills', path: '/skills' },
  { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
  { icon: FolderOpen, label: 'Resources', path: '/resources' },
  { icon: User, label: 'Profile', path: '/profile' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const dashboardPath = user?.role ? `/dashboard/${user.role}` : '/dashboard';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar z-50 transition-all duration-300 flex flex-col',
          isOpen ? 'w-64' : 'w-0 lg:w-20',
          'lg:relative'
        )}
      >
        {/* Logo section */}
        <div className={cn(
          'flex items-center gap-3 p-4 border-b border-sidebar-border',
          !isOpen && 'lg:justify-center'
        )}>
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-glow">
            <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-sidebar-foreground text-lg">EduPortal</h1>
              <p className="text-xs text-sidebar-foreground/60">College Management</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const targetPath = item.path === '/dashboard' ? dashboardPath : item.path;
            const isActive = location.pathname === targetPath || (item.path === '/dashboard' && location.pathname.startsWith('/dashboard'));
            return (
              <Link
                key={item.path}
                to={targetPath}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  !isOpen && 'lg:justify-center lg:px-2'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 shrink-0 transition-transform duration-200',
                  !isActive && 'group-hover:scale-110'
                )} />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className={cn(
            'p-3 border-t border-sidebar-border',
            !isOpen && 'lg:flex lg:justify-center'
          )}>
            {isOpen ? (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
                <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-sidebar-primary">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">
                    {user.role}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Toggle button - desktop only */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -right-3 top-20 hidden lg:flex w-6 h-6 rounded-full bg-card border border-border shadow-md hover:bg-accent"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </aside>
    </>
  );
}
