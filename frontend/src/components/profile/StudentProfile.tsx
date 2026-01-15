
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User as UserIcon, GraduationCap, BookOpen, Percent, Activity } from 'lucide-react';
import { User } from '@/contexts/AuthContext';

interface StudentProfileProps {
  user: User;
}

export function StudentProfile({ user }: StudentProfileProps) {
  // Mock data for student-specific fields not in AuthContext
  const studentData = {
    semester: '6th',
    cgpa: '8.5',
    attendance: '92%',
    academicStatus: 'Good Standing',
    subjects: [
      'Advanced Algorithms',
      'Database Management Systems',
      'Computer Networks',
      'Artificial Intelligence',
      'Web Development'
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Roll Number</Label>
              <Input value={user.studentId || 'N/A'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={user.department || 'N/A'} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input value={studentData.semester} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Academic Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Activity className="h-4 w-4" />
                <span>CGPA</span>
              </div>
              <div className="text-2xl font-bold">{studentData.cgpa}</div>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Percent className="h-4 w-4" />
                <span>Attendance</span>
              </div>
              <div className="text-2xl font-bold">{studentData.attendance}</div>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Status</span>
              </div>
              <Badge variant="default" className="text-sm">
                {studentData.academicStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Enrolled Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {studentData.subjects.map((subject, index) => (
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
