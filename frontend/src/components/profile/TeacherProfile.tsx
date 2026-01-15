
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User as UserIcon, Briefcase, Clock, Mail, BookOpen, Users } from 'lucide-react';
import { User } from '@/contexts/AuthContext';

interface TeacherProfileProps {
  user: User;
}

export function TeacherProfile({ user }: TeacherProfileProps) {
  // Mock data for teacher-specific fields
  const teacherData = {
    designation: 'Senior Professor',
    experience: '12 Years',
    classAssigned: 'Class A, Section B',
    officeHours: 'Mon-Wed 2:00 PM - 4:00 PM',
    subjectsTaught: [
      'Advanced Algorithms',
      'Data Structures',
      'Machine Learning',
      'Software Engineering'
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Teacher Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <Input value={user.employeeId || 'N/A'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={user.department || 'N/A'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input value={teacherData.designation} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input value={teacherData.experience} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input value={user.email} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Professional Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                <span>Class/Section Assigned</span>
              </div>
              <div className="font-medium">{teacherData.classAssigned}</div>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Office Hours</span>
              </div>
              <div className="font-medium">{teacherData.officeHours}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subjects Taught
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {teacherData.subjectsTaught.map((subject, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {subject}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
