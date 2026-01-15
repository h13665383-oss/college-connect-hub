import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

// Dummy events data
const events = [
  {
    id: 1,
    title: 'Tech Fest 2024',
    description: 'Annual technical festival featuring coding competitions, hackathons, robotics, and more.',
    date: '2024-01-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Auditorium & Labs',
    type: 'festival',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'AI/ML Workshop',
    description: 'Hands-on workshop on Machine Learning fundamentals and practical applications.',
    date: '2024-01-20',
    time: '10:00 AM - 4:00 PM',
    location: 'Computer Lab 3',
    type: 'workshop',
    attendees: 60,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Campus Placement Drive',
    description: 'Multiple companies including Google, Microsoft, and Amazon will be visiting.',
    date: '2024-01-18',
    time: '9:00 AM - 5:00 PM',
    location: 'Placement Block',
    type: 'placement',
    attendees: 200,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Sports Day',
    description: 'Annual sports day with various indoor and outdoor games and competitions.',
    date: '2024-01-25',
    time: '8:00 AM - 5:00 PM',
    location: 'Sports Complex',
    type: 'sports',
    attendees: 1000,
    image: 'https://images.unsplash.com/photo-1461896836934- voices-in-your-head?w=400',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Cultural Night',
    description: 'Evening of music, dance, and cultural performances by students.',
    date: '2024-01-28',
    time: '6:00 PM - 10:00 PM',
    location: 'Open Air Theatre',
    type: 'cultural',
    attendees: 800,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    status: 'upcoming',
  },
];

const pastEvents = [
  {
    id: 6,
    title: 'Orientation Day',
    description: 'Welcome ceremony for new batch of students.',
    date: '2024-01-02',
    time: '10:00 AM - 1:00 PM',
    location: 'Main Auditorium',
    type: 'orientation',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400',
    status: 'completed',
  },
];

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function EventsPage() {
  const [currentMonth] = useState('January 2024');

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-accent/10 text-accent border-accent/20';
      case 'workshop': return 'bg-info/10 text-info border-info/20';
      case 'placement': return 'bg-success/10 text-success border-success/20';
      case 'sports': return 'bg-warning/10 text-warning border-warning/20';
      case 'cultural': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const eventsOnDay = (day: number) => {
    return events.filter(e => new Date(e.date).getDate() === day);
  };

  return (
    <DashboardLayout pageTitle="Events">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Events & Activities</h1>
            <p className="text-muted-foreground">Discover and register for upcoming college events</p>
          </div>
          <Button variant="accent">
            <Calendar className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list" className="mt-6">
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event, index) => (
                    <Card 
                      key={event.id} 
                      className="overflow-hidden hover-lift animate-slide-up group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <Badge 
                          className={`absolute top-3 right-3 ${getEventTypeColor(event.type)} capitalize`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} expected</span>
                          </div>
                        </div>
                        <Button variant="accent" className="w-full mt-4">
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Past Events */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Past Events</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden opacity-75">
                      <div className="relative h-32 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-foreground/40" />
                        <Badge variant="secondary" className="absolute top-3 right-3">
                          Completed
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-lg font-semibold text-foreground">{currentMonth}</h3>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {/* Empty cells for first week offset */}
                  <div className="p-2" />
                  {calendarDays.map((day) => {
                    const dayEvents = eventsOnDay(day);
                    return (
                      <div 
                        key={day}
                        className={`min-h-[80px] p-2 rounded-lg border ${
                          dayEvents.length > 0 
                            ? 'border-accent/50 bg-accent/5' 
                            : 'border-border hover:bg-muted/50'
                        } transition-colors cursor-pointer`}
                      >
                        <span className={`text-sm ${dayEvents.length > 0 ? 'font-bold text-accent' : 'text-foreground'}`}>
                          {day}
                        </span>
                        {dayEvents.slice(0, 2).map((event) => (
                          <div 
                            key={event.id}
                            className={`mt-1 text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
