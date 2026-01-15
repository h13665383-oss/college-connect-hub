
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Trash2, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export interface Notice {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  date: string;
  author: string;
}

interface NoticeListProps {
  notices: Notice[];
  onDelete?: (id: number) => void;
}

export function NoticeList({ notices, onDelete }: NoticeListProps) {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <Card key={notice.id} className={`transition-all hover:shadow-md ${notice.priority === 'urgent' ? 'border-l-4 border-l-destructive' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg font-bold text-primary">
                    {notice.title}
                  </CardTitle>
                  {notice.priority === 'urgent' && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">{notice.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{notice.date}</span>
                  <span>•</span>
                  <span>Posted by {notice.author}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Download className="h-4 w-4" />
                </Button>
                {isTeacher && onDelete && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {notice.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
