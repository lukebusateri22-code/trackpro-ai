// Coach code generation and validation utilities

export const generateCoachCode = (coachName: string): string => {
  // Take first 3 letters of name (uppercase) + 3 random numbers
  const namePrefix = coachName.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const randomNumbers = Math.floor(Math.random() * 900) + 100; // 100-999
  return `${namePrefix}${randomNumbers}`;
};

export const validateCoachCode = (code: string): boolean => {
  // Coach codes should be 6 characters: 3 letters + 3 numbers
  const codeRegex = /^[A-Z]{3}\d{3}$/;
  return codeRegex.test(code);
};

export const formatCoachCode = (code: string): string => {
  return code.toUpperCase().replace(/\s+/g, '');
};

// Mock coach codes for demo (in real app, this would be in database)
export const DEMO_COACH_CODES = {
  'COACH123': {
    coachName: 'Demo Coach',
    coachEmail: 'coach@demo.com',
    specialties: ['Sprints', 'Jumps']
  },
  'SMITH456': {
    coachName: 'Coach Smith',
    coachEmail: 'smith@trackclub.com',
    specialties: ['Distance', 'Endurance']
  },
  'JONES789': {
    coachName: 'Coach Jones',
    coachEmail: 'jones@athletics.com',
    specialties: ['Throws', 'Strength']
  }
};

export const findCoachByCode = (code: string) => {
  const formattedCode = formatCoachCode(code);
  return DEMO_COACH_CODES[formattedCode as keyof typeof DEMO_COACH_CODES] || null;
};
