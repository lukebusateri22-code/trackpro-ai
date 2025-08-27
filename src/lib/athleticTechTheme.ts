// Athletic Tech Theme - Combining Track & Field Energy with Modern Tech Aesthetics

export const athleticTechTheme = {
  // Core Brand Colors - Athletic Energy
  colors: {
    primary: {
      track: '#FF6B35', // Vibrant track orange
      field: '#4ECDC4', // Fresh field teal
      speed: '#FF3366', // Lightning red
      power: '#8B5CF6', // Electric purple
      endurance: '#06D6A0', // Steady green
      tech: '#1E293B', // Deep tech slate
    },
    
    // Athletic Event Colors
    events: {
      sprints: '#FF3366', // Lightning fast red
      jumps: '#8B5CF6', // Soaring purple
      throws: '#FF6B35', // Power orange
      distance: '#06D6A0', // Endurance green
      hurdles: '#EC4899', // Dynamic pink
      relays: '#4ECDC4', // Team teal
      weights: '#FF6B35', // Weight training orange
    },
    
    // Status & Performance
    performance: {
      excellent: '#10B981', // Emerald success
      good: '#06D6A0', // Teal good
      average: '#F59E0B', // Amber average
      poor: '#EF4444', // Red needs work
      recovery: '#8B5CF6', // Purple recovery
      completed: '#10B981', // Completed green
    },
    
    // UI Foundation
    surface: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      elevated: '#FFFFFF',
      accent: '#F1F5F9',
      glass: 'rgba(255, 255, 255, 0.1)',
      darkGlass: 'rgba(15, 23, 42, 0.8)',
    },
    
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#64748B',
      inverse: '#FFFFFF',
      accent: '#FF6B35',
    },
    
    // Interactive Elements
    interactive: {
      hover: 'rgba(255, 107, 53, 0.1)',
      active: 'rgba(255, 107, 53, 0.2)',
      focus: '#FF6B35',
      border: '#E2E8F0',
      divider: '#F1F5F9',
    },
    
    // Role-based Colors
    roles: {
      coach: '#FF6B35', // Orange for coaches
      athlete: '#4ECDC4', // Teal for athletes
    },
  },
  
  // Performance Gradients - High Energy
  gradients: {
    primary: 'linear-gradient(135deg, #FF6B35 0%, #8B5CF6 100%)',
    performance: 'linear-gradient(135deg, #10B981 0%, #4ECDC4 100%)',
    speed: 'linear-gradient(135deg, #FF3366 0%, #FF6B35 100%)',
    power: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    endurance: 'linear-gradient(135deg, #06D6A0 0%, #4ECDC4 100%)',
    tech: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
    hero: 'linear-gradient(135deg, #FF6B35 0%, #8B5CF6 50%, #4ECDC4 100%)',
    darkHero: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
  },
  
  // Typography - Athletic & Tech
  typography: {
    fonts: {
      heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    
    sizes: {
      hero: '3.5rem', // 56px
      title: '2.25rem', // 36px
      heading: '1.875rem', // 30px
      subheading: '1.5rem', // 24px
      body: '1rem', // 16px
      caption: '0.875rem', // 14px
      small: '0.75rem', // 12px
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    }
  },
  
  // Spacing & Layout
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  
  // Border Radius - Modern & Smooth
  radius: {
    sm: '0.375rem', // 6px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadows - Depth & Elevation
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    card: '0 4px 12px rgba(0, 0, 0, 0.15)',
    elevated: '0 8px 24px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(255, 107, 53, 0.3)',
    glowPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
  
  // Animations - Athletic Energy
  animations: {
    fast: '150ms ease-out',
    normal: '250ms ease-out',
    slow: '350ms ease-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }
};

// Helper Functions for Dynamic Styling
export const getEventColor = (eventType: string) => {
  const eventMap: Record<string, string> = {
    'sprints': athleticTechTheme.colors.events.sprints,
    'jumps': athleticTechTheme.colors.events.jumps,
    'throws': athleticTechTheme.colors.events.throws,
    'distance': athleticTechTheme.colors.events.distance,
    'hurdles': athleticTechTheme.colors.events.hurdles,
    'relays': athleticTechTheme.colors.events.relays,
  };
  return eventMap[eventType.toLowerCase()] || athleticTechTheme.colors.primary.track;
};

export const getPerformanceGradient = (performance: number) => {
  if (performance >= 9) return athleticTechTheme.gradients.speed;
  if (performance >= 7) return athleticTechTheme.gradients.power;
  if (performance >= 5) return athleticTechTheme.gradients.endurance;
  return athleticTechTheme.gradients.tech;
};

export const getEventGradient = (eventType: string) => {
  const gradientMap: Record<string, string> = {
    'sprints': athleticTechTheme.gradients.speed,
    'jumps': athleticTechTheme.gradients.power,
    'throws': athleticTechTheme.gradients.power,
    'distance': athleticTechTheme.gradients.endurance,
    'hurdles': athleticTechTheme.gradients.speed,
    'relays': athleticTechTheme.gradients.endurance,
  };
  return gradientMap[eventType.toLowerCase()] || athleticTechTheme.gradients.hero;
};

export default athleticTechTheme;
