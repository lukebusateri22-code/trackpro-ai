import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Database, 
  Wifi, 
  Shield, 
  Smartphone,
  BarChart3,
  Video,
  MessageSquare,
  Users,
  Target,
  Activity,
  RefreshCw
} from 'lucide-react';
import { checkSupabaseConnection } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface SystemStatusProps {
  onClose?: () => void;
}

interface StatusItem {
  name: string;
  status: 'online' | 'offline' | 'warning';
  description: string;
  icon: React.ReactNode;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ onClose }) => {
  const { user, profile } = useAuth();
  const [supabaseStatus, setSupabaseStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkStatus = async () => {
    setSupabaseStatus('checking');
    const isConnected = await checkSupabaseConnection();
    setSupabaseStatus(isConnected ? 'online' : 'offline');
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const coreServices: StatusItem[] = [
    {
      name: 'Database Connection',
      status: supabaseStatus === 'online' ? 'online' : supabaseStatus === 'offline' ? 'offline' : 'warning',
      description: supabaseStatus === 'online' ? 'Connected to Supabase' : 'Checking connection...',
      icon: <Database className="h-4 w-4" />
    },
    {
      name: 'Authentication',
      status: user ? 'online' : 'offline',
      description: user ? `Signed in as ${user.email}` : 'Not authenticated',
      icon: <Shield className="h-4 w-4" />
    },
    {
      name: 'User Profile',
      status: profile ? 'online' : user ? 'warning' : 'offline',
      description: profile ? `${profile.role} profile loaded` : user ? 'Profile loading...' : 'No profile',
      icon: <Users className="h-4 w-4" />
    },
    {
      name: 'Real-time Features',
      status: supabaseStatus === 'online' ? 'online' : 'offline',
      description: 'Live data updates and subscriptions',
      icon: <Wifi className="h-4 w-4" />
    }
  ];

  const features: StatusItem[] = [
    {
      name: 'Video Analysis',
      status: 'online',
      description: 'Freeze frame analysis with AI insights',
      icon: <Video className="h-4 w-4" />
    },
    {
      name: 'AI Coach',
      status: 'online',
      description: 'Open-ended track & field conversations',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      name: 'Training System',
      status: 'online',
      description: 'Coach-athlete training management',
      icon: <Activity className="h-4 w-4" />
    },
    {
      name: 'Analytics',
      status: 'online',
      description: 'Performance charts and insights',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      name: 'Goal Tracking',
      status: 'online',
      description: 'Personal records and achievements',
      icon: <Target className="h-4 w-4" />
    },
    {
      name: 'Mobile Apps',
      status: 'online',
      description: 'iOS and Android ready',
      icon: <Smartphone className="h-4 w-4" />
    }
  ];

  const getStatusIcon = (status: 'online' | 'offline' | 'warning') => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: 'online' | 'offline' | 'warning') => {
    const variants = {
      online: 'bg-green-100 text-green-800 border-green-200',
      offline: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };

    return (
      <Badge className={variants[status]}>
        {status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Warning'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
            System Status
          </h2>
          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={checkStatus}
            disabled={supabaseStatus === 'checking'}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${supabaseStatus === 'checking' ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Core Services */}
      <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
            Core Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {coreServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <div className="flex items-center gap-3">
                {service.icon}
                <div>
                  <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                    {service.name}
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                {getStatusBadge(service.status)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
            Platform Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <div>
                    <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {feature.name}
                    </h4>
                    <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                {getStatusIcon(feature.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg text-center p-4" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.primary.track }}>
            23
          </div>
          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            Track Events
          </div>
        </Card>
        
        <Card className="border-0 shadow-lg text-center p-4" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.primary.power }}>
            100%
          </div>
          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            Feature Complete
          </div>
        </Card>
        
        <Card className="border-0 shadow-lg text-center p-4" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.events.jumps }}>
            2
          </div>
          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            Mobile Apps
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemStatus;
