import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Upload, Video, Play, CheckCircle, AlertCircle } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface UploadVideoModalProps {
  onClose: () => void;
  onUpload: (videoData: any) => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [videoType, setVideoType] = useState<'training' | 'competition' | 'technique'>('training');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const events = [
    '100m', '200m', '400m', '800m', '1500m', '5000m', '10000m',
    '110m Hurdles', '400m Hurdles', 'Long Jump', 'High Jump', 
    'Triple Jump', 'Pole Vault', 'Shot Put', 'Discus', 'Javelin', 'Hammer Throw'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('video/')) {
        alert('Please select a video file');
        return;
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Auto-generate title if empty
      if (!videoTitle) {
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        setVideoTitle(fileName);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !videoTitle || !selectedEvent) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setUploadComplete(true);
          
          // Simulate successful upload
          setTimeout(() => {
            const videoData = {
              id: Date.now().toString(),
              title: videoTitle,
              description: videoDescription,
              event: selectedEvent,
              type: videoType,
              fileName: selectedFile.name,
              fileSize: selectedFile.size,
              uploadedAt: new Date().toISOString(),
              status: 'processing'
            };
            
            onUpload(videoData);
          }, 1000);
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVideoTypeColor = (type: string) => {
    switch (type) {
      case 'training': return athleticTechTheme.colors.primary.track;
      case 'competition': return athleticTechTheme.colors.primary.power;
      case 'technique': return athleticTechTheme.colors.events.sprints;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  if (uploadComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-6 text-center">
            <CheckCircle size={64} className="mx-auto mb-4" style={{ color: athleticTechTheme.colors.performance.excellent }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
              Upload Complete!
            </h3>
            <p className="mb-4" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Your video has been uploaded and sent to your coach for review. You'll receive feedback soon!
            </p>
            <Button 
              onClick={onClose}
              style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
            >
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Video size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Upload Training Video</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose} disabled={isUploading}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Video File *</Label>
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: athleticTechTheme.colors.interactive.border }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading}
              />
              
              {selectedFile ? (
                <div className="space-y-2">
                  <Video size={48} className="mx-auto" style={{ color: athleticTechTheme.colors.primary.track }} />
                  <div>
                    <p className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {selectedFile.name}
                    </p>
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled={isUploading}>
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload size={48} className="mx-auto" style={{ color: athleticTechTheme.colors.text.secondary }} />
                  <div>
                    <p className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Click to select video file
                    </p>
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Supports MP4, MOV, AVI (Max 100MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., Sprint Training Session"
                disabled={isUploading}
              />
            </div>
            
            <div>
              <Label>Event *</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent} disabled={isUploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Video Type</Label>
            <div className="flex space-x-3 mt-2">
              {(['training', 'competition', 'technique'] as const).map((type) => (
                <Button
                  key={type}
                  variant={videoType === type ? "default" : "outline"}
                  onClick={() => setVideoType(type)}
                  disabled={isUploading}
                  style={{
                    backgroundColor: videoType === type ? getVideoTypeColor(type) : 'transparent'
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Add any notes about this video, what you want feedback on, or specific areas of concern..."
              rows={3}
              disabled={isUploading}
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: athleticTechTheme.colors.text.secondary }}>Uploading...</span>
                <span style={{ color: athleticTechTheme.colors.text.secondary }}>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Upload Tips */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
            <div className="flex items-start space-x-2">
              <AlertCircle size={16} className="mt-0.5" style={{ color: athleticTechTheme.colors.primary.track }} />
              <div>
                <h4 className="font-medium mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Tips for Better Video Analysis:
                </h4>
                <ul className="text-sm space-y-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  <li>• Record from the side for running events</li>
                  <li>• Ensure good lighting and stable camera</li>
                  <li>• Include multiple attempts if possible</li>
                  <li>• Keep the athlete in frame throughout</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || !videoTitle || !selectedEvent || isUploading}
              style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadVideoModal;
