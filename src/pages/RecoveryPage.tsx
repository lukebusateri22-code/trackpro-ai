import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import RecoveryDashboard from '@/components/recovery/RecoveryDashboard';
import MentalHealthModal from '@/components/recovery/MentalHealthModal';
import SleepTrackerModal from '@/components/recovery/SleepTrackerModal';
import EnergyTrackerModal from '@/components/recovery/EnergyTrackerModal';
import InjuryLogModal from '@/components/recovery/InjuryLogModal';
import SupplementsModal from '@/components/recovery/SupplementsModal';
import NutritionModal from '@/components/recovery/NutritionModal';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme from '@/lib/athleticTechTheme';

const RecoveryPage: React.FC = () => {
  const { user, isCoach } = useUser();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSaveData = (data: any) => {
    console.log('Recovery data saved:', data);
    // Here you would typically save to your backend/database
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Recovery" showSettings />
      <div className="flex-1 p-4 pb-20">
        <RecoveryDashboard onOpenModal={handleOpenModal} />
      </div>
      <Navigation activeTab="recovery" />
      
      {/* Recovery Modals */}
      {activeModal === 'mental-health' && (
        <MentalHealthModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      
      {activeModal === 'sleep-tracker' && (
        <SleepTrackerModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      
      {activeModal === 'energy-tracker' && (
        <EnergyTrackerModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      
      {activeModal === 'injury-log' && (
        <InjuryLogModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      
      {activeModal === 'supplements' && (
        <SupplementsModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      
      {activeModal === 'nutrition' && (
        <NutritionModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
};

export default RecoveryPage;
