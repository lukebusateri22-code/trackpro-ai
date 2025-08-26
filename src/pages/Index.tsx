
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { UserProvider } from '@/contexts/UserContext';
import { TrainingProvider } from '@/contexts/TrainingContext';
import { RecoveryProvider } from '@/contexts/RecoveryContext';
import { GoalsProvider } from '@/contexts/GoalsContext';

const Index: React.FC = () => {
  return (
    <UserProvider>
      <TrainingProvider>
        <RecoveryProvider>
          <GoalsProvider>
            <AppProvider>
              <AppLayout />
            </AppProvider>
          </GoalsProvider>
        </RecoveryProvider>
      </TrainingProvider>
    </UserProvider>
  );
};

export default Index;
