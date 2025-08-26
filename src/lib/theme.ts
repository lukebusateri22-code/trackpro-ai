// Track & Field themed design system
export const trackTheme = {
  colors: {
    // Primary track colors - inspired by running tracks
    track: {
      red: '#E53E3E',      // Lane 1 - Sprint red
      orange: '#FF8C00',   // Lane 2 - Energy orange  
      blue: '#3182CE',     // Lane 3 - Sky blue
      green: '#38A169',    // Lane 4 - Field green
      purple: '#805AD5',   // Lane 5 - Elite purple
      gold: '#D69E2E',     // Victory gold
      silver: '#A0AEC0',   // Second place silver
      bronze: '#C05621',   // Third place bronze
    },
    
    // Performance levels
    performance: {
      beginner: '#68D391',    // Light green
      intermediate: '#4299E1', // Blue
      advanced: '#9F7AEA',    // Purple
      pro: '#F56565',         // Red
      elite: '#D69E2E',       // Gold
    },
    
    // Event categories
    events: {
      sprints: '#E53E3E',     // Red - explosive power
      jumps: '#3182CE',       // Blue - sky/height
      throws: '#805AD5',      // Purple - strength
      distance: '#38A169',    // Green - endurance
      technical: '#FF8C00',   // Orange - skill
      recovery: '#68D391',    // Light green - rest
    },
    
    // Status colors
    status: {
      active: '#38A169',
      completed: '#3182CE',
      paused: '#D69E2E',
      missed: '#E53E3E',
      warning: '#FF8C00',
    },
    
    // Neutral colors
    neutral: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    }
  },
  
  gradients: {
    track: 'linear-gradient(135deg, #E53E3E 0%, #FF8C00 25%, #3182CE 50%, #38A169 75%, #805AD5 100%)',
    performance: 'linear-gradient(135deg, #68D391 0%, #4299E1 50%, #9F7AEA 100%)',
    victory: 'linear-gradient(135deg, #D69E2E 0%, #F6E05E 100%)',
    speed: 'linear-gradient(135deg, #E53E3E 0%, #FF6B6B 100%)',
    power: 'linear-gradient(135deg, #805AD5 0%, #B794F6 100%)',
    endurance: 'linear-gradient(135deg, #38A169 0%, #68D391 100%)',
    sky: 'linear-gradient(135deg, #3182CE 0%, #63B3ED 100%)',
  },
  
  shadows: {
    track: '0 4px 20px rgba(229, 62, 62, 0.15)',
    performance: '0 4px 20px rgba(66, 153, 225, 0.15)',
    victory: '0 4px 20px rgba(214, 158, 46, 0.25)',
    soft: '0 2px 10px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
  
  typography: {
    fonts: {
      heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"Fira Code", "Monaco", "Consolas", monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    }
  },
  
  spacing: {
    track: '8px',  // Standard track lane width reference
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    track: '20px', // Rounded like track curves
  }
};

// Utility functions for theme usage
export const getEventColor = (event: string) => {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('100m') || eventLower.includes('200m') || eventLower.includes('400m') || eventLower.includes('hurdles') || eventLower.includes('relay')) {
    return trackTheme.colors.events.sprints;
  }
  if (eventLower.includes('jump') || eventLower.includes('vault')) {
    return trackTheme.colors.events.jumps;
  }
  if (eventLower.includes('shot') || eventLower.includes('discus') || eventLower.includes('hammer') || eventLower.includes('javelin')) {
    return trackTheme.colors.events.throws;
  }
  if (eventLower.includes('800m') || eventLower.includes('1500m') || eventLower.includes('5000m') || eventLower.includes('10000m') || eventLower.includes('steeplechase')) {
    return trackTheme.colors.events.distance;
  }
  return trackTheme.colors.events.technical;
};

export const getPerformanceColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return trackTheme.colors.performance.beginner;
    case 'intermediate': return trackTheme.colors.performance.intermediate;
    case 'advanced': return trackTheme.colors.performance.advanced;
    case 'pro': return trackTheme.colors.performance.pro;
    case 'elite': return trackTheme.colors.performance.elite;
    default: return trackTheme.colors.performance.beginner;
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return trackTheme.colors.status.active;
    case 'completed': return trackTheme.colors.status.completed;
    case 'paused': return trackTheme.colors.status.paused;
    case 'missed': return trackTheme.colors.status.missed;
    default: return trackTheme.colors.status.active;
  }
};
