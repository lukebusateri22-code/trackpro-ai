import React from 'react';
import { ArrowLeft, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack, 
  onBack, 
  showSettings, 
  onSettings,
  className 
}) => {
  return (
    <header className={cn(
      "flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg",
      className
    )}>
      <div className="flex items-center space-x-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <Bell size={20} />
        </button>
        {showSettings && (
          <button
            onClick={onSettings}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;