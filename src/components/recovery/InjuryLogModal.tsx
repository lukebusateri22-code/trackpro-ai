import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, AlertTriangle, Plus, Calendar, MapPin, Activity, TrendingUp } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface InjuryEntry {
  id: string;
  date: string;
  type: 'injury' | 'soreness' | 'pain' | 'discomfort';
  severity: number; // 1-10 scale
  location: string;
  bodyPart: string;
  description: string;
  cause?: string;
  treatment?: string;
  status: 'active' | 'recovering' | 'resolved';
  painLevel: number; // 1-10 scale
  mobility: number; // 1-10 scale (10 = full mobility)
  notes?: string;
  followUpDate?: string;
}

interface InjuryLogModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const InjuryLogModal: React.FC<InjuryLogModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('log');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock injury data
  const [injuries, setInjuries] = useState<InjuryEntry[]>([
    {
      id: '1',
      date: '2025-08-25',
      type: 'injury',
      severity: 6,
      location: 'Left Hamstring',
      bodyPart: 'hamstring',
      description: 'Sharp pain during sprint acceleration',
      cause: 'Insufficient warm-up before high-intensity training',
      treatment: 'Ice, rest, gentle stretching',
      status: 'recovering',
      painLevel: 4,
      mobility: 7,
      notes: 'Pain decreasing daily. Can walk normally but running still uncomfortable.',
      followUpDate: '2025-08-30'
    },
    {
      id: '2',
      date: '2025-08-23',
      type: 'soreness',
      severity: 3,
      location: 'Right Knee',
      bodyPart: 'knee',
      description: 'Mild soreness after long training session',
      cause: 'Increased training volume',
      treatment: 'Rest, ice after training',
      status: 'resolved',
      painLevel: 2,
      mobility: 9,
      notes: 'Resolved after 2 days of lighter training'
    },
    {
      id: '3',
      date: '2025-08-20',
      type: 'discomfort',
      severity: 2,
      location: 'Lower Back',
      bodyPart: 'back',
      description: 'Mild stiffness in lower back',
      cause: 'Poor sleeping position',
      treatment: 'Stretching, heat therapy',
      status: 'resolved',
      painLevel: 1,
      mobility: 10,
      notes: 'Quick resolution with stretching routine'
    }
  ]);

  const [newInjury, setNewInjury] = useState({
    type: 'soreness' as InjuryEntry['type'],
    severity: 5,
    location: '',
    bodyPart: '',
    description: '',
    cause: '',
    treatment: '',
    painLevel: 5,
    mobility: 8,
    notes: '',
    followUpDate: ''
  });

  const bodyParts = [
    'head', 'neck', 'shoulder', 'arm', 'elbow', 'wrist', 'hand', 'chest',
    'back', 'core', 'hip', 'thigh', 'hamstring', 'quadriceps', 'knee',
    'calf', 'shin', 'ankle', 'foot', 'achilles'
  ];

  const commonCauses = [
    'Overuse', 'Poor form', 'Insufficient warm-up', 'Fatigue', 'Previous injury',
    'Equipment issues', 'Surface conditions', 'Weather', 'Dehydration',
    'Inadequate recovery', 'Training error', 'Contact/collision', 'Unknown'
  ];

  const treatments = [
    'Rest', 'Ice', 'Heat', 'Compression', 'Elevation', 'Stretching',
    'Massage', 'Physical therapy', 'Medication', 'Medical consultation',
    'Activity modification', 'Strengthening exercises'
  ];

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return athleticTechTheme.colors.performance.excellent;
    if (severity <= 6) return athleticTechTheme.colors.primary.track;
    if (severity <= 8) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return athleticTechTheme.colors.performance.excellent;
      case 'recovering': return athleticTechTheme.colors.primary.track;
      case 'active': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'injury': return '🩹';
      case 'soreness': return '😣';
      case 'pain': return '⚡';
      case 'discomfort': return '😐';
      default: return '❓';
    }
  };

  const handleAddInjury = () => {
    if (!newInjury.location || !newInjury.description) {
      alert('Please fill in location and description');
      return;
    }

    const injury: InjuryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: newInjury.type,
      severity: newInjury.severity,
      location: newInjury.location,
      bodyPart: newInjury.bodyPart,
      description: newInjury.description,
      cause: newInjury.cause || undefined,
      treatment: newInjury.treatment || undefined,
      status: 'active',
      painLevel: newInjury.painLevel,
      mobility: newInjury.mobility,
      notes: newInjury.notes || undefined,
      followUpDate: newInjury.followUpDate || undefined
    };

    setInjuries(prev => [injury, ...prev]);
    setNewInjury({
      type: 'soreness',
      severity: 5,
      location: '',
      bodyPart: '',
      description: '',
      cause: '',
      treatment: '',
      painLevel: 5,
      mobility: 8,
      notes: '',
      followUpDate: ''
    });
    setShowAddForm(false);
    onSave(injury);
  };

  const updateInjuryStatus = (injuryId: string, newStatus: InjuryEntry['status']) => {
    setInjuries(prev => prev.map(injury => 
      injury.id === injuryId ? { ...injury, status: newStatus } : injury
    ));
  };

  const activeInjuries = injuries.filter(i => i.status === 'active');
  const recoveringInjuries = injuries.filter(i => i.status === 'recovering');
  const resolvedInjuries = injuries.filter(i => i.status === 'resolved');

  if (showAddForm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Log New Injury/Issue</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={newInjury.type} onValueChange={(value: InjuryEntry['type']) => setNewInjury(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discomfort">Discomfort</SelectItem>
                    <SelectItem value="soreness">Soreness</SelectItem>
                    <SelectItem value="pain">Pain</SelectItem>
                    <SelectItem value="injury">Injury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Severity (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newInjury.severity}
                  onChange={(e) => setNewInjury(prev => ({ ...prev, severity: parseInt(e.target.value) || 5 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newInjury.location}
                  onChange={(e) => setNewInjury(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Left Hamstring, Right Knee"
                />
              </div>

              <div>
                <Label>Body Part</Label>
                <Select value={newInjury.bodyPart} onValueChange={(value) => setNewInjury(prev => ({ ...prev, bodyPart: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body part" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyParts.map(part => (
                      <SelectItem key={part} value={part}>
                        {part.charAt(0).toUpperCase() + part.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newInjury.description}
                onChange={(e) => setNewInjury(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the injury/issue, when it occurred, symptoms..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Possible Cause</Label>
                <Select value={newInjury.cause} onValueChange={(value) => setNewInjury(prev => ({ ...prev, cause: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cause" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonCauses.map(cause => (
                      <SelectItem key={cause} value={cause}>
                        {cause}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Treatment Applied</Label>
                <Select value={newInjury.treatment} onValueChange={(value) => setNewInjury(prev => ({ ...prev, treatment: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatments.map(treatment => (
                      <SelectItem key={treatment} value={treatment}>
                        {treatment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Current Pain Level (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newInjury.painLevel}
                  onChange={(e) => setNewInjury(prev => ({ ...prev, painLevel: parseInt(e.target.value) || 5 }))}
                />
              </div>

              <div>
                <Label>Mobility Level (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newInjury.mobility}
                  onChange={(e) => setNewInjury(prev => ({ ...prev, mobility: parseInt(e.target.value) || 8 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="followUp">Follow-up Date</Label>
              <Input
                id="followUp"
                type="date"
                value={newInjury.followUpDate}
                onChange={(e) => setNewInjury(prev => ({ ...prev, followUpDate: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={newInjury.notes}
                onChange={(e) => setNewInjury(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional information, symptoms, or observations..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInjury} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                Log Injury
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Injury Log</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowAddForm(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                <Plus size={16} className="mr-2" />
                Log Issue
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="log">All Injuries</TabsTrigger>
              <TabsTrigger value="active">Active ({activeInjuries.length})</TabsTrigger>
              <TabsTrigger value="recovering">Recovering ({recoveringInjuries.length})</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="log" className="space-y-4">
              {injuries.map((injury) => (
                <Card key={injury.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(injury.type)}</span>
                        <div>
                          <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {injury.location}
                          </h3>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {new Date(injury.date).toLocaleDateString()} • {injury.type.charAt(0).toUpperCase() + injury.type.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge style={{ backgroundColor: getSeverityColor(injury.severity) }}>
                          Severity: {injury.severity}/10
                        </Badge>
                        <Badge style={{ backgroundColor: getStatusColor(injury.status) }}>
                          {injury.status.charAt(0).toUpperCase() + injury.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Pain Level
                        </div>
                        <div className="text-lg font-bold" style={{ color: getSeverityColor(injury.painLevel) }}>
                          {injury.painLevel}/10
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Mobility
                        </div>
                        <div className="text-lg font-bold" style={{ color: getSeverityColor(11 - injury.mobility) }}>
                          {injury.mobility}/10
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Body Part
                        </div>
                        <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {injury.bodyPart || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Follow-up
                        </div>
                        <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {injury.followUpDate ? new Date(injury.followUpDate).toLocaleDateString() : 'None set'}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <strong>Description:</strong> {injury.description}
                      </p>
                      {injury.cause && (
                        <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          <strong>Cause:</strong> {injury.cause}
                        </p>
                      )}
                      {injury.treatment && (
                        <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          <strong>Treatment:</strong> {injury.treatment}
                        </p>
                      )}
                    </div>

                    {injury.notes && (
                      <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                        <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          <strong>Notes:</strong> {injury.notes}
                        </p>
                      </div>
                    )}

                    {injury.status !== 'resolved' && (
                      <div className="flex space-x-2">
                        {injury.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateInjuryStatus(injury.id, 'recovering')}
                          >
                            Mark as Recovering
                          </Button>
                        )}
                        {injury.status === 'recovering' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateInjuryStatus(injury.id, 'resolved')}
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeInjuries.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    No Active Injuries
                  </h3>
                  <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Great! You have no active injuries to manage.
                  </p>
                </div>
              ) : (
                activeInjuries.map((injury) => (
                  <Card key={injury.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      {/* Same injury card content as above */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getTypeIcon(injury.type)}</span>
                          <div>
                            <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {injury.location}
                            </h3>
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {new Date(injury.date).toLocaleDateString()} • {injury.type.charAt(0).toUpperCase() + injury.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <Badge style={{ backgroundColor: getSeverityColor(injury.severity) }}>
                          Severity: {injury.severity}/10
                        </Badge>
                      </div>
                      <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {injury.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateInjuryStatus(injury.id, 'recovering')}
                      >
                        Mark as Recovering
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="recovering" className="space-y-4">
              {recoveringInjuries.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    No Injuries in Recovery
                  </h3>
                  <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                    No injuries currently in recovery phase.
                  </p>
                </div>
              ) : (
                recoveringInjuries.map((injury) => (
                  <Card key={injury.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🔄</span>
                          <div>
                            <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {injury.location}
                            </h3>
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Recovering since {new Date(injury.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                          Pain: {injury.painLevel}/10
                        </Badge>
                      </div>
                      <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {injury.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateInjuryStatus(injury.id, 'resolved')}
                      >
                        Mark as Resolved
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Injury Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Injuries</span>
                        <Badge>{injuries.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Active</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                          {activeInjuries.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Recovering</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                          {recoveringInjuries.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Resolved</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                          {resolvedInjuries.length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Common Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Hamstring</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Knee</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Back</span>
                        <span>1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Prevention Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>• Proper warm-up before training</div>
                      <div>• Adequate recovery between sessions</div>
                      <div>• Progressive training load increases</div>
                      <div>• Regular strength training</div>
                      <div>• Listen to your body</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InjuryLogModal;
