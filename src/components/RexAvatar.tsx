import { cn } from "@/lib/utils";

type Mood = "idle" | "talking" | "thinking" | "happy" | "wave";

interface RexAvatarProps {
  size?: number;
  mood?: Mood;
  className?: string;
}

/**
 * Rex — the HireX hiring mascot.
 * A friendly AI recruiter character built in pure SVG + CSS animation.
 * Hire + Rex = Rex. He finds the right people, and the right answers.
 */
const RexAvatar = ({ size = 64, mood = "idle", className }: RexAvatarProps) => {
  return (
    <div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="rex-float w-full h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_6px_18px_rgba(91,110,245,0.55)]">
          <defs>
            <radialGradient id="rexBody" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="hsl(232 88% 78%)" />
              <stop offset="55%" stopColor="hsl(232 86% 66%)" />
              <stop offset="100%" stopColor="hsl(240 70% 42%)" />
            </radialGradient>
            <radialGradient id="rexCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(290 90% 78% / 0.9)" />
              <stop offset="100%" stopColor="hsl(290 90% 78% / 0)" />
            </radialGradient>
            <linearGradient id="rexAntenna" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(284 90% 75%)" />
              <stop offset="100%" stopColor="hsl(232 86% 66%)" />
            </linearGradient>
          </defs>

          {/* Antenna */}
          <line x1="50" y1="14" x2="50" y2="6" stroke="url(#rexAntenna)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="5" r="3.2" fill="hsl(284 95% 78%)" className="rex-antenna-pulse" />

          {/* Head / body */}
          <rect x="14" y="14" width="72" height="68" rx="22" fill="url(#rexBody)" stroke="hsl(232 50% 28%)" strokeWidth="1.2" />

          {/* Cheeks */}
          <ellipse cx="28" cy="58" rx="8" ry="5" fill="url(#rexCheek)" />
          <ellipse cx="72" cy="58" rx="8" ry="5" fill="url(#rexCheek)" />

          {/* Eyes */}
          <g className={mood === "thinking" ? "rex-eye-think" : "rex-blink"}>
            <ellipse cx="36" cy="44" rx="7" ry="9" fill="white" />
            <ellipse cx="64" cy="44" rx="7" ry="9" fill="white" />
            <circle cx="37" cy="46" r="3.5" fill="hsl(232 60% 18%)" />
            <circle cx="65" cy="46" r="3.5" fill="hsl(232 60% 18%)" />
            <circle cx="38.5" cy="44.5" r="1.2" fill="white" />
            <circle cx="66.5" cy="44.5" r="1.2" fill="white" />
          </g>

          {/* Mouth — shape depends on mood */}
          {mood === "talking" && (
            <ellipse cx="50" cy="66" rx="6" ry="4" fill="hsl(232 60% 16%)" className="rex-talk" />
          )}
          {mood === "happy" && (
            <path d="M 40 64 Q 50 74 60 64" stroke="hsl(232 60% 16%)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          )}
          {mood === "wave" && (
            <path d="M 41 65 Q 50 71 59 65" stroke="hsl(232 60% 16%)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          )}
          {(mood === "idle" || mood === "thinking") && (
            <path d="M 43 66 Q 50 70 57 66" stroke="hsl(232 60% 16%)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          )}

          {/* Side "ears" / headphones */}
          <rect x="9" y="38" width="6" height="20" rx="3" fill="hsl(284 70% 60%)" />
          <rect x="85" y="38" width="6" height="20" rx="3" fill="hsl(284 70% 60%)" />

          {/* Waving hand */}
          {mood === "wave" && (
            <g className="rex-wave-hand" style={{ transformOrigin: "84px 70px" }}>
              <circle cx="88" cy="72" r="6" fill="hsl(232 86% 66%)" stroke="hsl(232 50% 28%)" strokeWidth="1" />
            </g>
          )}

          {/* Thinking dots */}
          {mood === "thinking" && (
            <g>
              <circle cx="78" cy="22" r="2" fill="hsl(284 90% 75%)" className="rex-think-dot" style={{ animationDelay: "0ms" }} />
              <circle cx="84" cy="18" r="2.5" fill="hsl(284 90% 75%)" className="rex-think-dot" style={{ animationDelay: "200ms" }} />
              <circle cx="91" cy="13" r="3" fill="hsl(284 90% 75%)" className="rex-think-dot" style={{ animationDelay: "400ms" }} />
            </g>
          )}
        </svg>
      </div>

      <style>{`
        .rex-float { animation: rexFloat 3.6s ease-in-out infinite; transform-origin: center; }
        @keyframes rexFloat {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-4px) rotate(1.5deg); }
        }
        .rex-blink { animation: rexBlink 4.5s infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes rexBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95%, 97% { transform: scaleY(0.08); }
        }
        .rex-eye-think { animation: rexLookUp 2.2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes rexLookUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .rex-talk { animation: rexTalk 0.32s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes rexTalk {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.1); }
        }
        .rex-antenna-pulse { animation: rexPulse 1.6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes rexPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.25); filter: drop-shadow(0 0 6px hsl(284 95% 78%)); }
        }
        .rex-wave-hand { animation: rexWave 0.6s ease-in-out infinite; }
        @keyframes rexWave {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(25deg); }
        }
        .rex-think-dot { animation: rexThinkDot 1.4s ease-in-out infinite; }
        @keyframes rexThinkDot {
          0%, 100% { opacity: 0.2; transform: translateY(2px); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
};

export default RexAvatar;
