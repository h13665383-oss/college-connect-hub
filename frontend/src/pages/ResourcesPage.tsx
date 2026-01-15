import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen,
  FileText,
  Download,
  Search,
  ChevronRight,
  ChevronDown,
  File,
  FileVideo,
  FileImage,
  Upload
} from 'lucide-react';

// Dummy resources data
const subjects = [
  {
    id: 1,
    name: 'Data Structures',
    code: 'CS201',
    files: [
      { id: 1, name: 'Lecture Notes - Arrays.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-05' },
      { id: 2, name: 'Linked Lists Tutorial.pdf', type: 'pdf', size: '1.8 MB', date: '2024-01-03' },
      { id: 3, name: 'Trees & Graphs.pptx', type: 'ppt', size: '5.2 MB', date: '2024-01-02' },
      { id: 4, name: 'Dynamic Programming Video.mp4', type: 'video', size: '125 MB', date: '2023-12-28' },
    ],
  },
  {
    id: 2,
    name: 'Database Management',
    code: 'CS301',
    files: [
      { id: 5, name: 'SQL Basics.pdf', type: 'pdf', size: '1.2 MB', date: '2024-01-08' },
      { id: 6, name: 'Normalization Concepts.pdf', type: 'pdf', size: '890 KB', date: '2024-01-06' },
      { id: 7, name: 'ER Diagrams.png', type: 'image', size: '450 KB', date: '2024-01-04' },
    ],
  },
  {
    id: 3,
    name: 'Operating Systems',
    code: 'CS302',
    files: [
      { id: 8, name: 'Process Management.pdf', type: 'pdf', size: '3.1 MB', date: '2024-01-07' },
      { id: 9, name: 'Memory Management.pdf', type: 'pdf', size: '2.8 MB', date: '2024-01-05' },
      { id: 10, name: 'Deadlock Handling.pptx', type: 'ppt', size: '4.5 MB', date: '2024-01-03' },
    ],
  },
  {
    id: 4,
    name: 'Computer Networks',
    code: 'CS401',
    files: [
      { id: 11, name: 'OSI Model.pdf', type: 'pdf', size: '1.5 MB', date: '2024-01-09' },
      { id: 12, name: 'TCP IP Protocol.pdf', type: 'pdf', size: '2.2 MB', date: '2024-01-07' },
    ],
  },
  {
    id: 5,
    name: 'Machine Learning',
    code: 'CS501',
    files: [
      { id: 13, name: 'Introduction to ML.pdf', type: 'pdf', size: '4.2 MB', date: '2024-01-10' },
      { id: 14, name: 'Linear Regression.ipynb', type: 'file', size: '156 KB', date: '2024-01-08' },
      { id: 15, name: 'Neural Networks Basics.mp4', type: 'video', size: '230 MB', date: '2024-01-06' },
    ],
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState<number[]>([1]);

  const toggleSubject = (id: number) => {
    setExpandedSubjects(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'ppt':
        return FileText;
      case 'video':
        return FileVideo;
      case 'image':
        return FileImage;
      default:
        return File;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'text-destructive';
      case 'ppt':
        return 'text-warning';
      case 'video':
        return 'text-info';
      case 'image':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.files.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalFiles = subjects.reduce((acc, sub) => acc + sub.files.length, 0);

  return (
    <DashboardLayout pageTitle="Resources">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cloud Resources</h1>
            <p className="text-muted-foreground">Access study materials and notes</p>
          </div>
          <Button variant="accent">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{subjects.length}</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/10 text-info">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalFiles}</p>
                <p className="text-xs text-muted-foreground">Total Files</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground">Downloads</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10 text-warning">
                <FileVideo className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Video Lectures</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects or files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        

        <div className="space-y-3">
          {filteredSubjects.map((subject, index) => {
            const isExpanded = expandedSubjects.includes(subject.id);
            return (
              <Card 
                key={subject.id} 
                className="overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FolderOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{subject.name}</h3>
                      <Badge variant="secondary" className="text-xs">{subject.code}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{subject.files.length} files</p>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-muted/30">
                    {subject.files.map((file) => {
                      const FileIcon = getFileIcon(file.type);
                      return (
                        <div 
                          key={file.id}
                          className="flex items-center gap-3 p-3 pl-14 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                        >
                          <FileIcon className={`w-4 h-4 ${getFileColor(file.type)}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • {new Date(file.date).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric'
                              })}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
