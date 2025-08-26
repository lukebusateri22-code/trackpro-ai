import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIAnalysisResult {
  overall_score: number;
  technical_breakdown: {
    phases: Array<{
      phase: string;
      score: number;
      analysis: string;
    }>;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  elite_comparison: {
    percentile: number;
    gap_analysis?: string;
  };
}

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AIAnalysisResult | null;
  event: string;
  result: string;
  isLoading: boolean;
}

export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysis,
  event,
  result,
  isLoading
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentileLevel = (percentile: number) => {
    if (percentile >= 95) return { level: 'Elite', color: 'bg-purple-500' };
    if (percentile >= 85) return { level: 'Highly Competitive', color: 'bg-blue-500' };
    if (percentile >= 70) return { level: 'Competitive', color: 'bg-green-500' };
    if (percentile >= 50) return { level: 'Developing', color: 'bg-yellow-500' };
    return { level: 'Recreational', color: 'bg-gray-500' };
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium">Analyzing Performance...</p>
              <p className="text-gray-600">Our AI coach is reviewing your {event} performance</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!analysis) return null;

  const percentileInfo = getPercentileLevel(analysis.elite_comparison.percentile);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            AI Performance Analysis - {event}
          </DialogTitle>
          <p className="text-gray-600">Result: {result}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Overall Performance Score
                <span className={`text-2xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                  {analysis.overall_score}/10
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysis.overall_score * 10} className="mb-4" />
              <div className="flex items-center gap-2">
                <Badge className={percentileInfo.color}>
                  {percentileInfo.level}
                </Badge>
                <span className="text-sm text-gray-600">
                  {analysis.elite_comparison.percentile}th percentile
                </span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="breakdown">Technical</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="recommendations">Training</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-4">
              {analysis.technical_breakdown.phases.map((phase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      {phase.phase}
                      <span className={`font-bold ${getScoreColor(phase.score)}`}>
                        {phase.score}/10
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={phase.score * 10} className="mb-3" />
                    <p className="text-gray-700">{phase.analysis}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="strengths" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Training Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};