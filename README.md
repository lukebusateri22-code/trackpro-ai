# TrackPro AI - Complete Track & Field Training Platform

**The ultimate AI-powered training platform for track and field athletes and coaches.**

A comprehensive, production-ready platform featuring advanced video analysis, AI coaching, training management, and performance analytics. Built with modern web technologies and ready for mobile deployment.

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Mobile-purple.svg)](https://capacitorjs.com/)
[![Vite](https://img.shields.io/badge/Vite-Build-yellow.svg)](https://vitejs.dev/)

## ✨ Key Features

### 🎥 **Advanced Video Analysis**
- **Freeze Frame Analysis** - Frame-by-frame technique breakdown
- **Event-Specific Metrics** - Detailed analysis for all 23 track & field events
- **Main Weakness Detection** - AI identifies your biggest technique issues
- **Performance Recording** - Unified video + performance data capture
- **Weather Integration** - Track conditions impact on performance

### 🤖 **AI Coach**
- **Open-Ended Conversations** - Ask any track & field question naturally
- **Event-Specific Expertise** - Detailed knowledge for sprints, jumps, throws, distance
- **Personalized Coaching** - Tailored advice based on your event and level
- **Quick Prompts** - Easy access to popular coaching topics

### 🏋️‍♂️ **Complete Training System**
- **Coach Dashboard** - Manage multiple athletes and training plans
- **Athlete Portal** - View assigned workouts and track progress
- **Session Builder** - Create track, weights, recovery, and technique sessions
- **Exercise Tracking** - Sets, reps, weights, distances, and completion status
- **Progress Monitoring** - Real-time completion tracking and notes

### 📊 **Advanced Analytics**
- **Performance Charts** - Interactive graphs with trend analysis
- **Recovery Tracking** - Sleep, HRV, stress, and wellness monitoring
- **Goal Management** - Set, track, and achieve athletic objectives
- **Achievement System** - Unlock badges and track milestones
- **Competition Calendar** - Manage meets and track results

### 📱 **Mobile-First Design**
- **Native iOS/Android Apps** - Built with Capacitor
- **Offline Functionality** - Works without internet connection
- **Push Notifications** - Training reminders and updates
- **Camera Integration** - Record videos directly in app
- **Modern UI/UX** - Athletic theme with smooth animations

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript 5+** - Type-safe development with latest features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing for SPA experience

### **Backend & Database**
- **Supabase** - Complete backend-as-a-service
- **PostgreSQL** - Robust relational database with RLS
- **Real-time Subscriptions** - Live data updates
- **Authentication** - Secure user management
- **Storage** - Video and file storage with CDN

### **State Management**
- **React Query** - Server state management and caching
- **Context API** - Global state for user and app settings
- **Custom Hooks** - Reusable logic for data fetching

### **Mobile Development**
- **Capacitor** - Cross-platform native app development
- **iOS Support** - Native iOS app with App Store deployment
- **Android Support** - Native Android app with Play Store deployment
- **Native Plugins** - Camera, notifications, device features

### **Analytics & Visualization**
- **Recharts** - Interactive charts and data visualization
- **Date-fns** - Date manipulation and formatting
- **Custom Analytics** - Performance metrics and insights

### **Development Tools**
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git Hooks** - Pre-commit quality checks
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites
```bash
# Required
Node.js 18+
npm or yarn
Git

# For mobile development
Xcode (iOS)
Android Studio (Android)
```

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/yourusername/trackpro-ai.git
cd trackpro-ai

# Install dependencies
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Add your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Database Setup
```bash
# 1. Create Supabase project at https://supabase.com
# 2. Run the schema in Supabase SQL Editor:
#    Copy contents of supabase/schema.sql
# 3. Create storage bucket: "video-analyses"
```

### 4. Start Development
```bash
# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

### 5. Mobile Development (Optional)
```bash
# Build web assets
npm run build

# iOS
npx cap sync ios
npx cap open ios

# Android
npx cap sync android
npx cap open android
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
trackpro-ai/
├── src/
│   ├── components/              # UI Components
│   │   ├── analytics/           # Charts and data visualization
│   │   ├── screens/             # Main screen components
│   │   ├── training/            # Training-related components
│   │   └── ui/                  # shadcn/ui components
│   ├── contexts/                # React Context providers
│   │   ├── UserContext.tsx      # User state and authentication
│   │   └── GoalsContext.tsx     # Goals management
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useTraining.ts       # Training data hooks
│   │   └── useAnalytics.ts      # Analytics hooks
│   ├── lib/                     # Utilities and configurations
│   │   ├── supabase.ts          # Supabase client
│   │   ├── athleticTechTheme.ts # Design system
│   │   └── events.ts            # Track & field events data
│   ├── pages/                   # Page components (routing)
│   │   ├── HomePage.tsx         # Main dashboard
│   │   ├── TrainingPage.tsx     # Training management
│   │   ├── RecoveryPage.tsx     # Recovery tracking
│   │   ├── GoalsPage.tsx        # Goal management
│   │   └── ProfilePage.tsx      # User profile
│   ├── services/                # API and data services
│   │   └── api.ts               # Supabase API functions
│   ├── types/                   # TypeScript definitions
│   │   ├── database.ts          # Database types
│   │   └── index.ts             # General types
│   └── styles/                  # Global styles
├── supabase/                    # Database schema and config
│   └── schema.sql               # Complete database schema
├── ios/                         # iOS native project
├── android/                     # Android native project
├── public/                      # Static assets
├── capacitor.config.ts          # Mobile app configuration
├── DEPLOYMENT_GUIDE.md          # Complete deployment guide
└── package.json                 # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
```bash
# 1. Fork and clone
git clone https://github.com/yourusername/trackpro-ai.git

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes and test
npm run dev
npm run lint
npm run type-check

# 4. Commit with conventional commits
git commit -m "feat: add amazing feature"

# 5. Push and create PR
git push origin feature/amazing-feature
```

### Code Standards
- **TypeScript** - All new code must be typed
- **ESLint** - Follow the configured linting rules
- **Prettier** - Code formatting is enforced
- **Conventional Commits** - Use semantic commit messages

### Areas for Contribution
- 🎥 **Video Analysis** - Advanced AI integration
- 📊 **Analytics** - New chart types and insights
- 🏃‍♂️ **Events** - Support for additional track & field events
- 📱 **Mobile** - Native mobile features
- 🎨 **UI/UX** - Design improvements and animations
- 🧪 **Testing** - Unit and integration tests
- 📚 **Documentation** - Guides and API docs

### Bug Reports
Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure and real-time features
- **shadcn/ui** - Beautiful and accessible UI components
- **Capacitor** - Cross-platform mobile development
- **Recharts** - Data visualization and analytics
- **Track & Field Community** - Domain expertise and feedback

## 📞 Support

For support, email support@trackpro-ai.com or join our [Discord community](https://discord.gg/trackpro).

---

**Built with ❤️ for the track & field community**
