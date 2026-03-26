import { useEffect, useState } from "react";

interface TickerItem {
  indexName: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
}

const INITIAL: TickerItem[] = [
  { indexName: "NIFTY 50", label: "NIFTY 50", value: 0, change: 0, changePercent: 0 },
  { indexName: "NIFTY BANK", label: "BANK NIFTY", value: 0, change: 0, changePercent: 0 },
  { indexName: "NIFTY MIDCAP 100", label: "NIFTY MIDCAP 100", value: 0, change: 0, changePercent: 0 },
];

const formatNumber = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const MarketTicker = () => {
  const [items, setItems] = useState<TickerItem[]>(INITIAL);
  const [pulse, setPulse] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchJson = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    };

    const fetchQuotes = async () => {
      try {
        const data = await fetchJson("/api/market");
        const quotes = data?.data as
          | Array<{
              index?: string;
              last?: number;
              variation?: number;
              percentChange?: number;
            }>
          | undefined;

        if (!quotes || quotes.length === 0) throw new Error("No quote data");

        const byIndex = new Map(quotes.map((quote) => [quote.index, quote]));

        setItems((prev) =>
          prev.map((item) => {
            const quote = byIndex.get(item.indexName);
            if (!quote || typeof quote.last !== "number") {
              return item;
            }

            return {
              ...item,
              value: Math.round(quote.last),
              change: Number((quote.variation ?? 0).toFixed(2)),
              changePercent: Number((quote.percentChange ?? 0).toFixed(2)),
            };
          }),
        );

        setIsLive(true);
      } catch (error) {
        console.error("Failed to fetch Yahoo Finance quotes:", error);
        setIsLive(false);
      }

      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center gap-1 md:gap-3 text-[10px] md:text-xs font-sans select-none"
      title={isLive ? "Live market data from NSE" : "Market data unavailable"}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500" : "bg-amber-400"} ${pulse ? "opacity-100" : "opacity-40"} transition-opacity duration-300`}
      />
      {items.map((item, i) => (
        <span key={item.indexName} className="flex items-center gap-1 md:gap-1.5">
          {i > 0 && <span className="text-muted-foreground/30 mx-0.5 hidden sm:inline">|</span>}
          <span className="text-muted-foreground font-medium tracking-wide">{item.label}</span>
          <span className="text-foreground/90 tabular-nums transition-all duration-500">{formatNumber(item.value)}</span>
          <span className={`tabular-nums transition-all duration-500 ${item.change >= 0 ? "text-green-500/80" : "text-red-400/80"}`}>
            {item.change >= 0 ? "▲" : "▼"} {item.change >= 0 ? "+" : ""}{formatNumber(item.change)} ({Math.abs(item.changePercent)}%)
          </span>
        </span>
      ))}
    </div>
  );
};

export default MarketTicker;
