import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import RexAvatar from "./RexAvatar";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hirex-chat`;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "👋 Hey, I'm **Rex** — your HireX hiring sidekick.\n\nThink of me as the colleague who never sleeps and actually *enjoys* recruiting paperwork. I can help you:\n\n- 🎯 Understand how our AI agents screen, schedule & engage candidates\n- ⚡ Get set up in minutes\n- 💸 Pick the right plan\n- 📅 Loop in our human team when you need them\n\nSo — what are we hiring for today?",
};

const SUGGESTIONS = [
  "How do you screen candidates?",
  "Get me started 🚀",
  "Show me pricing",
  "I need a human",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== WELCOME && prev.length > next.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (resp.status === 429) {
        toast.error("Lots of requests right now — please try again in a moment.");
        setLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI service temporarily unavailable. Email care@gethirex.space.");
        setLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Couldn't reach HireX Care. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const lastMsg = messages[messages.length - 1];
  const headerMood: "talking" | "thinking" | "wave" | "idle" = loading
    ? lastMsg?.role === "user"
      ? "thinking"
      : "talking"
    : messages.length <= 1
      ? "wave"
      : "idle";

  return (
    <>
      {/* Launcher — Rex peeks out */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Rex chat" : "Chat with Rex"}
        className={cn(
          "fixed z-[60] bottom-5 right-5 md:bottom-6 md:right-6 group",
          "w-16 h-16 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-primary via-primary to-hirex-violet",
          "shadow-[0_12px_32px_rgba(91,110,245,0.55)]",
          "hover:scale-110 active:scale-95 transition-transform duration-300",
        )}
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <RexAvatar size={52} mood="wave" />
        )}
        {!open && (
          <>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hirex-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-hirex-cyan" />
            </span>
            <span className="absolute -top-10 right-0 whitespace-nowrap bg-hirex-bg2 border border-border text-foreground text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Hi, I'm Rex 👋
            </span>
          </>
        )}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed z-[59] bg-hirex-surface border border-border shadow-2xl",
          "transition-all duration-200 origin-bottom-right",
          "flex flex-col overflow-hidden",
          "inset-x-0 bottom-0 top-16 rounded-t-2xl",
          "md:inset-auto md:bottom-24 md:right-6 md:top-auto md:w-[400px] md:h-[620px] md:rounded-2xl",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
        )}
        role="dialog"
        aria-label="Chat with Rex"
      >
        {/* Header — live Rex */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/20 via-hirex-violet/15 to-hirex-cyan/10 relative overflow-hidden">
          <div className="shrink-0 relative">
            <RexAvatar size={48} mood={headerMood} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              Rex
              <span className="text-[10px] font-normal text-hirex-text3">· HireX hiring sidekick</span>
            </div>
            <div className="text-xs text-hirex-text3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {loading ? (lastMsg?.role === "user" ? "Thinking…" : "Typing…") : "Online · Replies in seconds"}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-md hover:bg-foreground/5 text-hirex-text2"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex items-end gap-2", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "assistant" && (
                <div className="shrink-0 mb-0.5">
                  <RexAvatar size={28} mood={loading && i === messages.length - 1 ? "talking" : "idle"} />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-hirex-bg2 text-foreground rounded-bl-sm border border-border",
                )}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-a:text-primary-light prose-strong:text-foreground">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{m.content}</div>
                )}
              </div>
            </div>
          ))}

          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-end gap-2 justify-start">
              <div className="shrink-0 mb-0.5">
                <RexAvatar size={28} mood="thinking" />
              </div>
              <div className="bg-hirex-bg2 border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-hirex-text3 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-hirex-text3 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-hirex-text3 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="pt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-hirex-bg2 hover:border-primary hover:text-primary-light text-hirex-text2 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 bg-hirex-surface">
          <div className="flex items-end gap-2 bg-hirex-bg2 border border-border rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask Rex anything about HireX…"
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-hirex-text3 max-h-32 py-1"
              disabled={loading}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary-light transition-colors shrink-0"
              aria-label="Send message"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-hirex-text3 text-center mt-2">
            Rex is HireX's AI · For urgent issues email care@gethirex.space
          </p>
        </div>
      </div>
    </>
  );
}
