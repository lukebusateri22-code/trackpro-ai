import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Upload, Video, FileVideo, CheckCircle, AlertCircle, 
  Zap, Wind, Thermometer, Target, Calendar, Clock, Trophy, Play, Pause, X
} from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface RecordPerformanceScreenProps {
  onClose: () => void;
}

const RecordPerformanceScreen: React.FC<RecordPerformanceScreenProps> = ({ onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [result, setResult] = useState('');
  const [competitionType, setCompetitionType] = useState<'practice' | 'competition'>('practice');
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Weather conditions
  const [temperature, setTemperature] = useState(70);
  const [windSpeed, setWindSpeed] = useState('0.0');
  
  // Video upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Video player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const events = {
    'Sprints': ['100m', '200m', '400m', '100m Hurdles', '110m Hurdles', '4x100m Relay', '4x400m Relay'],
    'Jumps': ['Long Jump', 'Triple Jump', 'High Jump', 'Pole Vault'],
    'Throws': ['Shot Put', 'Discus', 'Hammer', 'Javelin'],
    'Distance': ['800m', '1500m', '3000m Steeplechase', '5000m', '10000m']
  };

  // Enhanced file validation
  const validateFile = (file: File): string | null => {
    const validVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
    const maxSize = 500 * 1024 * 1024; // 500MB
    
    if (!validVideoTypes.includes(file.type)) {
      return 'Please upload a valid video file (MP4, MOV, AVI, WebM)';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 500MB';
    }
    
    return null;
  };
  
  // Process uploaded file
  const processFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }
    
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // Create video URL
      const url = URL.createObjectURL(file);
      
      // Wait for "upload" to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setSelectedFile(file);
        setVideoUrl(url);
        setIsUploading(false);
        setUploadSuccess(true);
        
        // Reset success state after 2 seconds
        setTimeout(() => setUploadSuccess(false), 2000);
      }, 500);
      
    } catch (error) {
      setUploadError('Failed to process video file');
      setIsUploading(false);
    }
  };
  
  // Drag and drop handlers
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnalyze = async () => {
    if (!selectedEvent || !result) {
      setUploadError('Please select an event and enter your result');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would typically send data to your AI analysis service
      alert(`Analysis complete for ${selectedEvent}: ${result}\nVideo: ${selectedFile ? 'Included' : 'Not included'}`);
      
      // Reset form after successful analysis
      setSelectedEvent('');
      setResult('');
      setNotes('');
      setSelectedFile(null);
      setVideoUrl(null);
      setCompetitionType('practice');
      setTemperature(70);
      setWindSpeed('0.0');
      
    } catch (error) {
      setUploadError('Failed to analyze performance. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: athleticTechTheme.gradients.hero,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Record Performance</h1>
              <p className="text-white/80">Log your results and get AI-powered insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="video">Video Upload</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Event & Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Selection */}
                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your event" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(events).map(([category, eventList]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                            {category}
                          </div>
                          {eventList.map((event) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Result Input */}
                <div className="space-y-2">
                  <Label htmlFor="result">Result</Label>
                  <Input
                    id="result"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="e.g., 11.24 (time), 6.45m (distance), 1.85m (height)"
                    className="text-lg"
                  />
                </div>

                {/* Competition Type */}
                <div className="space-y-3">
                  <Label>Type</Label>
                  <div className="flex gap-3">
                    <Button
                      variant={competitionType === 'practice' ? 'default' : 'outline'}
                      onClick={() => setCompetitionType('practice')}
                      className="flex-1"
                      style={competitionType === 'practice' ? { 
                        backgroundColor: athleticTechTheme.colors.primary.track,
                        color: 'white'
                      } : {}}
                    >
                      Practice
                    </Button>
                    <Button
                      variant={competitionType === 'competition' ? 'default' : 'outline'}
                      onClick={() => setCompetitionType('competition')}
                      className="flex-1"
                      style={competitionType === 'competition' ? { 
                        backgroundColor: athleticTechTheme.colors.events.jumps,
                        color: 'white'
                      } : {}}
                    >
                      Competition
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did you feel? Any observations about technique or conditions?"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Upload Tab */}
          <TabsContent value="video" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Video className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Performance Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {isUploading ? (
                      <div className="space-y-4">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                          style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
                        >
                          <Upload className="h-10 w-10 animate-pulse" style={{ color: athleticTechTheme.colors.primary.track }} />
                        </div>
                        <div>
                          <p className="text-xl font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Uploading Video...
                          </p>
                          <Progress value={uploadProgress} className="w-full max-w-sm mx-auto" />
                          <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {uploadProgress}% complete
                          </p>
                        </div>
                      </div>
                    ) : uploadSuccess ? (
                      <div className="space-y-4">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                          style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
                        >
                          <CheckCircle className="h-10 w-10" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                        </div>
                        <p className="text-xl font-semibold" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                          Upload Successful!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                          style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
                        >
                          <FileVideo className="h-10 w-10" style={{ color: athleticTechTheme.colors.primary.track }} />
                        </div>
                        <div>
                          <p className="text-xl font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Drop your performance video here
                          </p>
                          <p className="text-lg mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            or click to browse files
                          </p>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Supports MP4, MOV, AVI, WebM • Max 500MB
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {uploadError && (
                      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${athleticTechTheme.colors.performance.poor}10` }}>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.poor }} />
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.performance.poor }}>
                            {uploadError}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Video Preview */}
                    <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: '#000' }}>
                      <video
                        ref={videoRef}
                        src={videoUrl || undefined}
                        className="w-full h-80 object-contain"
                        onLoadedMetadata={handleVideoLoad}
                        onTimeUpdate={handleTimeUpdate}
                      />
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={togglePlayPause}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </Button>
                          
                          <div className="flex-1 flex items-center gap-3">
                            <span className="text-white text-sm">{formatTime(currentTime)}</span>
                            <div className="flex-1 bg-white/20 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${(currentTime / duration) * 100}%`,
                                  backgroundColor: athleticTechTheme.colors.primary.track
                                }}
                              />
                            </div>
                            <span className="text-white text-sm">{formatTime(duration)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* File Info */}
                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
                        >
                          <CheckCircle className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {selectedFile.name}
                          </p>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null);
                          setVideoUrl(null);
                          setUploadSuccess(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conditions Tab */}
          <TabsContent value="conditions" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Wind className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Weather Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temp" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Temperature (°F)
                    </Label>
                    <Input
                      id="temp"
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(parseInt(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wind" className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      Wind Speed (m/s)
                    </Label>
                    <Input
                      id="wind"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(e.target.value)}
                      placeholder="+1.2"
                      className="text-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analyze Button */}
        <Card className="border-0 shadow-lg mt-8" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
          <CardContent className="p-6">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedEvent || !result || isAnalyzing}
              className="w-full py-6 text-xl font-bold rounded-xl"
              style={{ 
                background: athleticTechTheme.gradients.speed,
                color: 'white'
              }}
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing Performance...
                </>
              ) : (
                <>
                  <Zap className="h-6 w-6 mr-3" />
                  Get AI Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecordPerformanceScreen;
