'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

interface StockChartProps {
  data: any[];
  color?: string;
}

export function StockChart({ data, color = '#3b82f6' }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-400">No chart data available</p>
      </div>
    );
  }

  // Format data for simpler chart consumption if needed, 
  // but Recharts handles objects well. We just need to ensure 'date' is readable.
  const chartData = data.map(item => ({
    ...item,
    dateStr: format(new Date(item.date), 'MMM d, yyyy'), // For tooltip
    dateTick: format(new Date(item.date), 'MMM d'), // For axis
  }));

  return (
    <div className="h-[300px] sm:h-[400px] w-full bg-slate-900 rounded-xl border border-slate-800 p-2 sm:p-4 shadow-sm">
      <h3 className="text-slate-400 text-xs sm:text-sm font-medium mb-2 sm:mb-4 px-2">Price History (1 Year)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="dateTick" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            minTickGap={40}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              color: '#f8fafc',
            }}
            itemStyle={{ color: '#f8fafc' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Close Price']}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
