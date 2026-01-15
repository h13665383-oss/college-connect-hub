import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Calendar, 
  Briefcase, 
  Award, 
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data
const upcomingEvents = [
  { id: 1, title: 'Tech Fest 2024', date: 'Jan 15', type: 'Event' },
  { id: 2, title: 'Campus Placement Drive', date: 'Jan 18', type: 'Placement' },
  { id: 3, title: 'Workshop: AI/ML', date: 'Jan 20', type: 'Workshop' },
];

const recentNotices = [
  { id: 1, title: 'Semester Exam Schedule Released', priority: 'urgent', date: '2 hours ago' },
  { id: 2, title: 'Library Timing Extended', priority: 'normal', date: '1 day ago' },
  { id: 3, title: 'Sports Day Registration Open', priority: 'normal', date: '2 days ago' },
];

const placementStats = {
  companies: 45,
  offers: 234,
  avgPackage: '8.5 LPA',
  highestPackage: '42 LPA',
};

const skillProgress = [
  { name: 'Web Development', progress: 75, status: 'ongoing' },
  { name: 'Data Structures', progress: 100, status: 'completed' },
  { name: 'Machine Learning', progress: 40, status: 'ongoing' },
];

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Active Events', 
      value: '12', 
      icon: Calendar, 
      change: '+3 this week',
      color: 'text-info' 
    },
    { 
      title: 'Companies Visiting', 
      value: '8', 
      icon: Briefcase, 
      change: 'Next: Google',
      color: 'text-success' 
    },
    { 
      title: 'Certifications', 
      value: '5', 
      icon: Award, 
      change: '2 in progress',
      color: 'text-warning' 
    },
    { 
      title: 'Pending Tasks', 
      value: '7', 
      icon: Clock, 
      change: '3 due today',
      color: 'text-destructive' 
    },
  ];

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-primary-foreground/80">
                Here's what's happening at your college today.
              </p>
            </div>
            <Button variant="glass" className="w-fit">
              <Bell className="w-4 h-4 mr-2" />
              3 New Notifications
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="stat-card hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Notices */}
          <Card className="lg:col-span-2 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                Recent Notices
              </CardTitle>
              <Link to="/notices">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotices.map((notice) => (
                <div 
                  key={notice.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`p-2 rounded-lg ${notice.priority === 'urgent' ? 'bg-destructive/10' : 'bg-info/10'}`}>
                    {notice.priority === 'urgent' ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <Bell className="w-5 h-5 text-info" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{notice.title}</p>
                    <p className="text-sm text-muted-foreground">{notice.date}</p>
                  </div>
                  <Badge variant={notice.priority === 'urgent' ? 'urgent' : 'info'}>
                    {notice.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Events
              </CardTitle>
              <Link to="/events">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex flex-col items-center justify-center">
                    <span className="text-xs text-muted-foreground">{event.date.split(' ')[0]}</span>
                    <span className="text-lg font-bold text-accent">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{event.title}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{event.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Placement & Skills Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement Overview */}
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Placement Overview
              </CardTitle>
              <Link to="/placements">
                <Button variant="ghost" size="sm">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-success/10 text-center">
                  <Users className="w-6 h-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{placementStats.companies}</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
                <div className="p-4 rounded-xl bg-info/10 text-center">
                  <CheckCircle2 className="w-6 h-6 text-info mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{placementStats.offers}</p>
                  <p className="text-sm text-muted-foreground">Total Offers</p>
                </div>
                <div className="p-4 rounded-xl bg-warning/10 text-center">
                  <TrendingUp className="w-6 h-6 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{placementStats.avgPackage}</p>
                  <p className="text-sm text-muted-foreground">Avg Package</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/10 text-center">
                  <Award className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{placementStats.highestPackage}</p>
                  <p className="text-sm text-muted-foreground">Highest Package</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Progress */}
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Skill Progress
              </CardTitle>
              <Link to="/skills">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillProgress.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <Badge variant={skill.status === 'completed' ? 'success' : 'warning'}>
                      {skill.status}
                    </Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.status === 'completed' ? 'bg-success' : 'bg-accent'
                      }`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
