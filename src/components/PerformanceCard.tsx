import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, MapPin, Zap, TrendingUp } from 'lucide-react';

interface PerformanceCardProps {
  event: string;
  result: string;
  date: string;
  type: 'practice' | 'competition';
  location?: string;
  aiScore?: number;
  improvement?: string;
  isPersonalBest?: boolean;
  onAnalysisClick?: () => void;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  event,
  result,
  date,
  type,
  location,
  aiScore,
  improvement,
  isPersonalBest,
  onAnalysisClick
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{event}</h3>
              {isPersonalBest && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Trophy className="h-3 w-3 mr-1" />
                  PB
                </Badge>
              )}
            </div>
            <div className="text-2xl font-bold text-blue-600">{result}</div>
          </div>
          
          {aiScore && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(aiScore)}`}>
              <Zap className="h-3 w-3 inline mr-1" />
              {aiScore}/10
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(date)}
          </div>
          
          <Badge variant={type === 'competition' ? 'default' : 'secondary'}>
            {type === 'competition' ? 'Competition' : 'Practice'}
          </Badge>
          
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
          )}
        </div>

        {improvement && (
          <div className="flex items-center gap-1 text-sm text-green-600 mb-3">
            <TrendingUp className="h-4 w-4" />
            {improvement} improvement
          </div>
        )}

        {aiScore && onAnalysisClick && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAnalysisClick}
            className="w-full"
          >
            <Zap className="h-4 w-4 mr-2" />
            View AI Analysis
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;