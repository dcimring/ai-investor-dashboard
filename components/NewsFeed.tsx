'use client';

import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number; // Unix timestamp
  thumbnail?: {
    resolutions: { url: string }[];
  };
}

interface NewsFeedProps {
  news: NewsItem[];
}

export function NewsFeed({ news }: NewsFeedProps) {
  if (!news || news.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 h-full min-h-[400px]">
        <h3 className="text-white text-lg font-bold mb-4">Latest News</h3>
        <p className="text-slate-400">No news found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 h-full">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        Latest News
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-normal">
          {news.length}
        </span>
      </h3>
      
      <div className="space-y-4">
        {news.map((item) => (
          <a 
            key={item.uuid || item.link} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                    {item.publisher}
                  </span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-slate-500 text-xs">
                    {formatDistanceToNow(new Date(item.providerPublishTime * 1000), { addSuffix: true })}
                  </span>
                </div>
                <h4 className="text-slate-200 font-medium leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>
              {/* Optional: Add Thumbnail if available */}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
