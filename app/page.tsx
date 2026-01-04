import { Suspense } from 'react';
import { getStockData } from './actions';
import { CompanyInfo } from '@/components/CompanyInfo';
import { Header } from '@/components/Header';
import { NewsFeed } from '@/components/NewsFeed';
import { StockChart } from '@/components/StockChart';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ ticker?: string }>;
}) {
  const { ticker: searchTicker } = await searchParams;
  const ticker = searchTicker || 'AAPL';
  const data = await getStockData(ticker);
  const isError = 'error' in data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <Suspense fallback={<div className="p-4 text-center text-slate-500">Loading header...</div>}>
        <Header />
      </Suspense>

      <main className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8">
        {isError ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <h2 className="text-red-400 font-bold text-xl mb-2">Error Loading Data</h2>
            <p className="text-red-300/80">{data.error}</p>
            <p className="text-slate-500 mt-4 text-sm">Try searching for a valid symbol like 'MSFT' or 'GOOGL'</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content: Chart & Stats */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <CompanyInfo quote={data.quote} />
              <StockChart data={data.history} />
            </div>

            {/* Sidebar: News */}
            <div className="lg:col-span-1">
              <NewsFeed news={data.news} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}