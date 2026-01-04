'use client';

import clsx from 'clsx';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface CompanyInfoProps {
  quote: any;
}

export function CompanyInfo({ quote }: CompanyInfoProps) {
  if (!quote) return null;

  const isPositive = quote.regularMarketChange >= 0;
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

  const formatLargeNumber = (num: number) => {
    if (!num) return '-';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{quote.symbol}</h2>
            <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-medium">
              {quote.currency || 'USD'}
            </span>
          </div>
          <p className="text-slate-400 text-sm sm:text-lg mt-1">{quote.shortName || quote.longName}</p>
        </div>
        
        <div className="flex flex-row items-baseline gap-3 md:flex-col md:items-end md:gap-0">
          <div className="text-3xl sm:text-4xl font-bold text-white">
            ${quote.regularMarketPrice?.toFixed(2)}
          </div>
          <div className={clsx("flex items-center gap-1 font-medium mt-1 text-sm sm:text-base", colorClass)}>
            <ChangeIcon className="w-4 h-4" />
            <span>{Math.abs(quote.regularMarketChange).toFixed(2)}</span>
            <span>({quote.regularMarketChangePercent?.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-6 sm:mt-8 pt-6 border-t border-slate-800">
        <StatItem label="Market Cap" value={formatLargeNumber(quote.marketCap)} />
        <StatItem label="P/E Ratio" value={quote.trailingPE?.toFixed(2)} />
        <StatItem label="52W High" value={quote.fiftyTwoWeekHigh?.toFixed(2)} />
        <StatItem label="52W Low" value={quote.fiftyTwoWeekLow?.toFixed(2)} />
        <StatItem label="Volume" value={formatLargeNumber(quote.regularMarketVolume)} />
        <StatItem label="Avg Volume" value={formatLargeNumber(quote.averageDailyVolume3Month)} />
        <StatItem label="Beta" value={quote.beta?.toFixed(2)} />
        <StatItem label="EPS" value={quote.epsTrailingTwelveMonths?.toFixed(2)} />
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase font-semibold mb-1">{label}</p>
      <p className="text-slate-200 font-medium">{value !== undefined ? value : '-'}</p>
    </div>
  );
}
