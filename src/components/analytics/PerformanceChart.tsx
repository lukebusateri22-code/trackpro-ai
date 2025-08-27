import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface PerformanceDataPoint {
  date: string;
  value: number;
  event: string;
  competition?: string;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  title: string;
  event: string;
  unit: string;
  type?: 'line' | 'area';
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title,
  event,
  unit,
  type = 'line'
}) => {
  const formatValue = (value: number) => {
    if (unit === 's' && value > 60) {
      const minutes = Math.floor(value / 60);
      const seconds = (value % 60).toFixed(2);
      return `${minutes}:${seconds.padStart(5, '0')}`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="p-3 rounded-lg shadow-lg border"
          style={{ 
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            borderColor: athleticTechTheme.colors.primary.track 
          }}
        >
          <p className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
            {new Date(label).toLocaleDateString()}
          </p>
          <p style={{ color: athleticTechTheme.colors.primary.track }}>
            {`${event}: ${formatValue(payload[0].value)}`}
          </p>
          {data.competition && (
            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              {data.competition}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const chartColor = athleticTechTheme.colors.primary.track;
  const gradientId = `gradient-${event.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      <CardHeader>
        <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={`${athleticTechTheme.colors.text.secondary}20`} />
              <XAxis 
                dataKey="date" 
                stroke={athleticTechTheme.colors.text.secondary}
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke={athleticTechTheme.colors.text.secondary}
                fontSize={12}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={`${athleticTechTheme.colors.text.secondary}20`} />
              <XAxis 
                dataKey="date" 
                stroke={athleticTechTheme.colors.text.secondary}
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke={athleticTechTheme.colors.text.secondary}
                fontSize={12}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={3}
                dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        
        {/* Performance Insights */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
          >
            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Personal Best
            </p>
            <p className="text-lg font-bold" style={{ color: athleticTechTheme.colors.primary.power }}>
              {data.length > 0 ? formatValue(Math.min(...data.map(d => d.value))) : 'N/A'}
            </p>
          </div>
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
          >
            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Recent Performance
            </p>
            <p className="text-lg font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
              {data.length > 0 ? formatValue(data[data.length - 1].value) : 'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
