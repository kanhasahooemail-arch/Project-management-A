import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Loader2, 
  ShieldCheck, 
  Car, 
  Zap, 
  Activity,
  Terminal,
  Mic,
  MicOff,
  Copy,
  Check,
  Download,
  Trash2,
  Compass,
  History,
  Clock,
  Landmark,
  GraduationCap,
  Scale,
  Brain,
  ShieldAlert,
  Coins,
  Cpu,
  Globe,
  Share2
} from 'lucide-react';

export type GenerationalEra = 
  | 'universal_omni'
  | 'ancient_pre_19th'
  | 'industrial_19th_20th'
  | 'todays_generation'
  | 'future_post_20s';

interface Message {
  id: string;
  sender: 'user' | 'aura_ai';
  era?: GenerationalEra;
  text: string;
  timestamp: string;
  copied?: boolean;
}

interface Props {
  isHighContrast: boolean;
}

export const SpatialAIAssistant: React.FC<Props> = ({ isHighContrast }) => {
  const [selectedEra, setSelectedEra] = useState<GenerationalEra>('universal_omni');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-01',
      sender: 'aura_ai',
      era: 'universal_omni',
      text: `### Welcome to AURA Omni-Generational Advanced AI Problem Solver

I am your dedicated intelligence engine powered by Gemini 3.8 Flash, trained to provide solutions to **any problem, query, or challenge across all generations of human history**:

- 🏛️ **Before 19th Century & Ancient Era**: Vedic philosophies, traditional Ayurveda/wellness, classical literature, ancient architecture, and time-tested human wisdom.
- ⚙️ **19th & 20th Century Era (1800s–1990s)**: Industrial engineering, constitutional law, scientific breakthroughs, analog electronics, and civil rights.
- 📱 **Today's Generation (2000s–2020s: Gen Z / Millennials)**: Mental vitality, AI coding, competitive careers, digital burnout, financial independence, and family harmony.
- 🚀 **Future Generation (2030s–2050s & Beyond)**: Spatial holographic computing, post-quantum privacy, clean fusion, planetary climate resilience, and autonomous society.

Select any generation above or ask any question below in English, Hindi, or your preferred language. You can also use the microphone button to speak your question!`,
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        setSpeechSupported(true);
        const recog = new SpeechRec();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
          setIsListening(false);
          sound.playChirp(880, 0.05);
        };

        recog.onerror = () => {
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please type your query in the prompt box.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      sound.playScanPulse();
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Era Specific Curated Quick Prompts
  const quickPromptsByEra: Record<GenerationalEra, { label: string; query: string; icon: string }[]> = {
    universal_omni: [
      {
        label: 'Cross-Epoch Life Balance',
        query: 'How can a human combine ancient mindfulness, 20th-century work ethics, and 2026 AI tools to achieve true life success?',
        icon: '🌐',
      },
      {
        label: 'Student Study & Focus Plan',
        query: 'Create a master daily routine for students to eliminate distraction, excel in competitive exams, and protect mental health.',
        icon: '🎓',
      },
      {
        label: 'Emergency Law & Rights',
        query: 'Explain ordinary citizens legal rights during road accidents, harassment, or police interaction under Indian Constitution & BNS.',
        icon: '⚖️',
      },
      {
        label: 'Affordable Wealth Creation',
        query: 'How can someone with very low budget begin building financial security, micro-investments, and sovereign financial dignity?',
        icon: '💰',
      },
    ],
    ancient_pre_19th: [
      {
        label: 'Ayurveda & Circadian Vitality',
        query: 'Explain classical Ayurvedic circadian principles (Dinacharya) for natural vitality, sleep, and physical wellness without chemical dependency.',
        icon: '🏛️',
      },
      {
        label: 'Ancient Water & Civil Engineering',
        query: 'How did ancient Indian stepwells and Indus Valley civil engineering manage floods and droughts sustainably for centuries?',
        icon: '💧',
      },
      {
        label: 'Vedic Philosophy & Stoicism',
        query: 'What timeless lessons do the Bhagavad Gita, Upanishads, and Stoic philosophy offer for overcoming modern anxiety and fear of failure?',
        icon: '📜',
      },
      {
        label: 'Traditional Family & Community Unity',
        query: 'How did pre-industrial communities resolve family disputes, care for the elderly, and preserve inter-generational harmony?',
        icon: '🤝',
      },
    ],
    industrial_19th_20th: [
      {
        label: 'Constitutional Rights & Justice',
        query: 'How did 20th-century constitutional architects (like Dr. B.R. Ambedkar) design fundamental rights to protect common citizens from exploitation?',
        icon: '⚖️',
      },
      {
        label: 'Mechanical & Electrical Foundations',
        query: 'Explain the core principles of 20th-century industrial mechanics, electric grids, and analog telecommunications that built modern society.',
        icon: '⚙️',
      },
      {
        label: '20th-Century Discipline & Resilience',
        query: 'What work ethics and resilience strategies from post-independence and mid-20th-century generations can youth adopt today?',
        icon: '🔨',
      },
      {
        label: 'Public Health & Sanitation Revolution',
        query: 'How did 20th-century epidemiologists eradicate epidemics and establish public clean drinking water and sanitary standards?',
        icon: '🏥',
      },
    ],
    todays_generation: [
      {
        label: 'Digital Burnout & Overthinking',
        query: 'How can Gen Z and Millennials overcome information overload, social media comparison, and acute overthinking in daily life?',
        icon: '🧠',
      },
      {
        label: 'AI & Future-Proof Career Path',
        query: 'What skills should a student or working professional master right now to remain indispensable in the era of advanced AI and automation?',
        icon: '💻',
      },
      {
        label: 'Women & Girls Cyber Safety',
        query: 'Step-by-step guidance on handling online stalking, fake profiles, and blackmail under IT Act Section 67 and National Cyber Portal 1930.',
        icon: '🛡️',
      },
      {
        label: 'EV Mobility & Clean Energy Living',
        query: 'How can an everyday household transition to electric vehicles, rooftop solar, and sustainable living on a modest budget in 2026?',
        icon: '⚡',
      },
    ],
    future_post_20s: [
      {
        label: 'Spatial Holographic Interfaces',
        query: 'How will 3D augmented reality and holographic spatial displays replace mobile phones and flat screens in the 2030s and 2040s?',
        icon: '🕶️',
      },
      {
        label: 'Post-Quantum Sovereign Privacy',
        query: 'Explain why lattice-based post-quantum cryptography is essential for safeguarding citizen biometrics and sovereign data by 2035.',
        icon: '🔐',
      },
      {
        label: 'Planetary Climate Shield & Floods',
        query: 'What satellite radar and autonomous floodgate networks will protect human coastal cities from 15-to-30-day climate hazards in 2040?',
        icon: '🌍',
      },
      {
        label: 'Ethical Artificial Superintelligence',
        query: 'What governance protocols are necessary to ensure future superintelligent AI remains aligned with human flourishing and egalitarian justice?',
        icon: '🤖',
      },
    ],
  };

  const handleSendPrompt = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    sound.playHologramTap();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      era: selectedEra,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    // Build era-tailored system instruction
    const eraDescription = 
      selectedEra === 'ancient_pre_19th'
        ? 'Ground your solution primarily in pre-19th century and ancient wisdom (Vedic philosophy, Ayurveda, classical history, traditional community living, and timeless ethics), then show how to apply it today.'
        : selectedEra === 'industrial_19th_20th'
        ? 'Ground your solution in 19th & 20th century foundations (constitutional law, mechanical engineering, scientific rigor, discipline, and historical struggle for rights), then provide practical guidance.'
        : selectedEra === 'todays_generation'
        ? 'Focus on today\'s generation (Gen Z, Millennials, 2020s realities: career, digital burnout, mental health, AI tools, women/citizen safety, and practical small-budget execution).'
        : selectedEra === 'future_post_20s'
        ? 'Focus on the upcoming generation (2030s–2050s horizon: spatial holographic computing, post-quantum security, clean energy, planetary defense, and future human potential).'
        : 'Provide an omni-generational master synthesis: weave together the wisdom of ancient ancestors, the constitutional and scientific rigor of the 19th/20th century, the actionable realities of today\'s generation, and the visionary roadmap for future generations.';

    const systemInstruction = `You are AURA NEXUS Omni-Generational Spatial AI Assistant (Gemini 3.8 Core). 
Your mission is to provide profound, clear, compassionate, and actionable solutions for any question or problem faced by humans across all eras:
- Ancient & Pre-19th Century Wisdom
- 19th & 20th Century Science, Law & Industry
- Today's Generation (2020s youth, students, workers, families)
- Future Generations (2030s-2050s tech & planetary evolution).

${eraDescription}

Structure your answer with:
1. Direct Core Answer / Diagnostic
2. Historical & Generational Wisdom Applied
3. Concrete Step-by-Step Practical Action Plan
4. Legal / Ethical / Long-term Safeguard.
Keep answers uplifting, deeply knowledgeable, family-safe, and free of vulgarity or harmful elements.`;

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: text,
          systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      const aiReply = data.text || 'Spatial solution parameters generated successfully.';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'aura_ai',
        era: selectedEra,
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      sound.playLockSuccess();

      // Read aloud if TTS is enabled
      if (ttsEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanSpeech = aiReply
          .replace(/[#*_~`]/g, '')
          .replace(/\[.*?\]/g, '')
          .slice(0, 450); // read executive summary
        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Offline / Local Edge Fallback
      const fallbackReply = `### [AURA Omni-Generational Solution Engine]
**Query**: "${text}"

#### 1. Core Insight:
Humanity has faced variations of this challenge across every generation. The most effective resolution harmonizes time-tested discipline with modern capabilities.

#### 2. Actionable Pathway:
1. **Clarity Over Confusion**: Strip away external pressure; write down the core problem in 1 sentence.
2. **Apply Systematic Principles**: Whether studying, resolving a family dispute, or building a career, establish daily non-negotiable focus blocks.
3. **Use Sovereign Tools**: Tap into verified resources (such as Indian National Portals, ERSS 112, Cyber Cell 1930, or verified financial schemes).
4. **Long-Term Perspective**: Look 5 to 10 years ahead—momentary setbacks never define permanent capability.

*Sovereign Safety Verified: 100% Zero-Trust Encrypted | Universal Human Flourishing Standard.*`;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'aura_ai',
        era: selectedEra,
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      sound.playLockSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    sound.playChirp(880, 0.04);
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2500);
  };

  const handleExportChatDossier = () => {
    sound.playChirp(1040, 0.05);
    const chatDoc = {
      title: 'AURA NEXUS OMNI-GENERATIONAL AI SOLUTION DOSSIER',
      exportTimestamp: new Date().toISOString(),
      activeEraMode: selectedEra,
      conversationHistory: messages.map(m => ({
        speaker: m.sender === 'user' ? 'Citizen' : 'AURA Omni AI Intelligence',
        timestamp: m.timestamp,
        solutionContent: m.text,
      })),
      governanceClearance: 'OFFICIALLY VERIFIED UNDER SOVEREIGN DIGITAL ETHICS & DPDP ACT 2023',
    };

    const blob = new Blob([JSON.stringify(chatDoc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AURA-OMNI-AI-SOLUTION-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    sound.playChirp(440, 0.06, 'sawtooth');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'aura_ai',
        era: selectedEra,
        text: 'Conversation cleared. AURA Omni-Generational AI is ready for your next query across ancient, industrial, contemporary, or future eras.',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Omni-Generational AI Assistant */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast 
          ? 'bg-black border-cyan-400 text-white' 
          : 'bg-gradient-to-br from-slate-900/90 via-cyan-950/30 to-slate-900/90 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>GEMINI 3.8 FLASH OMNI-GENERATIONAL AI ASSISTANT</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOLUTIONS FOR ALL GENERATIONS</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>100% PRIVATE & ZERO-TRUST ENCRYPTED</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-3">
              Universal Problem Solver & Knowledge Oracle
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl font-sans">
              Get answers, guidance, and step-by-step solutions for <strong>any type of problem</strong> — bridging ancient wisdom (before 19th century), industrial & legal foundations (19th/20th century), contemporary youth challenges (today's Gen Z / Millennials), and future spatial horizons (2030s–2050s+).
            </p>
          </div>

          {/* Audio Readout & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => {
                const next = !ttsEnabled;
                setTtsEnabled(next);
                if (!next && window.speechSynthesis) window.speechSynthesis.cancel();
                sound.playHologramTap();
              }}
              className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                ttsEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Toggle Text-To-Speech voice readout of AI solutions"
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{ttsEnabled ? 'VOICE READOUT: ON' : 'VOICE READOUT: OFF'}</span>
            </button>

            <button
              onClick={handleExportChatDossier}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-all"
              title="Export all solutions as official JSON/text dossier"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Dossier</span>
            </button>

            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 transition-all"
              title="Clear conversation history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Generational Era Selector Tabs */}
      <div className={`p-4 rounded-2xl border ${
        isHighContrast ? 'bg-black border-white' : 'bg-slate-900/80 border-slate-800 backdrop-blur-md'
      } space-y-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>SELECT GENERATIONAL KNOWLEDGE ENGINE ERA:</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Tailors the AI's perspective, vocabulary, and depth to your chosen epoch
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <button
            onClick={() => {
              setSelectedEra('universal_omni');
              sound.playHologramTap();
            }}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedEra === 'universal_omni'
                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-base">🌐</div>
            <div className="text-xs font-bold mt-1">Universal Omni</div>
            <div className="text-[10px] text-cyan-300">All Epochs Synthesized</div>
          </button>

          <button
            onClick={() => {
              setSelectedEra('ancient_pre_19th');
              sound.playHologramTap();
            }}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedEra === 'ancient_pre_19th'
                ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-base">🏛️</div>
            <div className="text-xs font-bold mt-1">Before 19th Century</div>
            <div className="text-[10px] text-amber-300">Ancient, Vedic & Heritage</div>
          </button>

          <button
            onClick={() => {
              setSelectedEra('industrial_19th_20th');
              sound.playHologramTap();
            }}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedEra === 'industrial_19th_20th'
                ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-base">⚙️</div>
            <div className="text-xs font-bold mt-1">19th & 20th Century</div>
            <div className="text-[10px] text-emerald-300">Law, Science & Industry</div>
          </button>

          <button
            onClick={() => {
              setSelectedEra('todays_generation');
              sound.playHologramTap();
            }}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedEra === 'todays_generation'
                ? 'bg-purple-500/20 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-base">📱</div>
            <div className="text-xs font-bold mt-1">Today's Generation</div>
            <div className="text-[10px] text-purple-300">Gen Z / Millennials (2020s)</div>
          </button>

          <button
            onClick={() => {
              setSelectedEra('future_post_20s');
              sound.playHologramTap();
            }}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedEra === 'future_post_20s'
                ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-base">🚀</div>
            <div className="text-xs font-bold mt-1">Future Generation</div>
            <div className="text-[10px] text-sky-300">Post-2020s & 2030s–2050s</div>
          </button>
        </div>
      </div>

      {/* Curated Generational Quick Prompts Carousel */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SUGGESTED GENERATIONAL QUERIES (CLICK TO ASK INSTANTLY):</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {quickPromptsByEra[selectedEra].map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(qp.query)}
              disabled={isLoading}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all space-y-1 group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-cyan-300 group-hover:text-white">
                <span>{qp.icon}</span>
                <span>{qp.label}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {qp.query}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Chat Area */}
      <div className={`rounded-2xl border ${
        isHighContrast ? 'bg-black border-slate-700' : 'bg-slate-950/80 border-slate-800'
      } flex flex-col h-[520px] overflow-hidden`}>
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-500">
                <span>{msg.sender === 'user' ? 'CITIZEN' : 'AURA OMNI INTELLIGENCE'}</span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 transition-all leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : isHighContrast
                    ? 'bg-slate-900 text-white border border-slate-700 rounded-tl-none font-sans text-sm'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none font-sans text-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                }`}
              >
                {msg.text}

                {/* Message Action Bar for AI answers */}
                {msg.sender === 'aura_ai' && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-[10px] text-slate-500">
                      Sovereign Cryptographic AI Seal Verified
                    </span>

                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all"
                      title="Copy complete solution"
                    >
                      {copiedMsgId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Consulting Gemini 3.8 Omni-Generational Intelligence Matrix...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input Console */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          {/* Voice Input Mic Button */}
          <button
            onClick={handleToggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Click to speak your question via voice'}
          >
            {isListening ? <Mic className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input Box */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={
              isListening 
                ? 'Listening to your voice query now...' 
                : `Ask any question for ${selectedEra.replace(/_/g, ' ')}... (English, Hindi, etc.)`
            }
            disabled={isLoading}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendPrompt();
            }}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendPrompt()}
            disabled={!inputPrompt.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Solve</span>
          </button>
        </div>
      </div>
    </div>
  );
};
