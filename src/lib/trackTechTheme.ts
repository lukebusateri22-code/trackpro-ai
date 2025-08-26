// Track Tech Theme - Modern Athletic Design System
export const trackTechTheme = {
  colors: {
    // Dark header system
    dark: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#404040',
      text: '#ffffff',
      textSecondary: '#e5e5e5',
      accent: '#3b82f6'
    },
    
    // Light content system
    light: {
      background: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      text: '#1e293b',
      textSecondary: '#64748b',
      textTertiary: '#94a3b8'
    },
    
    // Athletic performance colors
    performance: {
      excellent: '#10b981', // Green
      good: '#3b82f6',      // Blue
      average: '#f59e0b',   // Amber
      poor: '#ef4444',      // Red
      recovery: '#8b5cf6'   // Purple
    },
    
    // Track event categories
    events: {
      sprint: '#ef4444',    // Red - explosive power
      jump: '#3b82f6',      // Blue - height/distance
      throw: '#8b5cf6',     // Purple - strength
      distance: '#10b981',  // Green - endurance
      technical: '#f59e0b', // Amber - skill
      recovery: '#64748b'   // Gray - rest
    },
    
    // Status indicators
    status: {
      active: '#3b82f6',
      completed: '#10b981',
      paused: '#f59e0b',
      missed: '#ef4444',
      warning: '#f97316'
    },
    
    // Accent colors for variety
    accents: {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f97316',
      pink: '#ec4899',
      cyan: '#06b6d4'
    }
  },
  
  // Gradients for modern look
  gradients: {
    darkHeader: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    performance: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    accent: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
  },
  
  // Shadows for depth
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(59 130 246 / 0.3)'
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      display: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  // Spacing system
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem'    // 96px
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px'
  }
};

// Utility functions
export const getEventColor = (event: string): string => {
  const eventLower = event.toLowerCase();
  
  if (eventLower.includes('100m') || eventLower.includes('200m') || 
      eventLower.includes('400m') || eventLower.includes('hurdles') || 
      eventLower.includes('relay')) {
    return trackTechTheme.colors.events.sprint;
  }
  
  if (eventLower.includes('jump') || eventLower.includes('vault')) {
    return trackTechTheme.colors.events.jump;
  }
  
  if (eventLower.includes('shot') || eventLower.includes('discus') || 
      eventLower.includes('hammer') || eventLower.includes('javelin')) {
    return trackTechTheme.colors.events.throw;
  }
  
  if (eventLower.includes('800m') || eventLower.includes('1500m') || 
      eventLower.includes('5000m') || eventLower.includes('10000m') || 
      eventLower.includes('steeplechase') || eventLower.includes('marathon')) {
    return trackTechTheme.colors.events.distance;
  }
  
  return trackTechTheme.colors.events.technical;
};

export const getPerformanceColor = (score: number): string => {
  if (score >= 8) return trackTechTheme.colors.performance.excellent;
  if (score >= 6) return trackTechTheme.colors.performance.good;
  if (score >= 4) return trackTechTheme.colors.performance.average;
  return trackTechTheme.colors.performance.poor;
};

export const getStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('active') || statusLower.includes('in progress')) {
    return trackTechTheme.colors.status.active;
  }
  if (statusLower.includes('completed') || statusLower.includes('done')) {
    return trackTechTheme.colors.status.completed;
  }
  if (statusLower.includes('paused') || statusLower.includes('pending')) {
    return trackTechTheme.colors.status.paused;
  }
  if (statusLower.includes('missed') || statusLower.includes('failed')) {
    return trackTechTheme.colors.status.missed;
  }
  
  return trackTechTheme.colors.light.textSecondary;
};

export const getPriorityColor = (priority: string): string => {
  const priorityLower = priority.toLowerCase();
  
  if (priorityLower.includes('high') || priorityLower.includes('urgent')) {
    return trackTechTheme.colors.status.missed;
  }
  if (priorityLower.includes('medium') || priorityLower.includes('normal')) {
    return trackTechTheme.colors.status.warning;
  }
  if (priorityLower.includes('low')) {
    return trackTechTheme.colors.status.completed;
  }
  
  return trackTechTheme.colors.light.textSecondary;
};
