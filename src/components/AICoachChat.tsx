import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Target, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface AICoachChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'analysis';
  data?: any;
}

const AICoachChat: React.FC<AICoachChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to your AI Performance Coach! 🏃‍♂️⚡\n\nI provide detailed technical analysis, personalized training recommendations, and performance insights just like elite coaching staff.\n\n• **Technique Analysis** - Detailed breakdowns with scores\n• **Training Plans** - Customized workouts\n• **Performance Comparison** - How you stack against elites\n• **Injury Prevention** - Biomechanical insights\n\nWhat would you like to work on today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      // Simulate AI processing time
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputMessage);
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
      
      setInputMessage('');
    }
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // High Jump Analysis (like in screenshots)
    if (input.includes('high jump') || input.includes('jump technique')) {
      const analysis = {
        event: 'High Jump',
        overallScore: 7.8,
        strengths: [
          'Consistent approach speed',
          'Strong take-off power',
          'Good body control over the bar'
        ],
        focusAreas: [
          'Limited arching technique',
          'Inconsistent knee drive',
          'Slightly off timing in the take-off phase'
        ],
        recommendations: [
          '**Arching Technique:** Practice the "back-over-bar" drill where you focus solely on the arching motion. Set up a low bar or elastic band and practice clearing it with a pronounced arch.',
          '**Flexibility:** Incorporate flexibility exercises into your routine, particularly for your hip flexors and thoracic spine to improve your arch.',
          '**Knee Drive Drills:** Work on knee drive drills to enhance take-off efficiency.'
        ],
        technicalBreakdown: [
          { phase: 'Approach', score: 8.0, feedback: 'The approach was consistent with good speed, but there is room for improvement in the rhythm to enhance the take-off.', color: athleticTechTheme.colors.performance.excellent },
          { phase: 'Take-off', score: 7.0, feedback: 'The take-off showed strong power, but the timing was slightly off, affecting the height achieved.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Flight', score: 7.5, feedback: 'Body control was good, but the arching technique needs refinement to maximize clearance.', color: athleticTechTheme.colors.performance.good },
          { phase: 'Landing', score: 8.0, feedback: 'Landing was controlled and safe, with minimal impact on performance.', color: athleticTechTheme.colors.performance.excellent }
        ],
        comparison: [
          { metric: 'Height Cleared', userValue: 2.02, eliteValue: 2.4, percentile: 70 },
          { metric: 'Approach Speed', userValue: 8.5, eliteValue: 9.5, percentile: 80 },
          { metric: 'Take-off Power', userValue: 7.8, eliteValue: 9.0, percentile: 75 },
          { metric: 'Body Control', userValue: 7.5, eliteValue: 8.5, percentile: 70 }
        ]
      };
      
      return {
        id: (Date.now() + 1).toString(),
        content: 'Here\'s your comprehensive High Jump performance analysis:',
        sender: 'ai',
        timestamp: new Date(),
        type: 'analysis',
        data: analysis
      };
    }
    
    // General response
    return {
      id: (Date.now() + 1).toString(),
      content: `I'd love to help you with that! I can provide detailed analysis for:\n\n🏃‍♂️ **Event-Specific Analysis:**\n• Sprints (100m, 200m, 400m)\n• Jumps (Long, High, Triple, Pole Vault)\n• Throws (Shot, Discus, Hammer, Javelin)\n• Distance (800m, 1500m, 5K, 10K)\n\n📊 **Performance Services:**\n• Technical breakdowns with scores\n• Elite athlete comparisons\n• Personalized training plans\n• Injury prevention protocols\n\n**Try asking:** "Analyze my high jump technique" or "Create a sprint training plan"\n\nWhat specific event or aspect would you like to focus on?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
  };

  const renderAnalysisMessage = (data: any) => (
    <div className="space-y-6 max-w-2xl">
      {/* Overall Score */}
      <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}10` }}>
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white"
          style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
        >
          {data.overallScore}
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          {data.event} Analysis
        </h3>
        <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
          Good foundation with clear improvement areas
        </p>
      </div>

      {/* Technical Breakdown */}
      <div>
        <h4 className="text-lg font-bold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>
          Technical Breakdown
        </h4>
        <div className="space-y-4">
          {data.technicalBreakdown.map((phase: any, index: number) => (
            <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {phase.phase}
                </span>
                <Badge style={{ backgroundColor: phase.color, color: 'white' }}>
                  {phase.score.toFixed(1)}
                </Badge>
              </div>
              <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                {phase.feedback}
              </p>
              <Progress value={(phase.score / 10) * 100} className="mt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
            <TrendingUp className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.excellent }} />
            Strengths
          </h4>
          <ul className="space-y-2">
            {data.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }} />
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
            <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.events.jumps }} />
            Focus Areas
          </h4>
          <ul className="space-y-2">
            {data.focusAreas.map((area: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: athleticTechTheme.colors.events.jumps }} />
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Elite Comparison */}
      <div>
        <h4 className="text-lg font-bold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>
          Elite Athlete Comparison
        </h4>
        <div className="space-y-4">
          {data.comparison.map((metric: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {metric.metric}
                </span>
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {metric.percentile}th percentile
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>You: <strong>{metric.userValue}</strong></span>
                <span>Elite: <strong>{metric.eliteValue}</strong></span>
              </div>
              <Progress value={metric.percentile} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Priority Recommendations */}
      <div>
        <h4 className="text-lg font-bold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>
          Priority Recommendations
        </h4>
        <div className="space-y-3">
          {data.recommendations.map((rec: string, index: number) => (
            <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}10` }}>
              <p className="text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>
                <strong>{index + 1}.</strong> {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
        <CardHeader className="border-b" style={{ borderColor: athleticTechTheme.colors.interactive.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-xl"
                style={{ background: athleticTechTheme.gradients.tech }}
              >
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                  AI Performance Coach
                </CardTitle>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Elite-level analysis & coaching
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-full ${message.sender === 'user' ? 'max-w-md' : 'max-w-4xl'}`}>
                {message.sender === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4" style={{ color: athleticTechTheme.colors.primary.track }} />
                    <span className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      AI Coach
                    </span>
                  </div>
                )}
                
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                  style={{
                    background: message.sender === 'user' 
                      ? athleticTechTheme.gradients.speed 
                      : athleticTechTheme.colors.surface.secondary
                  }}
                >
                  {message.type === 'analysis' && message.data ? (
                    <div>
                      <p className="text-sm mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {message.content}
                      </p>
                      {renderAnalysisMessage(message.data)}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line text-sm">
                      {message.content}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-white' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <Bot className="h-4 w-4" style={{ color: athleticTechTheme.colors.primary.track }} />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: athleticTechTheme.colors.primary.track }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: athleticTechTheme.colors.primary.track, animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: athleticTechTheme.colors.primary.track, animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Analyzing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        <div className="p-4 border-t" style={{ borderColor: athleticTechTheme.colors.interactive.border }}>
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about technique, training, or performance analysis..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              style={{ background: athleticTechTheme.gradients.speed }}
              className="text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AICoachChat;
