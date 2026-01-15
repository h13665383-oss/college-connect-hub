import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award,
  BookOpen,
  Upload,
  ExternalLink,
  Clock,
  CheckCircle2,
  TrendingUp,
  Target,
  Plus
} from 'lucide-react';

// Dummy skills data
const skills = [
  {
    id: 1,
    name: 'Web Development',
    category: 'Technical',
    progress: 75,
    courses: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
    completedCourses: 3,
    status: 'ongoing',
    hours: 45,
  },
  {
    id: 2,
    name: 'Data Structures & Algorithms',
    category: 'Technical',
    progress: 100,
    courses: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'DP'],
    completedCourses: 5,
    status: 'completed',
    hours: 60,
  },
  {
    id: 3,
    name: 'Machine Learning',
    category: 'Technical',
    progress: 40,
    courses: ['Python Basics', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    completedCourses: 2,
    status: 'ongoing',
    hours: 25,
  },
  {
    id: 4,
    name: 'Communication Skills',
    category: 'Soft Skills',
    progress: 80,
    courses: ['Public Speaking', 'Business Writing', 'Presentation'],
    completedCourses: 2,
    status: 'ongoing',
    hours: 20,
  },
  {
    id: 5,
    name: 'Cloud Computing',
    category: 'Technical',
    progress: 30,
    courses: ['AWS Basics', 'Docker', 'Kubernetes', 'DevOps'],
    completedCourses: 1,
    status: 'ongoing',
    hours: 15,
  },
];

const certifications = [
  {
    id: 1,
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024-01-05',
    status: 'completed',
    credentialId: 'AWS-CP-12345',
    link: '#',
  },
  {
    id: 2,
    name: 'Google Data Analytics',
    issuer: 'Google',
    date: '2023-12-15',
    status: 'completed',
    credentialId: 'GDA-67890',
    link: '#',
  },
  {
    id: 3,
    name: 'Meta React Developer',
    issuer: 'Meta',
    date: null,
    status: 'ongoing',
    progress: 60,
    link: '#',
  },
  {
    id: 4,
    name: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    date: null,
    status: 'pending',
    progress: 0,
    link: '#',
  },
];

const stats = [
  { label: 'Skills Learning', value: '5', icon: BookOpen, color: 'text-accent' },
  { label: 'Certifications', value: '4', icon: Award, color: 'text-success' },
  { label: 'Hours Spent', value: '165', icon: Clock, color: 'text-warning' },
  { label: 'Completion Rate', value: '78%', icon: Target, color: 'text-info' },
];

export default function SkillsPage() {
  return (
    <DashboardLayout pageTitle="Skills">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Skill Development & Certifications</h1>
            <p className="text-muted-foreground">Track your learning progress and achievements</p>
          </div>
          <Button variant="accent">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
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

        <Tabs defaultValue="skills" className="w-full">
          <TabsList>
            <TabsTrigger value="skills">Skills Progress</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <Card 
                  key={skill.id} 
                  className="hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Skill Icon */}
                      <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                        skill.status === 'completed' ? 'bg-success/10' : 'bg-accent/10'
                      }`}>
                        {skill.status === 'completed' ? (
                          <CheckCircle2 className="w-7 h-7 text-success" />
                        ) : (
                          <TrendingUp className="w-7 h-7 text-accent" />
                        )}
                      </div>

                      {/* Skill Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{skill.name}</h3>
                            <p className="text-sm text-muted-foreground">{skill.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={skill.status === 'completed' ? 'success' : 'warning'}>
                              {skill.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {skill.hours} hrs spent
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              {skill.completedCourses}/{skill.courses.length} courses completed
                            </span>
                            <span className="text-sm font-medium text-foreground">{skill.progress}%</span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                        </div>

                        {/* Course Tags */}
                        <div className="flex flex-wrap gap-2">
                          {skill.courses.map((course, i) => (
                            <Badge 
                              key={course} 
                              variant={i < skill.completedCourses ? 'success' : 'secondary'}
                              className="text-xs"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="mt-6">
            <div className="space-y-4">
              {/* Upload Section */}
              <Card className="border-dashed border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Upload Certificate</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop or click to upload your certification
                  </p>
                  <Button variant="outline">Choose File</Button>
                </CardContent>
              </Card>

              {/* Certifications List */}
              <div className="grid gap-4 md:grid-cols-2">
                {certifications.map((cert, index) => (
                  <Card 
                    key={cert.id} 
                    className="hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 p-3 rounded-xl ${
                          cert.status === 'completed' 
                            ? 'bg-success/10' 
                            : cert.status === 'ongoing'
                            ? 'bg-warning/10'
                            : 'bg-muted'
                        }`}>
                          <Award className={`w-6 h-6 ${
                            cert.status === 'completed' 
                              ? 'text-success' 
                              : cert.status === 'ongoing'
                              ? 'text-warning'
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{cert.name}</h3>
                            <Badge variant={
                              cert.status === 'completed' 
                                ? 'success' 
                                : cert.status === 'ongoing'
                                ? 'warning'
                                : 'secondary'
                            }>
                              {cert.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                          
                          {cert.status === 'completed' ? (
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">
                                Issued: {new Date(cert.date!).toLocaleDateString('en-US', { 
                                  month: 'short', day: 'numeric', year: 'numeric' 
                                })}
                              </p>
                              <p className="text-muted-foreground">
                                Credential ID: <span className="text-foreground">{cert.credentialId}</span>
                              </p>
                            </div>
                          ) : cert.status === 'ongoing' ? (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium text-foreground">{cert.progress}%</span>
                              </div>
                              <Progress value={cert.progress!} className="h-1.5" />
                            </div>
                          ) : null}

                          {cert.status === 'completed' && (
                            <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
