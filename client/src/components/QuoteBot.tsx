/*
 * NEXUS FACILITY SERVICES — QuoteBot Component
 * Design: Bold Dark-Mode Industrial
 * A conversational chatbot that guides users through getting a cleaning quote
 */

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Phone, ArrowRight } from "lucide-react";
// Web3Forms key for direct browser-to-email submission
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "60b0c703-f29a-47e4-b929-39f1a114078a";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
  options?: string[];
  isTyping?: boolean;
}

// ─── Bot conversation flow ─────────────────────────────────────────────────────
const SERVICES_LIST = [
  "Commercial Cleaning",
  "Domestic Cleaning",
  "Steam Cleaning",
  "Floor Polishing",
  "Pressure Washing",
  "Window Cleaning",
  "Industrial Cleaning",
  "End of Lease Cleaning",
  "General Cleaning",
];

type BotStep =
  | "greeting"
  | "ask_service"
  | "ask_size"
  | "ask_frequency"
  | "ask_name"
  | "ask_phone"
  | "ask_suburb"
  | "summary"
  | "done";

interface QuoteData {
  service?: string;
  size?: string;
  frequency?: string;
  name?: string;
  phone?: string;
  suburb?: string;
}

function getBotResponse(step: BotStep, userInput: string, data: QuoteData): {
  text: string;
  options?: string[];
  nextStep: BotStep;
} {
  switch (step) {
    case "greeting":
      return {
        text: "Hi there! 👋 I'm Nexus Assistant. I can help you get a free cleaning quote in just a few steps. What type of cleaning service are you looking for?",
        options: SERVICES_LIST,
        nextStep: "ask_service",
      };
    case "ask_service":
      return {
        text: `Great choice! ${userInput} is one of our specialties. Our rate starts from **$39/hour**. How large is the space that needs cleaning?`,
        options: ["Small (1–2 bedrooms / under 100m²)", "Medium (3–4 bedrooms / 100–200m²)", "Large (5+ bedrooms / 200m²+)", "Commercial / Not sure"],
        nextStep: "ask_size",
      };
    case "ask_size":
      return {
        text: `Got it! How often would you like the cleaning done?`,
        options: ["One-off / Single clean", "Weekly", "Fortnightly", "Monthly", "Not sure yet"],
        nextStep: "ask_frequency",
      };
    case "ask_frequency":
      return {
        text: `Perfect. Now, what's your name so we can personalise your quote?`,
        nextStep: "ask_name",
      };
    case "ask_name":
      return {
        text: `Nice to meet you, ${userInput}! What's the best phone number to reach you on?`,
        nextStep: "ask_phone",
      };
    case "ask_phone":
      return {
        text: `Thanks! Last question — which suburb are you located in?`,
        nextStep: "ask_suburb",
      };
    case "ask_suburb": {
      const hrs = data.size?.includes("Small") ? "2–3" : data.size?.includes("Medium") ? "3–5" : "5–8";
      return {
        text: `Excellent! Here's your estimated quote summary:\n\n📋 **Service:** ${data.service}\n📐 **Size:** ${data.size}\n🔁 **Frequency:** ${data.frequency}\n📍 **Suburb:** ${userInput}\n⏱ **Estimated hours:** ${hrs} hrs\n💰 **Rate:** $39/hour\n\nOne of our team will call ${data.name} on ${data.phone} within 24 hours to confirm your booking. You can also call us directly on **0477 376 440**.`,
        options: ["📞 Call us now", "✅ That's all, thanks!"],
        nextStep: "summary",
      };
    }
    case "summary":
      if (userInput.includes("Call")) {
        return {
          text: `You can reach us directly on **0477 376 440** or email **admin.hr@nexusfacility.au**. We look forward to speaking with you! 😊`,
          nextStep: "done",
        };
      }
      return {
        text: `Thank you for your enquiry! We'll be in touch shortly. Have a great day! 🌟`,
        nextStep: "done",
      };
    default:
      return {
        text: "Is there anything else I can help you with? Feel free to call us on **0477 376 440** anytime.",
        nextStep: "done",
      };
  }
}

// ─── Render markdown-like bold text ───────────────────────────────────────────
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Main QuoteBot Component ───────────────────────────────────────────────────
export default function QuoteBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState<BotStep>("greeting");
  const [quoteData, setQuoteData] = useState<QuoteData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], nextStep?: BotStep, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          from: "bot",
          text,
          options,
        },
      ]);
      if (nextStep) setCurrentStep(nextStep);
    }, delay);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!started) {
      setStarted(true);
      setTimeout(() => {
        const response = getBotResponse("greeting", "", {});
        addBotMessage(response.text, response.options, response.nextStep, 500);
      }, 300);
    }
  };

  const handleUserInput = (text: string) => {
    if (!text.trim() || currentStep === "done") return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "user", text },
    ]);
    setInputValue("");

    // Update quote data based on step
    const updatedData = { ...quoteData };
    if (currentStep === "ask_service") updatedData.service = text;
    else if (currentStep === "ask_size") updatedData.size = text;
    else if (currentStep === "ask_frequency") updatedData.frequency = text;
    else if (currentStep === "ask_name") updatedData.name = text;
    else if (currentStep === "ask_phone") updatedData.phone = text;
    else if (currentStep === "ask_suburb") updatedData.suburb = text;
    setQuoteData(updatedData);

    // Get bot response
    const response = getBotResponse(currentStep, text, updatedData);
    addBotMessage(response.text, response.options, response.nextStep);

    // When we reach the suburb step, send the enquiry via Web3Forms
    if (currentStep === "ask_suburb" && !quoteSent) {
      setQuoteSent(true);
      const finalData = { ...updatedData, suburb: text };
      if (finalData.name && finalData.phone) {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Quote Request from ${finalData.name} — Nexus Facility Services`,
            name: finalData.name,
            phone: finalData.phone,
            service: finalData.service || "Not specified",
            suburb: finalData.suburb || text,
            property_size: finalData.size || "Not specified",
            frequency: finalData.frequency || "Not specified",
            from_name: "Nexus Facility Services QuoteBot",
            message: `QuoteBot enquiry\nService: ${finalData.service || 'Not specified'}\nSuburb: ${finalData.suburb || text}\nProperty Size: ${finalData.size || 'Not specified'}\nFrequency: ${finalData.frequency || 'Not specified'}`,
          }),
        }).catch(() => { /* silent fail — user already sees confirmation message */ });
      }
    }

    // Handle phone call option
    if (text.includes("Call us now")) {
      setTimeout(() => window.open("tel:0477376440"), 1200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(inputValue);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.62 0.22 230)",
          color: "oklch(0.20 0.10 245)",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "0.9rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          borderRadius: "2px",
          boxShadow: "0 8px 32px oklch(0.75 0.18 210 / 0.4)",
        }}
        aria-label="Open quote chatbot"
      >
        <MessageCircle className="w-5 h-5" />
        {!isOpen && <span>Get a Quote</span>}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-50 flex flex-col shadow-2xl"
          style={{
            width: "360px",
            maxWidth: "calc(100vw - 2rem)",
            height: "520px",
            maxHeight: "calc(100vh - 120px)",
            background: "oklch(0.22 0.10 245)",
            border: "1px solid oklch(0.75 0.18 210 / 0.3)",
            borderRadius: "4px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "oklch(0.62 0.22 230)",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{ background: "oklch(0.20 0.10 245)", borderRadius: "2px" }}
              >
                <Bot className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "oklch(0.20 0.10 245)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Nexus Assistant
                </div>
                <div className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "oklch(0.15 0.02 240)" }}>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "#22c55e" }}
                  />
                  Online — Instant Quote
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.20 0.10 245)" }}
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "oklch(0.25 0.04 240) transparent" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: msg.from === "bot" ? "oklch(0.75 0.18 210 / 0.15)" : "oklch(0.2 0.04 240)",
                    borderRadius: "2px",
                  }}
                >
                  {msg.from === "bot" ? (
                    <Bot className="w-3.5 h-3.5" style={{ color: "oklch(0.62 0.22 230)" }} />
                  ) : (
                    <User className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.02 240)" }} />
                  )}
                </div>

                <div className={`flex flex-col gap-2 max-w-[80%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  {/* Bubble */}
                  <div
                    className="px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.from === "bot" ? "oklch(0.14 0.03 240)" : "oklch(0.62 0.22 230)",
                      color: msg.from === "bot" ? "oklch(0.85 0.02 240)" : "oklch(0.20 0.10 245)",
                      borderRadius: "2px",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {renderText(msg.text)}
                  </div>

                  {/* Quick reply options */}
                  {msg.options && msg.from === "bot" && currentStep !== "done" && (
                    <div className="flex flex-col gap-1.5 w-full">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="text-left text-xs px-3 py-2 transition-all"
                          style={{
                            border: "1px solid oklch(0.75 0.18 210 / 0.4)",
                            color: "oklch(0.62 0.22 230)",
                            background: "transparent",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.background = "oklch(0.75 0.18 210 / 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.background = "transparent";
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.75 0.18 210 / 0.15)", borderRadius: "2px" }}
                >
                  <Bot className="w-3.5 h-3.5" style={{ color: "oklch(0.62 0.22 230)" }} />
                </div>
                <div
                  className="px-3 py-2 flex items-center gap-1"
                  style={{ background: "oklch(0.14 0.03 240)", borderRadius: "2px" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "oklch(0.62 0.22 230)",
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 px-3 py-3 border-t"
            style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}
          >
            {currentStep === "done" ? (
              <div className="flex gap-2">
                <a
                  href="tel:0477376440"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold"
                  style={{
                    background: "oklch(0.62 0.22 230)",
                    color: "oklch(0.20 0.10 245)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                  }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <button
                  onClick={() => {
                    setMessages([]);
                    setCurrentStep("greeting");
                    setQuoteData({});
                    setStarted(false);
                    setQuoteSent(false);
                    setIsOpen(false);
                    setTimeout(() => handleOpen(), 100);
                  }}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold"
                  style={{
                    border: "1px solid oklch(0.75 0.18 210 / 0.4)",
                    color: "oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                  }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  New
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 px-3 py-2 text-sm outline-none"
                  style={{
                    background: "oklch(0.14 0.03 240)",
                    border: "1px solid oklch(0.75 0.18 210 / 0.2)",
                    color: "white",
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: "2px",
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-3 py-2 transition-opacity disabled:opacity-40"
                  style={{
                    background: "oklch(0.62 0.22 230)",
                    color: "oklch(0.20 0.10 245)",
                    borderRadius: "2px",
                  }}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
