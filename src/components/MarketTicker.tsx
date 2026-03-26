import { useState, useEffect, useRef } from "react";

interface TickerItem {
  symbol: string;
  label: string;
  base: number;
  value: number;
  change: number;
  changePercent: number;
}

const INITIAL: TickerItem[] = [
  { symbol: "NIFTY", label: "NIFTY 50", base: 22150, value: 22150, change: 120, changePercent: 0.54 },
  { symbol: "BANKNIFTY", label: "BANK NIFTY", base: 48200, value: 48200, change: -85, changePercent: -0.17 },
  { symbol: "SENSEX", label: "SENSEX", base: 73500, value: 73500, change: 210, changePercent: 0.29 },
];

const formatNumber = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const MarketTicker = () => {
  const [items, setItems] = useState<TickerItem[]>(INITIAL);
  const [pulse, setPulse] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * item.base * 0.001;
          const newValue = +(item.value + delta).toFixed(0);
          const newChange = +(newValue - item.base + item.change).toFixed(0);
          const newPercent = +((newChange / item.base) * 100).toFixed(2);
          return { ...item, value: newValue, change: newChange, changePercent: newPercent };
        })
      );
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-xs font-sans select-none" title="Live Market Data (Simulated)">
      <span className={`inline-block w-1.5 h-1.5 rounded-full bg-green-500 ${pulse ? "opacity-100" : "opacity-40"} transition-opacity duration-300`} />
      {items.map((item, i) => (
        <span key={item.symbol} className="flex items-center gap-1 md:gap-1.5">
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
