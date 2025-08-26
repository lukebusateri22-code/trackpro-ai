export interface TrackEvent {
  id: string;
  name: string;
  category: 'Sprints' | 'Jumps' | 'Throws' | 'Distance';
  unit: 'seconds' | 'meters' | 'feet' | 'points';
  description: string;
  worldRecord?: {
    men?: { value: number; holder: string; date: string };
    women?: { value: number; holder: string; date: string };
  };
  phases?: string[];
  keyTechniques?: string[];
}

export const TRACK_EVENTS: TrackEvent[] = [
  // Sprints
  {
    id: '100m',
    name: '100m',
    category: 'Sprints',
    unit: 'seconds',
    description: 'The premier sprint event, focusing on explosive power and speed',
    worldRecord: {
      men: { value: 9.58, holder: 'Usain Bolt', date: '2009-08-16' },
      women: { value: 10.49, holder: 'Florence Griffith-Joyner', date: '1988-07-16' }
    },
    phases: ['Start', 'Drive Phase', 'Transition', 'Max Velocity', 'Finish'],
    keyTechniques: ['Block start', 'Drive mechanics', 'Arm action', 'Stride frequency']
  },
  {
    id: '200m',
    name: '200m',
    category: 'Sprints',
    unit: 'seconds',
    description: 'Combines speed with curve running technique',
    worldRecord: {
      men: { value: 19.19, holder: 'Usain Bolt', date: '2009-08-20' },
      women: { value: 21.34, holder: 'Florence Griffith-Joyner', date: '1988-09-29' }
    },
    phases: ['Start', 'Curve', 'Straight', 'Finish'],
    keyTechniques: ['Curve running', 'Lean technique', 'Speed endurance']
  },
  {
    id: '400m',
    name: '400m',
    category: 'Sprints',
    unit: 'seconds',
    description: 'The longest sprint, requiring speed endurance',
    worldRecord: {
      men: { value: 43.03, holder: 'Wayde van Niekerk', date: '2016-08-14' },
      women: { value: 47.60, holder: 'Marita Koch', date: '1985-10-06' }
    },
    phases: ['Start', 'First Curve', 'Back Straight', 'Final Curve', 'Home Straight'],
    keyTechniques: ['Pacing strategy', 'Lactate tolerance', 'Curve technique']
  },
  {
    id: '100h',
    name: '100m Hurdles',
    category: 'Sprints',
    unit: 'seconds',
    description: 'Sprint hurdles for women, combining speed with technical precision',
    worldRecord: {
      women: { value: 12.20, holder: 'Kendra Harrison', date: '2016-07-22' }
    },
    phases: ['Start', 'Hurdle 1-3', 'Mid-race', 'Hurdles 8-10', 'Finish'],
    keyTechniques: ['Hurdle clearance', 'Three-step rhythm', 'Lead leg technique']
  },
  {
    id: '110h',
    name: '110m Hurdles',
    category: 'Sprints',
    unit: 'seconds',
    description: 'Sprint hurdles for men, the highest technical sprint event',
    worldRecord: {
      men: { value: 12.80, holder: 'Aries Merritt', date: '2012-09-07' }
    },
    phases: ['Start', 'Hurdle 1-3', 'Mid-race', 'Hurdles 8-10', 'Finish'],
    keyTechniques: ['Hurdle clearance', 'Three-step rhythm', 'Trail leg technique']
  },
  {
    id: '4x100',
    name: '4x100m Relay',
    category: 'Sprints',
    unit: 'seconds',
    description: 'Team sprint event focusing on baton passing technique',
    worldRecord: {
      men: { value: 36.84, holder: 'Jamaica', date: '2012-08-11' },
      women: { value: 40.82, holder: 'USA', date: '2012-08-10' }
    },
    phases: ['Leg 1', 'Exchange 1-2', 'Leg 2', 'Exchange 2-3', 'Leg 3', 'Exchange 3-4', 'Leg 4'],
    keyTechniques: ['Baton passing', 'Exchange zones', 'Acceleration zones']
  },
  {
    id: '4x400',
    name: '4x400m Relay',
    category: 'Sprints',
    unit: 'seconds',
    description: 'Team 400m event with strategic positioning',
    worldRecord: {
      men: { value: 174.29, holder: 'USA', date: '1993-08-22' },
      women: { value: 315.17, holder: 'Soviet Union', date: '1988-10-01' }
    },
    phases: ['Leg 1', 'Exchange 1-2', 'Leg 2', 'Exchange 2-3', 'Leg 3', 'Exchange 3-4', 'Leg 4'],
    keyTechniques: ['Pacing strategy', 'Baton passing', 'Curve running']
  },

  // Jumps
  {
    id: 'lj',
    name: 'Long Jump',
    category: 'Jumps',
    unit: 'meters',
    description: 'Horizontal jump combining speed, power, and technique',
    worldRecord: {
      men: { value: 8.95, holder: 'Mike Powell', date: '1991-08-30' },
      women: { value: 7.52, holder: 'Galina Chistyakova', date: '1988-06-11' }
    },
    phases: ['Approach', 'Takeoff', 'Flight', 'Landing'],
    keyTechniques: ['Approach consistency', 'Takeoff angle', 'Hang technique', 'Landing position']
  },
  {
    id: 'tj',
    name: 'Triple Jump',
    category: 'Jumps',
    unit: 'meters',
    description: 'Hop, step, and jump sequence requiring rhythm and power',
    worldRecord: {
      men: { value: 18.29, holder: 'Jonathan Edwards', date: '1995-08-07' },
      women: { value: 15.50, holder: 'Inessa Kravets', date: '1995-08-10' }
    },
    phases: ['Approach', 'Hop', 'Step', 'Jump', 'Landing'],
    keyTechniques: ['Phase ratios', 'Rhythm maintenance', 'Horizontal velocity']
  },
  {
    id: 'hj',
    name: 'High Jump',
    category: 'Jumps',
    unit: 'meters',
    description: 'Vertical jump over a bar using the Fosbury Flop technique',
    worldRecord: {
      men: { value: 2.45, holder: 'Javier Sotomayor', date: '1993-07-27' },
      women: { value: 2.09, holder: 'Stefka Kostadinova', date: '1987-08-30' }
    },
    phases: ['Approach', 'Plant', 'Takeoff', 'Bar Clearance', 'Landing'],
    keyTechniques: ['Curved approach', 'Fosbury Flop', 'Bar clearance', 'Takeoff timing']
  },
  {
    id: 'pv',
    name: 'Pole Vault',
    category: 'Jumps',
    unit: 'meters',
    description: 'Technical event using a pole to clear heights',
    worldRecord: {
      men: { value: 6.23, holder: 'Mondo Duplantis', date: '2024-08-05' },
      women: { value: 5.06, holder: 'Yelena Isinbayeva', date: '2009-08-28' }
    },
    phases: ['Approach', 'Plant', 'Swing Up', 'Extension', 'Bar Clearance', 'Landing'],
    keyTechniques: ['Pole selection', 'Plant technique', 'Swing mechanics', 'Extension timing']
  },

  // Throws
  {
    id: 'sp',
    name: 'Shot Put',
    category: 'Throws',
    unit: 'meters',
    description: 'Power event throwing a heavy sphere',
    worldRecord: {
      men: { value: 23.37, holder: 'Randy Barnes', date: '1990-05-20' },
      women: { value: 22.63, holder: 'Natalya Lisovskaya', date: '1987-06-07' }
    },
    phases: ['Setup', 'Glide/Spin', 'Power Position', 'Release', 'Recovery'],
    keyTechniques: ['Glide technique', 'Rotational technique', 'Power position', 'Release angle']
  },
  {
    id: 'dt',
    name: 'Discus',
    category: 'Throws',
    unit: 'meters',
    description: 'Rotational throwing event requiring rhythm and power',
    worldRecord: {
      men: { value: 74.08, holder: 'Jürgen Schult', date: '1986-06-06' },
      women: { value: 76.80, holder: 'Gabriele Reinsch', date: '1988-07-09' }
    },
    phases: ['Wind-up', 'Entry', 'Delivery Stride', 'Release', 'Recovery'],
    keyTechniques: ['Rotation timing', 'Orbit maintenance', 'Release technique', 'Rhythm']
  },
  {
    id: 'ht',
    name: 'Hammer',
    category: 'Throws',
    unit: 'meters',
    description: 'Rotational event with wire and weight',
    worldRecord: {
      men: { value: 86.74, holder: 'Yuriy Sedykh', date: '1986-08-30' },
      women: { value: 82.98, holder: 'Anita Włodarczyk', date: '2016-08-28' }
    },
    phases: ['Wind-up', 'Turns', 'Delivery', 'Release', 'Recovery'],
    keyTechniques: ['Wire tension', 'Turn technique', 'Low point timing', 'Release angle']
  },
  {
    id: 'jt',
    name: 'Javelin',
    category: 'Throws',
    unit: 'meters',
    description: 'Technical throwing event with approach run',
    worldRecord: {
      men: { value: 98.48, holder: 'Jan Železný', date: '1996-05-25' },
      women: { value: 72.28, holder: 'Barbora Špotáková', date: '2008-09-13' }
    },
    phases: ['Approach', 'Transition', 'Delivery Stride', 'Release', 'Recovery'],
    keyTechniques: ['Approach rhythm', 'Crossover steps', 'Release angle', 'Follow-through']
  },

  // Distance
  {
    id: '800m',
    name: '800m',
    category: 'Distance',
    unit: 'seconds',
    description: 'Middle distance combining speed and endurance',
    worldRecord: {
      men: { value: 100.91, holder: 'David Rudisha', date: '2012-08-09' },
      women: { value: 113.28, holder: 'Jarmila Kratochvílová', date: '1983-07-26' }
    },
    phases: ['Start', 'First 400m', 'Second 400m', 'Kick'],
    keyTechniques: ['Pacing strategy', 'Tactical positioning', 'Kick timing']
  },
  {
    id: '1500m',
    name: '1500m',
    category: 'Distance',
    unit: 'seconds',
    description: 'The metric mile, requiring tactical awareness',
    worldRecord: {
      men: { value: 206.00, holder: 'Hicham El Guerrouj', date: '1998-07-14' },
      women: { value: 230.07, holder: 'Genzebe Dibaba', date: '2015-07-17' }
    },
    phases: ['Start', 'Early Pace', 'Mid-race', 'Final 400m', 'Kick'],
    keyTechniques: ['Tactical positioning', 'Pace judgment', 'Final kick']
  },
  {
    id: '3000sc',
    name: '3000m Steeplechase',
    category: 'Distance',
    unit: 'seconds',
    description: 'Distance event with barriers and water jump',
    worldRecord: {
      men: { value: 476.47, holder: 'Lamecha Girma', date: '2023-06-09' },
      women: { value: 508.44, holder: 'Beatrice Chepkoech', date: '2018-07-20' }
    },
    phases: ['Start', 'Early Pace', 'Barrier Rhythm', 'Water Jump', 'Final Kilometers'],
    keyTechniques: ['Barrier clearance', 'Water jump technique', 'Rhythm maintenance']
  },
  {
    id: '5000m',
    name: '5000m',
    category: 'Distance',
    unit: 'seconds',
    description: 'Long distance track event requiring endurance',
    worldRecord: {
      men: { value: 757.35, holder: 'Joshua Cheptegei', date: '2020-08-14' },
      women: { value: 851.15, holder: 'Letesenbet Gidey', date: '2020-10-07' }
    },
    phases: ['Start', 'Early Pace', 'Mid-race', 'Final Kilometers', 'Kick'],
    keyTechniques: ['Pace distribution', 'Tactical awareness', 'Endurance base']
  },
  {
    id: '10000m',
    name: '10000m',
    category: 'Distance',
    unit: 'seconds',
    description: 'Premier distance event on the track',
    worldRecord: {
      men: { value: 1577.53, holder: 'Joshua Cheptegei', date: '2020-10-07' },
      women: { value: 1751.15, holder: 'Letesenbet Gidey', date: '2021-06-08' }
    },
    phases: ['Start', 'Early Pace', 'Mid-race', 'Final 3000m', 'Final Kick'],
    keyTechniques: ['Even pacing', 'Mental toughness', 'Tactical positioning']
  }
];

export const getEventsByCategory = (category: string) => {
  return TRACK_EVENTS.filter(event => event.category === category);
};

export const getEventById = (id: string) => {
  return TRACK_EVENTS.find(event => event.id === id);
};

export const getAllEventNames = () => {
  return TRACK_EVENTS.map(event => event.name);
};

export const getEventCategories = () => {
  return ['Sprints', 'Jumps', 'Throws', 'Distance'] as const;
};
