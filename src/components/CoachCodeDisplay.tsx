import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Users, QrCode } from 'lucide-react';
import { generateCoachCode } from '@/lib/coachCode';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';

const CoachCodeDisplay: React.FC = () => {
  const { user, profile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate coach code based on user's name
  const coachCode = generateCoachCode(profile?.full_name || user?.email?.split('@')[0] || 'COACH');
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coachCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users size={20} style={{ color: athleticTechTheme.colors.primary.power }} />
          <span style={{ color: athleticTechTheme.colors.text.primary }}>Your Coach Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div 
            className="text-3xl font-bold mb-2 p-4 rounded-lg border-2 border-dashed"
            style={{ 
              color: athleticTechTheme.colors.primary.power,
              borderColor: athleticTechTheme.colors.primary.power,
              backgroundColor: `${athleticTechTheme.colors.primary.power}10`
            }}
          >
            {coachCode}
          </div>
          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            Share this code with your athletes so they can connect with you during registration
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={copyToClipboard}
            className="flex-1"
            style={{ backgroundColor: athleticTechTheme.colors.primary.power }}
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          <Button 
            variant="outline"
            style={{ borderColor: athleticTechTheme.colors.primary.power, color: athleticTechTheme.colors.primary.power }}
          >
            <QrCode size={16} />
          </Button>
        </div>
        
        <div 
          className="p-3 rounded-lg text-sm"
          style={{ 
            backgroundColor: athleticTechTheme.colors.surface.elevated,
            color: athleticTechTheme.colors.text.secondary
          }}
        >
          <strong>How it works:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Athletes enter this code during registration</li>
            <li>They'll be automatically connected to you as their coach</li>
            <li>You can then assign them training plans and track their progress</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachCodeDisplay;
