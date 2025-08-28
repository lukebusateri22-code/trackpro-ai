import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Pill, Plus, Clock, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface Supplement {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  timing: string;
  frequency: string;
  purpose: string;
  status: 'active' | 'paused' | 'discontinued';
  startDate: string;
  endDate?: string;
  notes?: string;
  sideEffects?: string;
  effectiveness?: number; // 1-10 scale
}

interface DailyLog {
  id: string;
  date: string;
  supplementId: string;
  taken: boolean;
  time?: string;
  notes?: string;
}

interface SupplementsModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const SupplementsModal: React.FC<SupplementsModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock supplements data
  const [supplements, setSupplements] = useState<Supplement[]>([
    {
      id: '1',
      name: 'Whey Protein',
      dosage: '25',
      unit: 'grams',
      timing: 'Post-workout',
      frequency: 'Daily',
      purpose: 'Muscle recovery and growth',
      status: 'active',
      startDate: '2025-07-01',
      notes: 'Vanilla flavor, mixes well with water',
      effectiveness: 9
    },
    {
      id: '2',
      name: 'Creatine Monohydrate',
      dosage: '5',
      unit: 'grams',
      timing: 'Anytime',
      frequency: 'Daily',
      purpose: 'Power and strength enhancement',
      status: 'active',
      startDate: '2025-07-01',
      notes: 'Loading phase completed',
      effectiveness: 8
    },
    {
      id: '3',
      name: 'Vitamin D3',
      dosage: '2000',
      unit: 'IU',
      timing: 'Morning with breakfast',
      frequency: 'Daily',
      purpose: 'Bone health and immune support',
      status: 'active',
      startDate: '2025-06-15',
      effectiveness: 7
    },
    {
      id: '4',
      name: 'Magnesium',
      dosage: '400',
      unit: 'mg',
      timing: 'Evening before bed',
      frequency: 'Daily',
      purpose: 'Sleep quality and muscle recovery',
      status: 'active',
      startDate: '2025-07-10',
      notes: 'Helps with sleep and reduces muscle cramps',
      effectiveness: 8
    },
    {
      id: '5',
      name: 'Beta-Alanine',
      dosage: '3',
      unit: 'grams',
      timing: 'Pre-workout',
      frequency: '4x per week',
      purpose: 'Muscular endurance',
      status: 'paused',
      startDate: '2025-06-01',
      notes: 'Paused due to tingling sensation',
      sideEffects: 'Mild tingling in hands and face'
    }
  ]);

  // Mock daily logs
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([
    { id: '1', date: '2025-08-27', supplementId: '1', taken: true, time: '14:30' },
    { id: '2', date: '2025-08-27', supplementId: '2', taken: true, time: '09:00' },
    { id: '3', date: '2025-08-27', supplementId: '3', taken: true, time: '08:00' },
    { id: '4', date: '2025-08-27', supplementId: '4', taken: false },
    { id: '5', date: '2025-08-26', supplementId: '1', taken: true, time: '15:00' },
    { id: '6', date: '2025-08-26', supplementId: '2', taken: true, time: '09:30' }
  ]);

  const [newSupplement, setNewSupplement] = useState({
    name: '',
    dosage: '',
    unit: 'mg',
    timing: '',
    frequency: 'Daily',
    purpose: '',
    notes: ''
  });

  const commonSupplements = [
    'Whey Protein', 'Casein Protein', 'Creatine Monohydrate', 'Beta-Alanine',
    'Caffeine', 'BCAAs', 'Glutamine', 'Fish Oil', 'Vitamin D3', 'Vitamin B12',
    'Iron', 'Magnesium', 'Zinc', 'Calcium', 'Multivitamin', 'Probiotics'
  ];

  const units = ['mg', 'g', 'grams', 'IU', 'mcg', 'ml', 'capsules', 'tablets', 'scoops'];
  const frequencies = ['Daily', '2x per day', '3x per day', 'Every other day', '3x per week', '4x per week', 'Weekly', 'As needed'];
  const timings = [
    'Morning', 'With breakfast', 'Between meals', 'Pre-workout', 'Post-workout',
    'With lunch', 'Afternoon', 'With dinner', 'Evening', 'Before bed', 'Anytime'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return athleticTechTheme.colors.performance.excellent;
      case 'paused': return athleticTechTheme.colors.primary.track;
      case 'discontinued': return athleticTechTheme.colors.text.secondary;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 8) return athleticTechTheme.colors.performance.excellent;
    if (effectiveness >= 6) return athleticTechTheme.colors.primary.track;
    if (effectiveness >= 4) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
  };

  const handleAddSupplement = () => {
    if (!newSupplement.name || !newSupplement.dosage) {
      alert('Please fill in name and dosage');
      return;
    }

    const supplement: Supplement = {
      id: Date.now().toString(),
      name: newSupplement.name,
      dosage: newSupplement.dosage,
      unit: newSupplement.unit,
      timing: newSupplement.timing,
      frequency: newSupplement.frequency,
      purpose: newSupplement.purpose,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      notes: newSupplement.notes || undefined
    };

    setSupplements(prev => [supplement, ...prev]);
    setNewSupplement({
      name: '',
      dosage: '',
      unit: 'mg',
      timing: '',
      frequency: 'Daily',
      purpose: '',
      notes: ''
    });
    setShowAddForm(false);
    onSave(supplement);
  };

  const updateSupplementStatus = (supplementId: string, newStatus: Supplement['status']) => {
    setSupplements(prev => prev.map(supplement => 
      supplement.id === supplementId ? { ...supplement, status: newStatus } : supplement
    ));
  };

  const toggleDailyLog = (supplementId: string, date: string) => {
    const existingLog = dailyLogs.find(log => log.supplementId === supplementId && log.date === date);
    
    if (existingLog) {
      setDailyLogs(prev => prev.map(log => 
        log.id === existingLog.id ? { ...log, taken: !log.taken } : log
      ));
    } else {
      const newLog: DailyLog = {
        id: Date.now().toString(),
        date,
        supplementId,
        taken: true,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      setDailyLogs(prev => [newLog, ...prev]);
    }
  };

  const getTodaysLogs = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyLogs.filter(log => log.date === today);
  };

  const getComplianceRate = (supplementId: string, days: number = 7) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    const relevantLogs = dailyLogs.filter(log => {
      const logDate = new Date(log.date);
      return log.supplementId === supplementId && logDate >= startDate && logDate <= endDate;
    });
    
    const takenLogs = relevantLogs.filter(log => log.taken);
    return relevantLogs.length > 0 ? Math.round((takenLogs.length / relevantLogs.length) * 100) : 0;
  };

  const activeSupplements = supplements.filter(s => s.status === 'active');
  const pausedSupplements = supplements.filter(s => s.status === 'paused');
  const todaysLogs = getTodaysLogs();

  if (showAddForm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Pill size={24} style={{ color: athleticTechTheme.colors.primary.field }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Add New Supplement</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Label>Supplement Name</Label>
              <Select value={newSupplement.name} onValueChange={(value) => setNewSupplement(prev => ({ ...prev, name: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or type supplement name" />
                </SelectTrigger>
                <SelectContent>
                  {commonSupplements.map(supplement => (
                    <SelectItem key={supplement} value={supplement}>
                      {supplement}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="mt-2"
                value={newSupplement.name}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Or type custom supplement name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  value={newSupplement.dosage}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="25"
                />
              </div>

              <div>
                <Label>Unit</Label>
                <Select value={newSupplement.unit} onValueChange={(value) => setNewSupplement(prev => ({ ...prev, unit: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Timing</Label>
                <Select value={newSupplement.timing} onValueChange={(value) => setNewSupplement(prev => ({ ...prev, timing: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="When to take" />
                  </SelectTrigger>
                  <SelectContent>
                    {timings.map(timing => (
                      <SelectItem key={timing} value={timing}>
                        {timing}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Frequency</Label>
                <Select value={newSupplement.frequency} onValueChange={(value) => setNewSupplement(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(frequency => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="purpose">Purpose/Goal</Label>
              <Input
                id="purpose"
                value={newSupplement.purpose}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="e.g., Muscle recovery, Energy boost, Immune support"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newSupplement.notes}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Brand, flavor, special instructions, etc."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSupplement} style={{ backgroundColor: athleticTechTheme.colors.primary.field }}>
                Add Supplement
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
              <Pill size={24} style={{ color: athleticTechTheme.colors.primary.field }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Supplement Tracker</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowAddForm(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.field }}>
                <Plus size={16} className="mr-2" />
                Add Supplement
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
              <TabsTrigger value="current">Current ({activeSupplements.length})</TabsTrigger>
              <TabsTrigger value="daily">Daily Log</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {activeSupplements.map((supplement) => {
                const complianceRate = getComplianceRate(supplement.id);
                return (
                  <Card key={supplement.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {supplement.name}
                          </h3>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {supplement.dosage} {supplement.unit} • {supplement.timing} • {supplement.frequency}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge style={{ backgroundColor: getStatusColor(supplement.status) }}>
                            {supplement.status.charAt(0).toUpperCase() + supplement.status.slice(1)}
                          </Badge>
                          {supplement.effectiveness && (
                            <Badge style={{ backgroundColor: getEffectivenessColor(supplement.effectiveness) }}>
                              {supplement.effectiveness}/10
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Purpose
                          </div>
                          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {supplement.purpose}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Started
                          </div>
                          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {new Date(supplement.startDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                            7-Day Compliance
                          </div>
                          <div className="text-sm font-semibold" style={{ color: getEffectivenessColor(complianceRate / 10) }}>
                            {complianceRate}%
                          </div>
                        </div>
                      </div>

                      {supplement.notes && (
                        <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            <strong>Notes:</strong> {supplement.notes}
                          </p>
                        </div>
                      )}

                      {supplement.sideEffects && (
                        <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: athleticTechTheme.colors.primary.power + '20' }}>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.primary.power }}>
                            <strong>Side Effects:</strong> {supplement.sideEffects}
                          </p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {supplement.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateSupplementStatus(supplement.id, 'paused')}
                          >
                            Pause
                          </Button>
                        )}
                        {supplement.status === 'paused' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateSupplementStatus(supplement.id, 'active')}
                            >
                              Resume
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateSupplementStatus(supplement.id, 'discontinued')}
                            >
                              Discontinue
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="daily" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Today's Supplements
                </h3>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {todaysLogs.filter(log => log.taken).length} of {activeSupplements.length} taken
                </div>
              </div>

              {activeSupplements.map((supplement) => {
                const todayLog = todaysLogs.find(log => log.supplementId === supplement.id);
                const isTaken = todayLog?.taken || false;
                
                return (
                  <Card key={supplement.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isTaken}
                            onCheckedChange={() => toggleDailyLog(supplement.id, new Date().toISOString().split('T')[0])}
                          />
                          <div>
                            <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {supplement.name}
                            </h4>
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {supplement.dosage} {supplement.unit} • {supplement.timing}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isTaken ? (
                            <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                              <CheckCircle size={12} className="mr-1" />
                              Taken {todayLog?.time && `at ${todayLog.time}`}
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock size={12} className="mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                {supplements.filter(s => s.status === 'paused' || s.status === 'discontinued').map((supplement) => (
                  <Card key={supplement.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {supplement.name}
                          </h3>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {supplement.dosage} {supplement.unit} • Used from {new Date(supplement.startDate).toLocaleDateString()}
                            {supplement.endDate && ` to ${new Date(supplement.endDate).toLocaleDateString()}`}
                          </p>
                          <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Purpose: {supplement.purpose}
                          </p>
                        </div>
                        <Badge style={{ backgroundColor: getStatusColor(supplement.status) }}>
                          {supplement.status.charAt(0).toUpperCase() + supplement.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Supplement Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Active Supplements</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                          {activeSupplements.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Paused</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                          {pausedSupplements.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Compliance</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.field }}>
                          {Math.round((todaysLogs.filter(log => log.taken).length / activeSupplements.length) * 100) || 0}%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Most Effective</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {supplements
                        .filter(s => s.effectiveness)
                        .sort((a, b) => (b.effectiveness || 0) - (a.effectiveness || 0))
                        .slice(0, 3)
                        .map(supplement => (
                          <div key={supplement.id} className="flex justify-between">
                            <span className="text-sm">{supplement.name}</span>
                            <Badge style={{ backgroundColor: getEffectivenessColor(supplement.effectiveness!) }}>
                              {supplement.effectiveness}/10
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Supplement Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>• Take with food to reduce stomach upset</div>
                      <div>• Stay consistent with timing</div>
                      <div>• Track effectiveness over time</div>
                      <div>• Consult healthcare provider for interactions</div>
                      <div>• Cycle certain supplements as needed</div>
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

export default SupplementsModal;
