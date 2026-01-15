import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell, GraduationCap, Calendar, Briefcase, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NoticeList, Notice } from '@/components/notices/NoticeList';
import { NoticeForm } from '@/components/notices/NoticeForm';
import { useToast } from '@/hooks/use-toast';

// Initial dummy data
const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'Semester Examination Schedule - January 2024',
    description: 'The semester examination schedule has been released. All students are requested to check their respective timetables and prepare accordingly.',
    category: 'exam',
    priority: 'urgent',
    date: '2024-01-10',
    author: 'Examination Department',
  },
  {
    id: 2,
    title: 'Campus Placement Drive - Google',
    description: 'Google will be conducting a campus placement drive on January 18th. Eligible students from CSE, IT, and ECE departments can apply.',
    category: 'placement',
    priority: 'urgent',
    date: '2024-01-09',
    author: 'Placement Cell',
  },
  {
    id: 3,
    title: 'Library Extended Hours During Exams',
    description: 'The central library will remain open 24/7 during the examination period. Students are encouraged to utilize this facility.',
    category: 'academic',
    priority: 'normal',
    date: '2024-01-08',
    author: 'Library Department',
  },
  {
    id: 4,
    title: 'Annual Tech Fest - Registration Open',
    description: 'Registrations for TechFest 2024 are now open. Participate in various technical and non-technical events.',
    category: 'event',
    priority: 'normal',
    date: '2024-01-07',
    author: 'Student Council',
  },
  {
    id: 5,
    title: 'Fee Payment Deadline Extended',
    description: 'The deadline for fee payment has been extended to January 20th. Students are requested to clear their dues before the deadline.',
    category: 'academic',
    priority: 'normal',
    date: '2024-01-06',
    author: 'Accounts Department',
  },
  {
    id: 6,
    title: 'Internship Opportunities - Microsoft',
    description: 'Microsoft is offering summer internship opportunities for pre-final year students. Apply through the placement portal.',
    category: 'placement',
    priority: 'normal',
    date: '2024-01-05',
    author: 'Placement Cell',
  },
];

const categories = [
  { id: 'all', label: 'All', icon: Bell },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
  { id: 'exam', label: 'Examination', icon: Calendar },
  { id: 'placement', label: 'Placement', icon: Briefcase },
  { id: 'event', label: 'Events', icon: Info },
];

export default function NoticesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isTeacher = user?.role === 'teacher';

  const handleUpload = (newNoticeData: any) => {
    const newNotice: Notice = {
      id: Date.now(),
      title: newNoticeData.title,
      description: newNoticeData.description,
      category: newNoticeData.category || 'academic',
      priority: newNoticeData.priority || 'normal',
      date: new Date().toISOString().split('T')[0],
      author: `${user?.name || 'Teacher'} (${user?.department || 'General'})`,
    };

    setNotices([newNotice, ...notices]);
    toast({
      title: 'Notice Published',
      description: 'The notice has been successfully published to all students.',
    });
  };

  const handleDelete = (id: number) => {
    setNotices(notices.filter(n => n.id !== id));
    toast({
      title: 'Notice Deleted',
      description: 'The notice has been removed.',
      variant: 'destructive',
    });
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout pageTitle="Notices & Announcements">
      <div className="space-y-6">
        
        {/* Teacher Only: Upload Section */}
        {isTeacher && (
          <NoticeForm onUpload={handleUpload} />
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b">
           <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Notices List */}
        <NoticeList notices={filteredNotices} onDelete={isTeacher ? handleDelete : undefined} />
      </div>
    </DashboardLayout>
  );
}
