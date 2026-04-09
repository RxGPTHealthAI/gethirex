import { useEffect, useRef, useState } from "react";

interface LiveFeedProps {
  agent: string;
  message: string;
  delay?: number;
  color?: string;
}

const LiveFeed = ({ agent, message, delay = 0, color = "cyan" }: LiveFeedProps) => {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(message.slice(0, i + 1));
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [visible, message]);

  const colorClasses = color === "teal"
    ? "border-hirex-teal/30 bg-hirex-teal/5"
    : "border-hirex-cyan/30 bg-hirex-cyan/5";

  const agentColor = color === "teal" ? "text-hirex-teal" : "text-hirex-cyan";

  if (!visible) return null;

  return (
    <div ref={ref} className={`${colorClasses} border rounded-lg px-4 py-3 font-mono text-sm animate-fade-in`}>
      <span className={`${agentColor} font-bold`}>[{agent}]:</span>{" "}
      <span className="text-foreground/80">{typed}</span>
      {typed.length < message.length && (
        <span className={`inline-block w-2 h-4 ${color === "teal" ? "bg-hirex-teal" : "bg-hirex-cyan"} ml-0.5 animate-pulse`} />
      )}
    </div>
  );
};

export default LiveFeed;
