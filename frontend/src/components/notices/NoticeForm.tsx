
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, Plus } from 'lucide-react';

interface NoticeFormProps {
  onUpload: (notice: any) => void;
}

export function NoticeForm({ onUpload }: NoticeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    onUpload({
      title,
      description,
      file,
      // Date and author handled by parent or backend
    });

    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <Card className="mb-8 border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Plus className="h-5 w-5" />
          Upload New Notice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Notice Title</Label>
              <Input 
                id="title" 
                placeholder="Enter notice title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Attachment (Optional)</Label>
              <div className="flex gap-2">
                <Input 
                  id="file" 
                  type="file" 
                  className="cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter notice details..." 
              className="min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Upload className="h-4 w-4" />
              Publish Notice
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
