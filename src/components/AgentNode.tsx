interface AgentNodeProps {
  name: string;
  icon: string;
  active?: boolean;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

const AgentNode = ({ name, icon, active = false, delay = 0, size = "md" }: AgentNodeProps) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <div
      className="flex flex-col items-center gap-2 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center transition-all duration-500 ${
          active
            ? "glass-card glow-border-cyan animate-pulse-cyan"
            : "bg-hirex-navy/60 border border-foreground/10 hover:border-hirex-cyan/30"
        }`}
        style={{ animation: `floatNode 3s ease-in-out ${delay}ms infinite` }}
      >
        <span>{icon}</span>
      </div>
      {name && (
        <span className="text-[9px] font-medium text-hirex-text3 text-center max-w-[70px] leading-tight truncate">
          {name}
        </span>
      )}
    </div>
  );
};

export default AgentNode;
