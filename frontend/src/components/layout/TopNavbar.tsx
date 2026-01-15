import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

interface TopNavbarProps {
  onMenuClick: () => void;
  pageTitle?: string;
}

export function TopNavbar({ onMenuClick, pageTitle }: TopNavbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden ml-12"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {pageTitle && (
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {pageTitle}
            </h1>
          )}
        </div>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="pl-10 bg-muted/50 border-transparent focus:border-border focus:bg-background"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* User info - desktop */}
          {user && (
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <Badge variant="accent" className="text-[10px]">
                  {user.role}
                </Badge>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
