import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Building,
  ArrowRight,
  Filter,
  TrendingUp
} from 'lucide-react';

// Dummy placement data
const companies = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png',
    role: 'Software Engineer',
    type: 'Full Time',
    package: '45 LPA',
    location: 'Bangalore',
    eligibility: 'CSE, IT, ECE | 7.0+ CGPA',
    deadline: '2024-01-18',
    openings: 10,
    applicants: 156,
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png',
    role: 'Cloud Engineer',
    type: 'Full Time',
    package: '38 LPA',
    location: 'Hyderabad',
    eligibility: 'CSE, IT | 7.5+ CGPA',
    deadline: '2024-01-20',
    openings: 15,
    applicants: 134,
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png',
    role: 'SDE Intern',
    type: 'Internship',
    package: '1.2 LPM',
    location: 'Bangalore',
    eligibility: 'Pre-final Year | 6.5+ CGPA',
    deadline: '2024-01-22',
    openings: 25,
    applicants: 210,
  },
  {
    id: 4,
    name: 'Flipkart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Flipkart_logo.svg/120px-Flipkart_logo.svg.png',
    role: 'Data Analyst',
    type: 'Full Time',
    package: '18 LPA',
    location: 'Bangalore',
    eligibility: 'All Branches | 6.0+ CGPA',
    deadline: '2024-01-25',
    openings: 20,
    applicants: 89,
  },
  {
    id: 5,
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/120px-Infosys_logo.svg.png',
    role: 'System Engineer',
    type: 'Full Time',
    package: '6.5 LPA',
    location: 'Multiple',
    eligibility: 'All Branches | 6.0+ CGPA',
    deadline: '2024-01-28',
    openings: 100,
    applicants: 312,
  },
  {
    id: 6,
    name: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/120px-Tata_Consultancy_Services_Logo.svg.png',
    role: 'Ninja Developer',
    type: 'Full Time',
    package: '7 LPA',
    location: 'Multiple',
    eligibility: 'All Branches | 6.0+ CGPA',
    deadline: '2024-01-30',
    openings: 200,
    applicants: 456,
  },
];

const stats = [
  { label: 'Companies This Month', value: '12', icon: Building, color: 'text-accent' },
  { label: 'Total Openings', value: '370', icon: Users, color: 'text-success' },
  { label: 'Avg Package', value: '12 LPA', icon: DollarSign, color: 'text-warning' },
  { label: 'Placement Rate', value: '92%', icon: TrendingUp, color: 'text-info' },
];

export default function PlacementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || company.type.toLowerCase().includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout pageTitle="Placements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Placement & Internship Portal</h1>
            <p className="text-muted-foreground">Explore job opportunities from top companies</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'accent' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'full' ? 'accent' : 'outline'}
              onClick={() => setFilterType('full')}
            >
              Full Time
            </Button>
            <Button
              variant={filterType === 'intern' ? 'accent' : 'outline'}
              onClick={() => setFilterType('intern')}
            >
              Internship
            </Button>
          </div>
        </div>

        {/* Company Listings */}
        <div className="grid gap-4">
          {filteredCompanies.map((company, index) => (
            <Card 
              key={company.id} 
              className="hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Company Logo */}
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-muted flex items-center justify-center p-2">
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{company.name}</h3>
                        <p className="text-muted-foreground">{company.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={company.type === 'Internship' ? 'info' : 'success'}>
                          {company.type}
                        </Badge>
                        <Badge variant="accent" className="font-bold">
                          {company.package}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{company.openings} openings</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {new Date(company.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground font-medium">{company.applicants}</span> applied
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Eligibility:</span> {company.eligibility}
                      </p>
                      <Button variant="accent">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
