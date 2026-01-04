'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticker, setTicker] = useState(searchParams.get('ticker') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      router.push(`/?ticker=${ticker.trim().toUpperCase()}`);
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <h1 className="text-white font-bold text-xl hidden sm:block">Investor</h1>
        </div>

        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Search symbol..."
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500 text-sm sm:text-base"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
        </form>
      </div>
    </header>
  );
}
