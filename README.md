# AI Investor Dashboard

A modern, responsive stock market dashboard built with **Next.js 14**, **Tailwind CSS**, and **Yahoo Finance**.

![AI Investor Dashboard](https://github.com/dcimring/ai-investor-dashboard/assets/placeholder-image.png)

## Features

-   **Real-time Data:** Fetch live stock quotes, market cap, P/E ratios, and more.
-   **Interactive Charts:** Visualize 1-year price history with interactive area charts (powered by `recharts`).
-   **News Feed:** Stay updated with the latest news articles for any company.
-   **Search:** Instant ticker search (supports symbols like AAPL, NVDA, TSLA).
-   **Robust Fallback:** Automatically switches to mock data if the API rate limit is reached.
-   **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices with a sleek "financial dark mode".

## Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
-   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
-   **Charts:** [Recharts](https://recharts.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Data:** [Yahoo Finance 2](https://github.com/gadicc/node-yahoo-finance2)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/dcimring/ai-investor-dashboard.git
cd ai-investor-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/page.tsx`: Main dashboard entry point.
-   `app/actions.ts`: Server actions for fetching stock data.
-   `components/`: UI components (Header, StockChart, CompanyInfo, NewsFeed).
-   `tailwind.config.js`: Tailwind CSS configuration.

## License

MIT