import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, UserPlus, Trophy } from 'lucide-react';
import { useAuth } from './AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartOnboarding: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, onStartOnboarding }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for sign in
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      setError(error.message);
    } else {
      onOpenChange(false);
      setSignInData({ email: '', password: '' });
    }
    
    setLoading(false);
  };

  const handleStartOnboarding = () => {
    onOpenChange(false);
    onStartOnboarding();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
            <Trophy className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.track }} />
            Welcome to TrackPro AI
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Error Messages */}
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Sign In Tab */}
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="athlete@example.com"
                    className="pl-10"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4">
            <div className="text-center">
              <UserPlus className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.power }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Create Your Account
              </h3>
              <p className="text-sm mb-6" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Join thousands of athletes and coaches using TrackPro AI to elevate their performance
              </p>
            </div>
            
            <Button 
              onClick={handleStartOnboarding}
              className="w-full" 
              style={{ backgroundColor: athleticTechTheme.colors.primary.power }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Start Registration
            </Button>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500 mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
