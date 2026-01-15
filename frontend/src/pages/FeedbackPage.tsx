import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  GraduationCap,
  Home,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy feedback data
const feedbackHistory = [
  {
    id: 1,
    title: 'Wi-Fi connectivity issues in Library',
    category: 'infrastructure',
    status: 'resolved',
    date: '2024-01-08',
    response: 'The Wi-Fi router has been replaced. Please check if the issue persists.',
  },
  {
    id: 2,
    title: 'Request for extended lab hours',
    category: 'academic',
    status: 'in_progress',
    date: '2024-01-06',
    response: 'Your request is under review with the department.',
  },
  {
    id: 3,
    title: 'Hostel room AC not working',
    category: 'hostel',
    status: 'submitted',
    date: '2024-01-10',
    response: null,
  },
];

const categories = [
  { id: 'infrastructure', label: 'Infrastructure', icon: Building, color: 'text-info' },
  { id: 'academic', label: 'Academic', icon: GraduationCap, color: 'text-success' },
  { id: 'hostel', label: 'Hostel', icon: Home, color: 'text-warning' },
  { id: 'other', label: 'Other', icon: HelpCircle, color: 'text-muted-foreground' },
];

export default function FeedbackPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Feedback Submitted',
      description: 'Your feedback has been submitted successfully. You will receive updates via email.',
    });
    
    setTitle('');
    setDescription('');
    setCategory('');
    setIsSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'in_progress':
        return <Badge variant="warning">In Progress</Badge>;
      default:
        return <Badge variant="info">Submitted</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-warning animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-info" />;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.icon : HelpCircle;
  };

  return (
    <DashboardLayout pageTitle="Feedback">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback & Issue Tracking</h1>
          <p className="text-muted-foreground">Submit your feedback or report issues</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Submit Feedback Form */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Submit Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                          category === cat.id
                            ? 'border-accent bg-accent/10 shadow-md'
                            : 'border-border hover:border-accent/50 bg-card'
                        }`}
                      >
                        <cat.icon className={`w-5 h-5 ${category === cat.id ? 'text-accent' : cat.color}`} />
                        <span className={`text-sm font-medium ${category === cat.id ? 'text-accent' : 'text-foreground'}`}>
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of your feedback"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your feedback or issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback History */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Your Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackHistory.map((feedback, index) => {
                const CategoryIcon = getCategoryIcon(feedback.category);
                return (
                  <div 
                    key={feedback.id}
                    className="p-4 rounded-xl border border-border hover:border-accent/30 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 p-2 rounded-lg bg-muted">
                        {getStatusIcon(feedback.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-foreground text-sm">{feedback.title}</h4>
                          {getStatusBadge(feedback.status)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <CategoryIcon className="w-3 h-3" />
                          <span className="capitalize">{feedback.category}</span>
                          <span>•</span>
                          <span>{new Date(feedback.date).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric'
                          })}</span>
                        </div>
                        {feedback.response && (
                          <div className="p-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Response: </span>
                            {feedback.response}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {feedbackHistory.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No feedback submitted yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
