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
  
  const quickPrompts = [
    '🏃‍♂️ Create a sprint training plan',
    '🥗 Nutrition advice for athletes',
    '🏥 Injury prevention tips',
    '🧠 Mental preparation strategies',
    '😴 Recovery optimization',
    '🏆 Competition strategy'
  ];
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
    
    // Sprint Training Plans
    if (input.includes('sprint training') || input.includes('100m') || input.includes('200m')) {
      return {
        id: Date.now().toString(),
        content: `🏃‍♂️ **Sprint Training Plan Analysis**\n\nBased on your request, here's a comprehensive sprint training approach:\n\n**Phase 1: Acceleration Development (Weeks 1-4)**\n• Block starts: 6x30m @ 95%\n• Acceleration runs: 4x50m @ 90%\n• Strength: Squats, Power cleans\n• Recovery: 48-72 hours between sessions\n\n**Phase 2: Speed Development (Weeks 5-8)**\n• Flying 30m: 5x30m @ 100%\n• Speed endurance: 3x150m @ 95%\n• Plyometrics: Bounds, hops\n\n**Key Metrics to Track:**\n• 30m split times\n• Reaction time from blocks\n• Stride frequency and length\n\n**Nutrition Focus:**\n• Creatine supplementation\n• High protein intake (2g/kg bodyweight)\n• Proper hydration\n\nWould you like me to create a specific weekly schedule or focus on any particular aspect?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Training plan creation
    if (input.includes('create training plan') || input.includes('workout plan')) {
      return {
        id: Date.now().toString(),
        content: `📋 **Custom Training Plan Generator**\n\nI can help you create a personalized training plan! Let me know:\n\n**1. Your Event(s):**\n• Sprints (100m, 200m, 400m)\n• Distance (800m, 1500m, 5000m)\n• Jumps (Long, High, Triple, Pole)\n• Throws (Shot, Discus, Hammer, Javelin)\n\n**2. Your Experience Level:**\n• Beginner (0-2 years)\n• Intermediate (2-5 years)\n• Advanced (5+ years)\n• Elite/Professional\n\n**3. Training Phase:**\n• Base Building\n• Strength Development\n• Speed/Power Phase\n• Competition Prep\n• Recovery/Transition\n\n**4. Available Training Days:**\n• 3-4 days/week (Recreational)\n• 5-6 days/week (Competitive)\n• 7+ days/week (Elite)\n\nJust tell me your event and level, and I'll create a detailed plan!`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Injury prevention
    if (input.includes('injury') || input.includes('pain') || input.includes('prevention')) {
      return {
        id: Date.now().toString(),
        content: `🏥 **Injury Prevention & Recovery**\n\n**Common Track & Field Injuries:**\n\n**Sprinters:**\n• Hamstring strains - Dynamic warm-up, eccentric strengthening\n• Achilles tendinitis - Calf stretching, gradual load increase\n• Hip flexor strains - Hip mobility work\n\n**Distance Runners:**\n• Shin splints - Proper footwear, surface variation\n• IT band syndrome - Hip strengthening, foam rolling\n• Plantar fasciitis - Calf stretching, arch support\n\n**Jumpers:**\n• Patellar tendinitis - Eccentric quad exercises\n• Ankle sprains - Balance training, proprioception\n• Lower back pain - Core strengthening\n\n**Throwers:**\n• Shoulder impingement - Rotator cuff strengthening\n• Elbow pain - Proper technique, gradual loading\n• Wrist injuries - Flexibility, proper grip\n\n**Prevention Protocol:**\n✅ Dynamic warm-up (10-15 min)\n✅ Cool-down and stretching (15 min)\n✅ Strength training 2-3x/week\n✅ Proper nutrition and hydration\n✅ Adequate sleep (7-9 hours)\n✅ Listen to your body\n\nAre you experiencing any specific issues I can help with?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Nutrition advice
    if (input.includes('nutrition') || input.includes('diet') || input.includes('food')) {
      return {
        id: Date.now().toString(),
        content: `🥗 **Athletic Nutrition Guide**\n\n**Pre-Training (1-2 hours before):**\n• Complex carbs: Oatmeal, banana, whole grain toast\n• Light protein: Greek yogurt, nuts\n• Hydration: 16-20oz water\n\n**During Training (>90 minutes):**\n• Sports drink with electrolytes\n• Quick carbs if needed: Dates, energy gels\n\n**Post-Training (within 30 minutes):**\n• Protein: 20-30g (whey shake, chocolate milk)\n• Carbs: 30-60g (fruit, rice, pasta)\n• Hydration: Replace 150% of fluid lost\n\n**Daily Nutrition Targets:**\n\n**Sprinters/Power Athletes:**\n• Protein: 1.6-2.2g/kg bodyweight\n• Carbs: 5-7g/kg bodyweight\n• Fats: 1-1.5g/kg bodyweight\n• Creatine: 3-5g daily\n\n**Endurance Athletes:**\n• Protein: 1.2-1.6g/kg bodyweight\n• Carbs: 7-12g/kg bodyweight\n• Fats: 1-1.5g/kg bodyweight\n• Iron: Monitor levels regularly\n\n**Hydration:**\n• 35-40ml per kg bodyweight daily\n• Monitor urine color (pale yellow)\n• Increase in hot weather/altitude\n\n**Supplements to Consider:**\n• Vitamin D (if deficient)\n• B12 (especially vegetarians)\n• Omega-3 fatty acids\n• Magnesium for muscle function\n\nWhat's your specific nutrition goal?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
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
    
    // Mental training and psychology
    if (input.includes('mental') || input.includes('psychology') || input.includes('confidence') || input.includes('nerves')) {
      return {
        id: Date.now().toString(),
        content: `🧠 **Mental Performance Training**\n\n**Pre-Competition Routine:**\n\n**24 Hours Before:**\n• Visualization: 10-15 minutes of perfect performance\n• Positive self-talk: "I am prepared and ready"\n• Light physical activity to stay loose\n• Avoid overthinking technique\n\n**Competition Day:**\n• Consistent warm-up routine\n• Focus on process, not outcome\n• Use breathing techniques (4-7-8 method)\n• Trust your training\n\n**Managing Competition Nerves:**\n\n**Reframe Anxiety:**\n• Nerves = Excitement and readiness\n• "I'm nervous because this matters to me"\n• Channel energy into focus\n\n**Visualization Techniques:**\n• See yourself executing perfect technique\n• Feel the movements in your body\n• Hear the sounds of success\n• Include potential challenges and how you overcome them\n\n**Focus Cues:**\n\n**Sprinters:** "Drive, drive, relax"\n**Jumpers:** "Fast, tall, attack"\n**Throwers:** "Smooth, explosive, follow through"\n**Distance:** "Rhythm, relax, strong"\n\n**Between Attempts/Races:**\n• Stay warm and loose\n• Use positive imagery\n• Focus on one technical cue\n• Avoid comparing to others\n\n**Building Confidence:**\n• Keep a training log of successes\n• Set process goals, not just outcome goals\n• Celebrate small improvements\n• Learn from setbacks without dwelling\n\nWhat specific mental challenge are you facing?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Recovery and rest
    if (input.includes('recovery') || input.includes('rest') || input.includes('sleep') || input.includes('massage')) {
      return {
        id: Date.now().toString(),
        content: `😴 **Recovery & Regeneration Protocol**\n\n**Sleep Optimization (Most Important!):**\n• 7-9 hours nightly for athletes\n• Consistent sleep/wake times\n• Cool, dark room (65-68°F)\n• No screens 1 hour before bed\n• Magnesium supplement if needed\n\n**Active Recovery Methods:**\n\n**Daily (10-15 minutes):**\n• Light stretching or yoga\n• Foam rolling major muscle groups\n• Walking or easy swimming\n• Deep breathing exercises\n\n**Weekly (30-60 minutes):**\n• Massage therapy\n• Sauna or hot/cold therapy\n• Extended mobility work\n• Meditation or mindfulness\n\n**Nutrition for Recovery:**\n• Post-workout: Protein + carbs within 30 min\n• Anti-inflammatory foods: Berries, leafy greens, fish\n• Tart cherry juice for sleep quality\n• Adequate hydration throughout day\n\n**Recovery Indicators to Monitor:**\n\n**Good Recovery:**\n✅ Rested upon waking\n✅ Consistent energy levels\n✅ Good appetite\n✅ Positive mood\n✅ Heart rate variability stable\n\n**Poor Recovery:**\n❌ Fatigue despite adequate sleep\n❌ Elevated resting heart rate\n❌ Decreased motivation\n❌ Increased injury susceptibility\n❌ Performance plateau/decline\n\n**Recovery Tools:**\n• Compression garments\n• Ice baths (10-15 min at 50-59°F)\n• Contrast showers (hot/cold)\n• Percussion massage devices\n• Meditation apps (Headspace, Calm)\n\n**Weekly Recovery Schedule:**\n• Hard training days: 2-3 per week max\n• Easy days: Active recovery between hard sessions\n• Complete rest: 1 day per week minimum\n\nHow is your current recovery feeling?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Competition strategy
    if (input.includes('competition') || input.includes('meet') || input.includes('race strategy')) {
      return {
        id: Date.now().toString(),
        content: `🏆 **Competition Strategy Guide**\n\n**Pre-Competition Planning:**\n\n**Know the Competition:**\n• Study the venue and conditions\n• Research your competitors\n• Plan your warm-up timing\n• Have backup plans for weather/delays\n\n**Event-Specific Strategies:**\n\n**Sprints (100m-400m):**\n• Focus on your lane, ignore others\n• Execute your race plan (don't get pulled out too fast)\n• Relax through the drive phase\n• Finish through the line\n\n**Distance (800m+):**\n• Position yourself strategically\n• Know your split times\n• Stay patient early, strong late\n• Have multiple kick gears ready\n\n**Jumps:**\n• Start conservatively, build confidence\n• Use early jumps to dial in technique\n• Save biggest efforts for when needed\n• Stay aggressive on final attempts\n\n**Throws:**\n• Establish rhythm early\n• Focus on technique over distance initially\n• Build intensity through rounds\n• Stay loose between attempts\n\n**Competition Day Timeline:**\n\n**3-4 Hours Before:**\n• Light meal, hydration\n• Arrive at venue, check in\n• Mental preparation, visualization\n\n**2 Hours Before:**\n• Begin dynamic warm-up\n• Technical drills specific to event\n• Light practice attempts\n\n**30 Minutes Before:**\n• Final preparations\n• Focus on key technical cues\n• Positive self-talk\n• Trust your preparation\n\n**During Competition:**\n• Stay present, one attempt at a time\n• Use breathing to stay calm\n• Celebrate good efforts\n• Learn from each attempt\n\n**Post-Competition:**\n• Cool down properly\n• Reflect on what went well\n• Note areas for improvement\n• Plan recovery before next training\n\nWhat type of competition are you preparing for?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      content: `I understand you're asking about "${userInput}". As your AI Performance Coach, I can help with:\n\n🏃‍♂️ **Training Plans** - "Create a sprint training plan"\n📊 **Technique Analysis** - "High jump technique analysis"\n🏥 **Injury Prevention** - "Injury prevention for runners"\n🥗 **Nutrition Guidance** - "Nutrition for throwers"\n🧠 **Mental Training** - "Mental preparation for competition"\n⚡ **Recovery** - "Recovery and sleep optimization"\n🏆 **Competition Strategy** - "Race strategy for 800m"\n\n**Popular Questions:**\n• "How do I improve my 100m time?"\n• "What should I eat before training?"\n• "How to prevent hamstring injuries?"\n• "Mental tips for big competitions?"\n• "Best recovery methods for athletes?"\n\n**Technical Analysis Available:**\n• Video breakdowns with scores\n• Biomechanical insights\n• Comparison to elite athletes\n• Personalized improvement plans\n\nWhat specific area would you like to explore?`,
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
          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="mb-4">
              <p 
                className="text-sm font-medium mb-3"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Quick Start:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(prompt.replace(/^[^\s]+\s/, ''))}
                    className="text-left justify-start h-auto py-2 px-3"
                    style={{
                      borderColor: athleticTechTheme.colors.interactive.border,
                      color: athleticTechTheme.colors.text.primary
                    }}
                  >
                    <span className="text-xs">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
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
              disabled={!inputMessage.trim()}
              style={{ 
                background: inputMessage.trim() ? athleticTechTheme.gradients.speed : athleticTechTheme.colors.surface.elevated,
                opacity: inputMessage.trim() ? 1 : 0.5
              }}
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
