# TrackPro AI - Elite Track & Field Analysis App

A comprehensive track and field performance analysis and training management application built with modern web technologies. Designed for elite athletes, coaches, and track & field enthusiasts.

![TrackPro AI](https://img.shields.io/badge/TrackPro-AI-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-blue?style=for-the-badge&logo=vite)

## 🏃‍♂️ Features

### 🎯 Core Functionality
- **Video Analysis**: Advanced freeze-frame analysis with biomechanical marking
- **Performance Tracking**: Comprehensive performance recording and analysis
- **Training Management**: Complete workout planning and execution tracking
- **Recovery Monitoring**: Health metrics and wellness tracking
- **Goal Setting**: SMART goals with milestone tracking and achievements
- **AI Coach**: Intelligent coaching recommendations and insights

### 📊 Analytics & Insights
- **Performance Analytics**: Detailed statistics and progress tracking
- **Recovery Trends**: 7-day recovery score analysis
- **Training Load**: RPE tracking and workout distribution
- **Personal Records**: Event-specific PB tracking with historical data
- **Achievement System**: Unlockable badges and milestones

### 🏃‍♀️ Track & Field Events
- **All 23 Events**: Complete coverage across 4 categories
  - **Sprints**: 100m, 200m, 400m, Hurdles, Relays
  - **Jumps**: Long Jump, Triple Jump, High Jump, Pole Vault
  - **Throws**: Shot Put, Discus, Hammer, Javelin
  - **Distance**: 800m, 1500m, 5000m, 10000m, Steeplechase, Marathon

### 🎨 Modern Design
- **Dark Tech Headers**: Professional mobile-inspired interface
- **Clean Cards**: Modern white cards with subtle shadows
- **Track-Themed Colors**: Event-specific color coding
- **Responsive Design**: Optimized for all devices
- **Smooth Animations**: Professional transitions and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 5.0 for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Icons**: Lucide React
- **Backend**: Supabase (configured)
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trackpro-ai.git
   cd trackpro-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Usage

### Getting Started
1. **Profile Setup**: Create your athlete profile with personal information
2. **Event Selection**: Choose your primary track & field events
3. **Goal Setting**: Set SMART goals with specific targets and deadlines
4. **Training**: Log workouts and track your training load
5. **Recovery**: Monitor daily wellness metrics
6. **Analysis**: Use video analysis for technique improvement

### Key Features

#### Video Analysis
- Upload training videos or competition footage
- Freeze-frame analysis with interactive marking
- Biomechanical point tracking
- AI-powered technique recommendations

#### Training Management
- Pre-built exercise library with 50+ exercises
- Custom workout creation
- RPE (Rate of Perceived Exertion) tracking
- Training load monitoring

#### Recovery Tracking
- Daily wellness questionnaire
- Sleep, stress, energy, and nutrition monitoring
- Recovery score calculation
- Personalized recommendations

#### Goal Setting
- SMART goal framework
- Milestone tracking
- Progress visualization
- Achievement badges

## 🏗️ Project Structure

```
src/
├── components/
│   ├── screens/           # Main app screens
│   ├── ui/               # Reusable UI components
│   ├── VideoAnalysisModal.tsx
│   ├── Navigation.tsx
│   └── ...
├── contexts/             # React Context providers
│   ├── UserContext.tsx
│   ├── TrainingContext.tsx
│   ├── RecoveryContext.tsx
│   └── GoalsContext.tsx
├── lib/
│   ├── events.ts         # Track & field events data
│   ├── trackTechTheme.ts # Design system
│   └── utils.ts
└── pages/
    └── Index.tsx         # Main app entry
```

## 🎨 Design System

The app uses a custom **Track Tech Theme** with:
- **Dark Headers**: Professional mobile-inspired headers
- **Event Colors**: Color-coded system for different track events
- **Performance Colors**: Visual indicators for performance levels
- **Modern Cards**: Clean white cards with subtle shadows
- **Responsive Grid**: Mobile-first responsive design

## 🔮 Future Enhancements

- [ ] **Mobile App**: React Native version for iOS/Android
- [ ] **Real-time Coaching**: Live video analysis during training
- [ ] **Team Management**: Coach dashboard for multiple athletes
- [ ] **Competition Mode**: Meet management and live results
- [ ] **Wearable Integration**: Heart rate and GPS data sync
- [ ] **Social Features**: Athlete community and sharing
- [ ] **Advanced Analytics**: Machine learning insights

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Track & field community for inspiration and feedback
- shadcn/ui for beautiful UI components
- Lucide for comprehensive icon set
- Tailwind CSS for utility-first styling

## 📞 Support

For support, email support@trackpro-ai.com or join our [Discord community](https://discord.gg/trackpro).

---

**Built with ❤️ for the track & field community**
