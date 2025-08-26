import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Upload, Zap, Play, Pause, SkipBack, SkipForward, Target, Crosshair } from 'lucide-react';

interface VideoAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalysisPoint {
  x: number;
  y: number;
  label: string;
  type: 'joint' | 'marker' | 'angle';
}

interface FreezeFrameData {
  timestamp: number;
  points: AnalysisPoint[];
  angles: { [key: string]: number };
  notes: string;
}

export const VideoAnalysisModal: React.FC<VideoAnalysisModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [freezeFrames, setFreezeFrames] = useState<FreezeFrameData[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<AnalysisPoint[]>([]);
  const [isMarkingMode, setIsMarkingMode] = useState(false);
  const [currentMarkingType, setCurrentMarkingType] = useState<'joint' | 'marker' | 'angle'>('joint');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const events = {
    'Sprints': ['100m', '200m', '400m', '100m Hurdles', '110m Hurdles', '4x100m Relay', '4x400m Relay'],
    'Jumps': ['Long Jump', 'Triple Jump', 'High Jump', 'Pole Vault'],
    'Throws': ['Shot Put', 'Discus', 'Hammer', 'Javelin'],
    'Distance': ['800m', '1500m', '3000m Steeplechase', '5000m', '10000m']
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/') && !file.type.startsWith('image/')) {
        alert('Please select a video or image file');
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
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

  const seekToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        
        const newFrame: FreezeFrameData = {
          timestamp: currentTime,
          points: [...selectedPoints],
          angles: {},
          notes: ''
        };
        
        setFreezeFrames(prev => [...prev, newFrame]);
        setIsMarkingMode(true);
      }
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMarkingMode || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    
    const newPoint: AnalysisPoint = {
      x,
      y,
      label: `${currentMarkingType}_${selectedPoints.length + 1}`,
      type: currentMarkingType
    };
    
    setSelectedPoints(prev => [...prev, newPoint]);
  };

  const drawAnalysisPoints = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    selectedPoints.forEach((point) => {
      ctx.fillStyle = point.type === 'joint' ? '#ff0000' : point.type === 'marker' ? '#00ff00' : '#0000ff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(point.label, point.x + 10, point.y - 10);
    });
  };

  React.useEffect(() => {
    drawAnalysisPoints();
  }, [selectedPoints]);

  const analyzeVideo = async () => {
    if (!selectedEvent || !selectedFile) {
      alert('Please select an event and upload a file');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        overall_score: 7.5,
        technique_breakdown: {
          phases: [
            { phase: 'Approach', score: 8.0, analysis: 'Good speed development and rhythm consistency' },
            { phase: 'Plant/Takeoff', score: 7.0, analysis: 'Solid technique but room for improvement in vertical impulse' },
            { phase: 'Flight', score: 7.5, analysis: 'Good body position maintenance throughout flight' }
          ]
        },
        biomechanical_insights: [
          'Joint angles within optimal range during takeoff phase',
          'Slight forward lean could be improved for better distance',
          'Arm swing coordination is excellent'
        ],
        recommendations: [
          'Focus on plyometric exercises to improve takeoff power',
          'Work on core strength for better flight position',
          'Practice approach consistency drills'
        ]
      };
      
      setAnalysisResult(mockAnalysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze video. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetModal = () => {
    setSelectedEvent('');
    setSelectedFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setVideoUrl(null);
    setFreezeFrames([]);
    setSelectedPoints([]);
    setIsMarkingMode(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-600" />
            Freeze Frame Video Analysis
          </DialogTitle>
        </DialogHeader>

        {!analysisResult ? (
          <div className="space-y-6">
            {/* Event Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Event Category & Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(events).map(([category, eventList]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-600">{category}</h4>
                      <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Select ${category}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {eventList.map(event => (
                            <SelectItem key={event} value={event}>{event}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Video or Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="p-4 bg-blue-100 rounded-full">
                          <Camera className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Video files up to 100MB or images up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">File uploaded successfully</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Player and Freeze Frame Analysis */}
            {videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Freeze Frame Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="player" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="player">Video Player</TabsTrigger>
                      <TabsTrigger value="analysis">Frame Analysis</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="player" className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          className="w-full h-auto max-h-96"
                          onLoadedMetadata={handleVideoLoad}
                          onTimeUpdate={handleTimeUpdate}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                      
                      {/* Video Controls */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => seekToTime(Math.max(0, currentTime - 0.1))}
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          
                          <Button onClick={togglePlayPause} size="lg">
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => seekToTime(Math.min(duration, currentTime + 0.1))}
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            onClick={captureFrame}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Capture Frame
                          </Button>
                        </div>
                        
                        {/* Timeline Slider */}
                        <div className="space-y-2">
                          <Slider
                            value={[currentTime]}
                            max={duration}
                            step={0.1}
                            onValueChange={([value]) => seekToTime(value)}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{currentTime.toFixed(1)}s</span>
                            <span>{duration.toFixed(1)}s</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="space-y-4">
                      {freezeFrames.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 mb-4">
                            <h4 className="font-medium">Marking Mode:</h4>
                            <div className="flex gap-2">
                              <Button
                                variant={currentMarkingType === 'joint' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentMarkingType('joint')}
                              >
                                <Crosshair className="h-4 w-4 mr-1" />
                                Joints
                              </Button>
                              <Button
                                variant={currentMarkingType === 'marker' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentMarkingType('marker')}
                              >
                                <Target className="h-4 w-4 mr-1" />
                                Markers
                              </Button>
                              <Button
                                variant={currentMarkingType === 'angle' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentMarkingType('angle')}
                              >
                                Angles
                              </Button>
                            </div>
                          </div>
                          
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <canvas
                              ref={canvasRef}
                              onClick={handleCanvasClick}
                              className="w-full h-auto max-h-96 cursor-crosshair"
                            />
                          </div>
                          
                          {selectedPoints.length > 0 && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Analysis Points ({selectedPoints.length})</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                {selectedPoints.map((point, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div 
                                      className={`w-3 h-3 rounded-full ${
                                        point.type === 'joint' ? 'bg-red-500' : 
                                        point.type === 'marker' ? 'bg-green-500' : 'bg-blue-500'
                                      }`}
                                    />
                                    <span>{point.label}</span>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setSelectedPoints([])}
                              >
                                Clear Points
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Capture a frame from the video player to start analysis</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Analyze Button */}
            <Button
              onClick={analyzeVideo}
              disabled={!selectedEvent || !selectedFile || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Video...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Analyze Performance
                </>
              )}
            </Button>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Analysis Results - {selectedEvent}
                  <Badge className="bg-green-100 text-green-800">
                    {analysisResult.overall_score}/10
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.technique_breakdown.phases.map((phase: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <Badge variant="outline">{phase.score}/10</Badge>
                    </div>
                    <p className="text-gray-700">{phase.analysis}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Biomechanical Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.biomechanical_insights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Button onClick={resetModal} variant="outline" className="w-full">
              Analyze Another Video
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
