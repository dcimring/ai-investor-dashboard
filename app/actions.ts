'use server';

import yahooFinance from 'yahoo-finance2';

export interface StockData {
  quote: any;
  history: any[];
  news: any[];
  info: any;
}

export async function getStockData(ticker: string): Promise<StockData | { error: string }> {
  const cleanTicker = ticker.trim().toUpperCase();

  try {
    // Try to suppress notices if method exists (v2 specific)
    if (typeof yahooFinance.suppressNotices === 'function') {
      yahooFinance.suppressNotices(['yahooSurvey', 'ripHistorical']);
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const period1 = oneYearAgo.toISOString().split('T')[0];

    // Helper to avoid rate limits
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Fetch data sequentially to avoid "Too Many Requests" (429) errors
    // Yahoo often blocks parallel requests from the same IP
    const quote = await yahooFinance.quote(cleanTicker);
    await delay(200); // Small delay
    
    const chartResult = await yahooFinance.chart(cleanTicker, { period1, interval: '1d' });
    await delay(200);

    const searchResults = await yahooFinance.search(cleanTicker, { newsCount: 10 }) as any;

    // Map chart quotes to history format
    const history = chartResult.quotes.map((q: any) => ({
      date: q.date,
      open: q.open,
      high: q.high,
      low: q.low,
      close: q.close,
      volume: q.volume,
    }));

    const news = searchResults.news || [];

    return {
      quote,
      history,
      news,
      info: searchResults.quotes[0] || {}
    };

  } catch (error: any) {
    console.error('Yahoo Finance API failed, using mock data:', error.message);
    
    // Fallback Mock Data Generation
    return generateMockData(cleanTicker);
  }
}

function generateMockData(ticker: string): StockData {
  const now = new Date();
  const history = [];
  let price = 150.0; // Base mock price

  // Generate 1 year of mock history
  for (let i = 0; i < 252; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (252 - i));
    
    // Random walk
    const change = (Math.random() - 0.5) * 5; 
    price += change;
    if (price < 10) price = 10;

    history.push({
      date: date.toISOString(),
      close: price,
      open: price - change,
      high: price + Math.abs(change),
      low: price - Math.abs(change),
      volume: Math.floor(Math.random() * 10000000)
    });
  }

  const currentPrice = history[history.length - 1].close;
  const prevPrice = history[history.length - 2].close;
  const change = currentPrice - prevPrice;
  const changePercent = (change / prevPrice) * 100;

  return {
    quote: {
      symbol: ticker,
      shortName: `${ticker} (Mock Data)`,
      longName: `${ticker} Incorporated`,
      currency: 'USD',
      regularMarketPrice: currentPrice,
      regularMarketChange: change,
      regularMarketChangePercent: changePercent,
      marketCap: 2500000000000,
      trailingPE: 32.5,
      fiftyTwoWeekHigh: Math.max(...history.map(h => h.high)),
      fiftyTwoWeekLow: Math.min(...history.map(h => h.low)),
      regularMarketVolume: 50000000,
      averageDailyVolume3Month: 55000000,
      beta: 1.2,
      epsTrailingTwelveMonths: 5.4,
    },
    history,
    news: [
      {
        uuid: '1',
        title: `Analysts Predict Strong Growth for ${ticker}`,
        publisher: 'Finance Daily',
        link: '#',
        providerPublishTime: Math.floor(Date.now() / 1000) - 3600,
      },
      {
        uuid: '2',
        title: `${ticker} Announces New Product Lineup`,
        publisher: 'Tech Insider',
        link: '#',
        providerPublishTime: Math.floor(Date.now() / 1000) - 86400,
      },
      {
        uuid: '3',
        title: `Market Rally: ${ticker} leads the charge`,
        publisher: 'Global Markets',
        link: '#',
        providerPublishTime: Math.floor(Date.now() / 1000) - 172800,
      }
    ],
    info: {}
  };
}
