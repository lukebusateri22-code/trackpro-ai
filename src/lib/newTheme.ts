// Modern Athletic Design System
export const athleticTheme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    
    // Performance colors
    performance: {
      excellent: '#10b981', // Green
      good: '#3b82f6',      // Blue  
      average: '#f59e0b',   // Amber
      poor: '#ef4444'       // Red
    },
    
    // Event categories - clean, distinct colors
    events: {
      sprint: '#ef4444',    // Red - explosive
      jump: '#3b82f6',      // Blue - sky/height
      throw: '#8b5cf6',     // Purple - power
      distance: '#10b981',  // Green - endurance
      technical: '#f59e0b', // Amber - skill
      recovery: '#6b7280'   // Gray - rest
    },
    
    // Neutral palette
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b', 
      error: '#ef4444',
      info: '#3b82f6'
    }
  },
  
  // Clean gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    performance: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    hero: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem', 
    lg: '0.75rem',
    xl: '1rem'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  }
};

// Utility functions
export const getEventColor = (event: string): string => {
  const eventLower = event.toLowerCase();
  
  if (eventLower.includes('100m') || eventLower.includes('200m') || 
      eventLower.includes('400m') || eventLower.includes('hurdles') || 
      eventLower.includes('relay')) {
    return athleticTheme.colors.events.sprint;
  }
  
  if (eventLower.includes('jump') || eventLower.includes('vault')) {
    return athleticTheme.colors.events.jump;
  }
  
  if (eventLower.includes('shot') || eventLower.includes('discus') || 
      eventLower.includes('hammer') || eventLower.includes('javelin')) {
    return athleticTheme.colors.events.throw;
  }
  
  if (eventLower.includes('800m') || eventLower.includes('1500m') || 
      eventLower.includes('5000m') || eventLower.includes('10000m') || 
      eventLower.includes('steeplechase')) {
    return athleticTheme.colors.events.distance;
  }
  
  return athleticTheme.colors.events.technical;
};

export const getPerformanceColor = (score: number): string => {
  if (score >= 8) return athleticTheme.colors.performance.excellent;
  if (score >= 6) return athleticTheme.colors.performance.good;
  if (score >= 4) return athleticTheme.colors.performance.average;
  return athleticTheme.colors.performance.poor;
};
