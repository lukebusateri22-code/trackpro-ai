import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, Video, FileVideo, CheckCircle, AlertCircle, 
  Play, Pause, Zap, Target, X, Camera, SkipBack, SkipForward, Wind 
} from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface VideoAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoAnalysisModal: React.FC<VideoAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  // Performance recording fields
  const [result, setResult] = useState('');
  const [competitionType, setCompetitionType] = useState<'practice' | 'competition'>('practice');
  const [temperature, setTemperature] = useState(70);
  const [windSpeed, setWindSpeed] = useState('0.0');
  const [notes, setNotes] = useState('');
  
  // Upload states
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

  const getEventSpecificMetrics = (event: string) => {
    const eventMetrics: { [key: string]: any } = {
      'Triple Jump': {
        phases: [
          { phase: 'Approach Speed', score: 8.2, feedback: 'Excellent acceleration with consistent rhythm throughout the approach run.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Hop Distance', score: 7.8, feedback: 'Good hop distance with strong takeoff, but slight imbalance affects optimal distance.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Step Distance', score: 7.5, feedback: 'Step phase shows good technique but could benefit from more aggressive forward momentum.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Jump Distance', score: 8.0, feedback: 'Final jump demonstrates excellent technique with good landing preparation.', color: athleticTechTheme.colors.performance.excellent }
        ],
        comparison: [
          { metric: 'Approach Speed', userValue: 9.2, eliteValue: 10.1, percentile: 78 },
          { metric: 'Hop Distance', userValue: 5.8, eliteValue: 6.4, percentile: 72 },
          { metric: 'Step Distance', userValue: 4.2, eliteValue: 4.8, percentile: 75 },
          { metric: 'Jump Distance', userValue: 4.8, eliteValue: 5.2, percentile: 80 },
          { metric: 'Total Distance', userValue: 14.8, eliteValue: 16.4, percentile: 76 }
        ]
      },
      'Pole Vault': {
        phases: [
          { phase: 'Approach Speed', score: 8.5, feedback: 'Excellent speed development with consistent acceleration pattern.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Plant & Takeoff', score: 7.2, feedback: 'Good plant technique but timing could be improved for optimal energy transfer.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Swing & Inversion', score: 7.8, feedback: 'Strong swing phase with good body position during inversion.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Extension & Clearance', score: 8.1, feedback: 'Excellent extension and bar clearance with controlled landing.', color: athleticTechTheme.colors.performance.excellent }
        ],
        comparison: [
          { metric: 'Approach Speed', userValue: 9.8, eliteValue: 10.5, percentile: 82 },
          { metric: 'Plant Angle', userValue: 18.5, eliteValue: 20.2, percentile: 78 },
          { metric: 'Pole Bend', userValue: 4.2, eliteValue: 4.8, percentile: 75 },
          { metric: 'Height Cleared', userValue: 4.60, eliteValue: 5.20, percentile: 73 }
        ]
      },
      'High Jump': {
        phases: [
          { phase: 'Approach', score: 8.0, feedback: 'The approach was consistent with good speed, but there is room for improvement in the rhythm to enhance the take-off.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Take-off', score: 7.0, feedback: 'The take-off showed strong power, but the timing was slightly off, affecting the height achieved.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Flight', score: 7.5, feedback: 'Body control was good, but the arching technique needs refinement to maximize clearance.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Landing', score: 8.0, feedback: 'Landing was controlled and safe, with minimal impact on performance.', color: athleticTechTheme.colors.performance.excellent }
        ],
        comparison: [
          { metric: 'Height Cleared', userValue: 2.02, eliteValue: 2.4, percentile: 70 },
          { metric: 'Approach Speed', userValue: 8.5, eliteValue: 9.5, percentile: 80 },
          { metric: 'Take-off Power', userValue: 7.8, eliteValue: 9.0, percentile: 75 },
          { metric: 'Body Control', userValue: 7.5, eliteValue: 8.5, percentile: 70 }
        ]
      },
      'Long Jump': {
        phases: [
          { phase: 'Approach Speed', score: 8.3, feedback: 'Excellent acceleration with consistent speed maintenance through approach.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Takeoff', score: 7.6, feedback: 'Good takeoff technique with strong vertical impulse, slight forward lean could be improved.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Flight', score: 7.9, feedback: 'Strong flight technique with good body position and landing preparation.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Landing', score: 8.2, feedback: 'Excellent landing technique maximizing distance with controlled finish.', color: athleticTechTheme.colors.performance.excellent }
        ],
        comparison: [
          { metric: 'Approach Speed', userValue: 9.5, eliteValue: 10.2, percentile: 82 },
          { metric: 'Takeoff Angle', userValue: 18.2, eliteValue: 20.0, percentile: 75 },
          { metric: 'Flight Distance', userValue: 6.45, eliteValue: 7.20, percentile: 78 },
          { metric: 'Technical Score', userValue: 7.8, eliteValue: 8.9, percentile: 72 }
        ]
      },
      '100m': {
        phases: [
          { phase: 'Start', score: 9.0, feedback: 'Outstanding reaction time and explosive drive phase with optimal body angle.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Acceleration', score: 8.5, feedback: 'Strong acceleration with good progressive upright transition.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Max Velocity', score: 8.8, feedback: 'Excellent top speed with efficient mechanics and relaxed running.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Finish', score: 6.5, feedback: 'Noticeable deceleration in final phase - focus on speed endurance.', color: athleticTechTheme.colors.performance.average }
        ],
        comparison: [
          { metric: 'Reaction Time', userValue: 0.142, eliteValue: 0.130, percentile: 85 },
          { metric: '30m Split', userValue: 3.95, eliteValue: 3.78, percentile: 82 },
          { metric: 'Top Speed', userValue: 11.8, eliteValue: 12.2, percentile: 88 },
          { metric: 'Final Time', userValue: 10.85, eliteValue: 9.58, percentile: 75 }
        ]
      }
    };
    
    return eventMetrics[event] || eventMetrics['High Jump'];
  };
  
  const generateAnalysis = (event: string, result: string) => {
    const eventData = getEventSpecificMetrics(event);
    
    return {
      event: event,
      result: result,
      overallScore: 7.8,
      strengths: [
        'Consistent technical execution',
        'Strong power development',
        'Good competitive mindset'
      ],
      focusAreas: [
        'Timing optimization needed',
        'Technique refinement opportunities',
        'Consistency under pressure'
      ],
      recommendations: [
        '**Technical Drills:** Focus on event-specific technique drills to improve weak phases.',
        '**Strength Training:** Implement targeted strength training for power development.',
        '**Mental Training:** Work on competition focus and pressure management.',
        '**Video Review:** Regular video analysis to track technical improvements.'
      ],
      technicalBreakdown: eventData.phases,
      comparison: eventData.comparison
    };
  };

  const analyzeVideo = async () => {
    if (!selectedEvent || !selectedFile) {
      setUploadError('Please select an event and upload a video');
      return;
    }
    
    if (!result) {
      setUploadError('Please enter your performance result');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analysis = generateAnalysis(selectedEvent, result);
      
      // Save performance data to profile (this would typically go to a database)
      const performanceRecord = {
        id: Date.now().toString(),
        event: selectedEvent,
        result: result,
        competitionType: competitionType,
        weather: {
          temperature: temperature,
          windSpeed: windSpeed
        },
        notes: notes,
        videoFile: selectedFile.name,
        analysis: analysis,
        date: new Date().toISOString()
      };
      
      // Store in localStorage for demo (in real app, this would go to Supabase)
      const existingRecords = JSON.parse(localStorage.getItem('performanceRecords') || '[]');
      existingRecords.push(performanceRecord);
      localStorage.setItem('performanceRecords', JSON.stringify(existingRecords));
      
      console.log('Performance record saved:', performanceRecord);

      setAnalysisResult(analysis);
    } catch (error) {
      setUploadError('Failed to analyze video. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetModal = () => {
    setSelectedEvent('');
    setSelectedFile(null);
    setVideoUrl(null);
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    // Reset performance recording fields
    setResult('');
    setCompetitionType('practice');
    setTemperature(70);
    setWindSpeed('0.0');
    setNotes('');
    
    // Reset upload states
    setIsDragOver(false);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
        <DialogHeader className="border-b pb-4" style={{ borderColor: athleticTechTheme.colors.interactive.border }}>
          <DialogTitle className="flex items-center gap-3" style={{ color: athleticTechTheme.colors.text.primary }}>
            <div 
              className="p-2 rounded-xl"
              style={{ background: athleticTechTheme.gradients.tech }}
            >
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">AI Video Analysis</span>
              <p className="text-sm font-normal" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Upload your performance video for detailed technical analysis
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {!analysisResult ? (
            <div className="space-y-6">
              {/* Event Selection */}
              <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <CardHeader>
                  <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                    Select Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your event" />
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
                </CardContent>
              </Card>

              {/* Video Upload */}
              <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <CardHeader>
                  <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                    Upload Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!selectedFile ? (
                    <div
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
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
                            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                            style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
                          >
                            <Upload className="h-8 w-8 animate-pulse" style={{ color: athleticTechTheme.colors.primary.track }} />
                          </div>
                          <div>
                            <p className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                              Uploading Video...
                            </p>
                            <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                            <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {uploadProgress}% complete
                            </p>
                          </div>
                        </div>
                      ) : uploadSuccess ? (
                        <div className="space-y-4">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                            style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
                          >
                            <CheckCircle className="h-8 w-8" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                          </div>
                          <p className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                            Upload Successful!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                            style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
                          >
                            <FileVideo className="h-8 w-8" style={{ color: athleticTechTheme.colors.primary.track }} />
                          </div>
                          <div>
                            <p className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                              Drop your video here or click to browse
                            </p>
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Supports MP4, MOV, AVI, WebM • Max 500MB
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {uploadError && (
                        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${athleticTechTheme.colors.performance.poor}10` }}>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" style={{ color: athleticTechTheme.colors.performance.poor }} />
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.performance.poor }}>
                              {uploadError}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Video Preview */}
                      <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: '#000' }}>
                        <video
                          ref={videoRef}
                          src={videoUrl || undefined}
                          className="w-full h-64 object-contain"
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
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            
                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-white text-sm">{formatTime(currentTime)}</span>
                              <div className="flex-1 bg-white/20 rounded-full h-1">
                                <div 
                                  className="h-1 rounded-full transition-all duration-300"
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
                      <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
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

              {/* Performance Recording */}
              <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                    Performance Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Result Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Result *
                    </label>
                    <input
                      type="text"
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      placeholder="e.g., 10.85s, 6.45m, 2.02m, 14.8m (for triple jump)"
                      className="w-full px-4 py-3 text-lg rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                    />
                  </div>

                  {/* Competition Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Type
                    </label>
                    <div className="flex gap-3">
                      <Button
                        type="button"
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
                        type="button"
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

                  {/* Weather Conditions */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      <Wind className="h-4 w-4" />
                      Weather Conditions
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Temperature (°F)
                        </label>
                        <input
                          type="number"
                          value={temperature}
                          onChange={(e) => setTemperature(parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Wind Speed (m/s)
                        </label>
                        <input
                          type="text"
                          value={windSpeed}
                          onChange={(e) => setWindSpeed(e.target.value)}
                          placeholder="+1.2"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How did you feel? Any observations about technique or conditions?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
                      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Analyze Button */}
              <Button
                onClick={analyzeVideo}
                disabled={!selectedEvent || !selectedFile || !result || isAnalyzing}
                className="w-full py-6 text-lg font-semibold rounded-xl"
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
            </div>
          ) : (
            /* Analysis Results */
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white"
                      style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                    >
                      {analysisResult.overallScore}
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {analysisResult.event} Analysis
                    </h3>
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Strong performance with clear areas for improvement
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Breakdown */}
              <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <CardHeader>
                  <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                    Technical Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.technicalBreakdown.map((phase: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {phase.phase}
                        </h4>
                        <Badge 
                          className="text-white font-bold"
                          style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                        >
                          {phase.score}/10
                        </Badge>
                      </div>
                      <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {phase.feedback}
                      </p>
                      <Progress value={(phase.score / 10) * 100} className="mt-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Elite Comparison & Recommendations */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.events.jumps }} />
                      Elite Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysisResult.comparison.map((metric: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {metric.metric}
                          </span>
                          <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {metric.percentile}th percentile
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>You: <strong>{metric.userValue}</strong></span>
                          <span>Elite: <strong>{metric.eliteValue}</strong></span>
                        </div>
                        <Progress value={metric.percentile} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                  <CardHeader>
                    <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                      Priority Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5"
                            style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                          >
                            {index + 1}
                          </div>
                          <span className="text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Button 
                onClick={resetModal} 
                variant="outline" 
                className="w-full py-4 text-lg"
                style={{ borderColor: athleticTechTheme.colors.interactive.border }}
              >
                Analyze Another Video
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { VideoAnalysisModal };
