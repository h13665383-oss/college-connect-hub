import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Camera } from 'lucide-react';
import { StudentProfile } from '@/components/profile/StudentProfile';
import { TeacherProfile } from '@/components/profile/TeacherProfile';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout pageTitle="Profile">
      <div className="space-y-6">
        {/* Common Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-accent/50" />
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-card border-4 border-background shadow-xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 rounded-full shadow-lg">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Basic Info Header */}
              <div className="flex-1 pt-4 sm:pt-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="capitalize border-primary/50 text-primary">
                        {user.role}
                      </Badge>
                      {user.role === 'student' && user.studentId && (
                        <Badge variant="secondary">{user.studentId}</Badge>
                      )}
                      {user.role === 'teacher' && user.employeeId && (
                        <Badge variant="secondary">{user.employeeId}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Specific Content */}
        {user.role === 'student' && <StudentProfile user={user} />}
        {user.role === 'teacher' && <TeacherProfile user={user} />}
        {user.role === 'admin' && (
             <div className="p-4 text-center text-muted-foreground">Admin profile view not implemented yet.</div>
        )}
      </div>
    </DashboardLayout>
  );
}
