import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronRight, 
  ShoppingBag, 
  Beaker, 
  DollarSign, 
  TrendingUp, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  AlertCircle, 
  ShoppingCart, 
  Lock, 
  Package, 
  MapPin, 
  Bike, 
  Users, 
  Lightbulb, 
  ClipboardList, 
  CheckSquare, 
  BookOpen, 
  Zap, 
  Star, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';
import { Button } from './Button';

// --- Types & Constants ---

type Stage = 
  | 'quiz' 
  | 'intro_shop'
  | 'game_shop' 
  | 'game_prep' 
  | 'game_price' 
  | 'game_channels'
  | 'checklist'
  | 'game_sales' 
  | 'final_offer'
  | 'real_offer';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual sua experiência com vendas?",
    options: ["Começando do zero absoluto", "Já vendi algumas coisas", "Tenho experiência"]
  },
  {
    id: 2,
    question: "Quanto tempo você tem por dia?",
    options: ["1 a 2 horas (Renda Extra)", "Meio período", "Tempo integral"]
  },
  {
    id: 3,
    question: "Onde você pretende vender?",
    options: ["No meu bairro / Vizinhos", "Praia / Ruas movimentadas", "Instagram / Delivery"]
  }
];

interface ProductionData {
  qty500: number;
  cost500: number; // estimated cost per unit
  qty300: number;
  cost300: number; // estimated cost per unit
}

interface TierData {
  id: number;
  name: string;
  goal: string;
  items: string[];
  totalPrice: number;
  production: ProductionData;
}

const TIER_LISTS: Record<number, TierData> = {
  1: {
    id: 1,
    name: "Lista Orçamento Baixo",
    goal: "Venda rápida para reinvestir",
    items: [
      "Açaí polpa 1kg",
      "Leite condensado",
      "Leite em pó 200g",
      "Banana 1kg",
      "10 garrafas 500ml"
    ],
    totalPrice: 50.00,
    production: {
      qty500: 10,
      cost500: 5.00,
      qty300: 0,
      cost300: 0
    }
  },
  2: {
    id: 2,
    name: "Lista Experiência Intermediária",
    goal: "Mais sabores, mais tamanhos",
    items: [
      "Açaí polpa 2kg",
      "Leite em pó 400g",
      "Banana 1kg",
      "Morango 250g",
      "Paçoca 20 un.",
      "Kit Garrafas Mistas",
      "Granola Premium", 
      "Leite Condensado" 
    ],
    totalPrice: 100.00,
    production: {
      qty500: 10,
      cost500: 5.00,
      qty300: 10,
      cost300: 4.00
    }
  },
  3: {
    id: 3,
    name: "Lista Cardápio Premium",
    goal: "Experiência de marca completa",
    items: [
      "Açaí polpa 2kg",
      "Base Leite/Frutas",
      "Paçoca 20 un.",
      "Ingredientes Secretos",
      "Kit Garrafas +50un",
      "Personalização Marca",
      "Morango Fresco", 
      "Banana Prata",   
      "Kiwi Importado", 
      "Nutella Original", 
      "Leite Ninho",    
      "Adesivos Logo"   
    ],
    totalPrice: 200.00,
    production: {
      qty500: 25,
      cost500: 5.00,
      qty300: 25,
      cost300: 4.00
    }
  }
};

const CHANNEL_LABELS: Record<string, string> = {
  street: 'Venda na Rua',
  delivery: 'Delivery',
  resale: 'Próximos'
};

const FAQ_ITEMS = [
  {
    q: "O que exatamente eu vou receber?",
    a: "Você recebe 2 PDFs no seu email: um com receitas prontas e outro com o guia simples de como começar e vender açaí na garrafa."
  },
  {
    q: "É realmente possível começar com pouco dinheiro?",
    a: "Sim. O guia mostra como começar com um investimento baixo usando o que você já tem em casa."
  },
  {
    q: "Consigo começar no mesmo dia?",
    a: "Sim. As receitas e orientações permitem que você comece imediatamente."
  },
  {
    q: "Quem pode começar?",
    a: "Qualquer pessoa — até quem nunca vendeu nada antes."
  },
  {
    q: "Tem garantia?",
    a: "Sim. Se você não gostar do material, pode pedir reembolso dentro do prazo da plataforma."
  }
];

// --- Audio Helper (Synthesized Sound) ---
const playCoinSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Ignore audio errors
  }
};

const playBuyListSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, t);
    masterGain.connect(ctx.destination);

    // 1. Sliding Drawer ("Cha")
    // White noise for mechanical slide
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(1200, t); // Muffled mechanical sound

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15); // Quick fade

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(t);

    // 2. Bell 1 ("Ching" part 1) - G6
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1567.98, t + 0.08); // Starts slightly after drawer
    
    const osc1Gain = ctx.createGain();
    osc1Gain.gain.setValueAtTime(0, t + 0.08);
    osc1Gain.gain.linearRampToValueAtTime(0.8, t + 0.09); // Sharp attack
    osc1Gain.gain.exponentialRampToValueAtTime(0.01, t + 2.0); // Long resonant decay
    
    osc1.connect(osc1Gain);
    osc1Gain.connect(masterGain);
    osc1.start(t + 0.08);
    osc1.stop(t + 2.5);

    // 3. Bell 2 ("Ching" part 2) - C7
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2093.00, t + 0.14); // Distinct second interval
    
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0, t + 0.14);
    osc2Gain.gain.linearRampToValueAtTime(0.6, t + 0.15);
    osc2Gain.gain.exponentialRampToValueAtTime(0.01, t + 2.0); // Long resonant decay

    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    osc2.start(t + 0.14);
    osc2.stop(t + 2.5);

  } catch (e) {
    // Ignore audio errors
  }
};

const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Modern "Click" / "Pop" (Sine burst)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio errors
  }
};

export const Page2: React.FC = () => {
  const [stage, setStage] = useState<Stage>('quiz');
  const [progress, setProgress] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Quiz Specifics
  const [customBudget, setCustomBudget] = useState('');

  // Game Stats
  const [initialBalance, setInitialBalance] = useState(50);
  const [balance, setBalance] = useState(50); 
  const [tier, setTier] = useState(1); // 1, 2 or 3
  const [currentTierCost, setCurrentTierCost] = useState(0);
  
  // Sales Channel logic
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  const [revenue, setRevenue] = useState(0);
  
  // Pricing logic
  const [selectedPrice500, setSelectedPrice500] = useState<number | null>(null);
  const [selectedPrice300, setSelectedPrice300] = useState<number | null>(null);
  const [projectedMetrics, setProjectedMetrics] = useState<{revenue: number, profit: number} | null>(null);
  
  // Animation states
  const [notifications, setNotifications] = useState<{id: number, title: string, subtext: string, amount: number}[]>([]);

  // FAQ State
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // --- Quiz Logic ---
  const handleQuizAnswer = (answer?: string) => {
    if (soundEnabled) playClickSound();
    if (quizStep < QUESTIONS.length) {
      setQuizStep(prev => prev + 1);
      setProgress(((quizStep + 2) / (QUESTIONS.length + 2)) * 20); 
    }
  };

  const handleBudgetSelection = (amount: number) => {
    if (soundEnabled) playClickSound();
    setInitialBalance(amount);
    setBalance(amount);
    // Skip transition, go straight to intro_shop
    setStage('intro_shop');
    setProgress(30);
  };

  const handleStartShop = () => {
    if (soundEnabled) playClickSound();
    setStage('game_shop');
    setProgress(35);
  };

  // --- Game: Shop Logic (Select List) ---
  const handleSelectList = (selectedTierId: number) => {
    const cost = TIER_LISTS[selectedTierId].totalPrice;
    
    // Strict Budget Check
    if (balance < cost) return;

    setCurrentTierCost(cost);
    setBalance(prev => prev - cost);
    setTier(selectedTierId);
    if (soundEnabled) playBuyListSound();
    
    // Move to next stage
    setTimeout(() => {
       setStage('game_prep');
       setProgress(50);
    }, 800);
  };

  const currentTierData = TIER_LISTS[tier];

  // --- Game: Prep Logic ---
  const [prepProgress, setPrepProgress] = useState(0);
  useEffect(() => {
    if (stage === 'game_prep') {
      const interval = setInterval(() => {
        setPrepProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
               setStage('game_price'); 
               setProgress(65);
            }, 1500); // Increased delay for reading text
            return 100;
          }
          return prev + 1; // Slowed down progress
        });
      }, 60); // Slowed down tick
      return () => clearInterval(interval);
    }
  }, [stage]);


  // --- Game: Price Logic (Dynamic Calculation) ---
  useEffect(() => {
    if (stage === 'game_price') {
      const has300ml = currentTierData.production.qty300 > 0;
      
      // Only calculate if all necessary prices are selected
      if (!selectedPrice500 || (has300ml && !selectedPrice300)) {
        setProjectedMetrics(null);
        return;
      }

      const price500 = selectedPrice500;
      const price300 = selectedPrice300 || 0;
      const { qty500, qty300 } = currentTierData.production;
      const tierCost = currentTierData.totalPrice;

      const totalRevenue = (qty500 * price500) + (qty300 * price300);
      const totalProfit = totalRevenue - tierCost;

      setProjectedMetrics({
        revenue: totalRevenue,
        profit: totalProfit
      });
    }
  }, [selectedPrice500, selectedPrice300, currentTierData, stage]);

  const handleSelectPrice500 = (price: number) => {
    if (soundEnabled) playClickSound();
    setSelectedPrice500(price);
  };

  const handleSelectPrice300 = (price: number) => {
    if (soundEnabled) playClickSound();
    setSelectedPrice300(price);
  };

  const handleGoToChannels = () => {
    if (soundEnabled) playClickSound();
    setStage('game_channels');
    setProgress(80);
  };

  const handleToggleChannel = (channel: string) => {
     if (soundEnabled) playClickSound();
     if (selectedChannels.includes(channel)) {
        setSelectedChannels(prev => prev.filter(c => c !== channel));
     } else {
        setSelectedChannels(prev => [...prev, channel]);
     }
  };

  const handleGoToChecklist = () => {
    if (soundEnabled) playClickSound();
    setStage('checklist');
    setProgress(85);
  };

  const handleStartSalesSimulation = () => {
    if (soundEnabled) playClickSound();
    setStage('game_sales');
    setProgress(90);
  };

  const handleFinalOfferClick = () => {
    if (soundEnabled) playClickSound();
    setStage('real_offer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePurchase = () => {
    if (soundEnabled) playClickSound();
    alert("Redirecionar para o Checkout...");
  };

  const handleToggleSound = () => {
    if (!soundEnabled) {
      // playing sound when enabling
      playClickSound(); 
    } else {
      // playing sound before disabling
      playClickSound();
    }
    setSoundEnabled(!soundEnabled);
  }

  const toggleFaq = (idx: number) => {
    if (soundEnabled) playClickSound();
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  // --- Game: Sales Simulation ---
  useEffect(() => {
    if (stage === 'game_sales' && projectedMetrics) {
      let soldTicks = 0;
      const ticks = 8; // Number of notifications
      
      const interval = setInterval(() => {
        soldTicks++;
        
        // Product Logic (Simulated with Real Prices)
        const products = [];
        if (currentTierData.production.qty500 > 0) {
            products.push({ name: 'Garrafa 500ml', price: selectedPrice500 || 0 });
        }
        if (currentTierData.production.qty300 > 0) {
            products.push({ name: 'Garrafa 300ml', price: selectedPrice300 || 0 });
        }
        
        const selectedProduct = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 2) + 1; // 1 or 2 items
        const saleAmount = selectedProduct.price * qty;

        // Update money stats
        setRevenue(prev => prev + saleAmount);
        setBalance(prev => prev + saleAmount); // Add revenue to cash flow

        // Channel & Name Personalization Logic
        const channelId = selectedChannels.length > 0 
          ? selectedChannels[soldTicks % selectedChannels.length] 
          : 'street';
        
        let sourceName = CHANNEL_LABELS[channelId] || 'Cliente';
        
        if (channelId === 'resale') { // Próximos
             const names = ["Vizinha Meire", "Irmão Carlos", "Amiga Marta", "Tia Joana", "Primo João"];
             sourceName = names[Math.floor(Math.random() * names.length)];
        } else if (channelId === 'street') { // Rua
             const spots = ["Praia", "Sinaleira", "Centro", "Calçadão", "Parque"];
             sourceName = spots[Math.floor(Math.random() * spots.length)];
        }
        // delivery keeps "Delivery"

        const newNotif = {
          id: Date.now(),
          title: `Venda realizada - ${sourceName}`,
          subtext: `${qty}x ${selectedProduct.name}`,
          amount: saleAmount
        };
        
        setNotifications(prev => [newNotif, ...prev].slice(0, 4));
        
        if (soundEnabled) playCoinSound();

        if (soldTicks >= ticks) {
          clearInterval(interval);
          // Snap values to exact projection to avoid randomness drift
          setRevenue(projectedMetrics.revenue);
          setBalance(initialBalance - currentTierCost + projectedMetrics.revenue);

          setTimeout(() => {
            setStage('final_offer');
            setProgress(100);
          }, 2000);
        }
      }, 1200); // 1.2s delay for easier reading
      return () => clearInterval(interval);
    }
  }, [stage, projectedMetrics, soundEnabled, currentTierData, selectedChannels, initialBalance, currentTierCost, selectedPrice500, selectedPrice300]);


  // Current Profit Calculation (for Header)
  const currentProfit = revenue - currentTierCost;

  // Calculate dynamic average stats for final screen (Kept for reference, but UI will use fixed text)
  const calculateFinalStats = () => {
      if (!projectedMetrics) return { avgPrice: 0, monthlyProjection: 0 };
      const totalQty = currentTierData.production.qty500 + currentTierData.production.qty300;
      const avgPrice = totalQty > 0 ? projectedMetrics.revenue / totalQty : 0;
      return { avgPrice };
  };
  const { avgPrice } = calculateFinalStats();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-acai-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">VL</div>
             <span className="font-heading font-bold text-acai-900 text-sm">Verão Lucrativo</span>
          </div>
          <button onClick={handleToggleSound} className="text-gray-400 hover:text-acai-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
        {/* Progress Bar */}
        <div className="max-w-md mx-auto h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-summer-500 to-acai-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-lg">
        
        {/* STAGE: QUIZ - STANDARD QUESTIONS */}
        {stage === 'quiz' && quizStep < QUESTIONS.length && (
          <div className="w-full animate-fade-in-up">
            <span className="text-summer-600 font-bold text-xs tracking-wider uppercase mb-2 block">Personalização</span>
            <h2 className="font-heading text-2xl font-bold text-acai-900 mb-6">
              {QUESTIONS[quizStep].question}
            </h2>
            <div className="space-y-3">
              {QUESTIONS[quizStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(opt)}
                  className="w-full text-left p-5 rounded-xl border-2 border-gray-100 bg-white hover:border-summer-400 hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <span className="font-medium text-gray-700 group-hover:text-acai-900">{opt}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-summer-500" />
                </button>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-6">Pergunta {quizStep + 1} de 4</p>
          </div>
        )}

        {/* STAGE: QUIZ - BUDGET QUESTION */}
        {stage === 'quiz' && quizStep === QUESTIONS.length && (
           <div className="w-full animate-fade-in-up">
             <span className="text-summer-600 font-bold text-xs tracking-wider uppercase mb-2 block">Planejamento</span>
             <h2 className="font-heading text-2xl font-bold text-acai-900 mb-2">
               Quanto você pretende investir?
             </h2>
             <p className="text-gray-500 text-sm mb-6">Selecione seu capital inicial para o jogo.</p>
             
             <div className="grid grid-cols-1 gap-4 mb-6">
               {[50, 100, 200].map((val) => (
                 <button
                   key={val}
                   onClick={() => handleBudgetSelection(val)}
                   className="relative w-full text-left p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-summer-400 hover:bg-summer-50 transition-all flex items-center justify-between"
                 >
                   <span className="font-bold text-lg text-acai-900">R$ {val},00</span>
                   <ChevronRight className="w-5 h-5 text-gray-300" />
                   
                   {/* Recommended Badge */}
                   {val === 100 && (
                     <div className="absolute -top-2.5 right-4 bg-summer-500 text-acai-900 text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md animate-bounce-short">
                       Outras alunas indicam
                     </div>
                   )}
                 </button>
               ))}
             </div>

             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 font-bold">R$</span>
               </div>
               <input 
                 type="number" 
                 placeholder="Outro valor..."
                 value={customBudget}
                 onChange={(e) => setCustomBudget(e.target.value)}
                 className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-acai-500 focus:ring-0 outline-none text-lg font-bold text-gray-800"
               />
               {customBudget && (
                 <button 
                   onClick={() => handleBudgetSelection(Number(customBudget))}
                   className="absolute right-2 top-2 bottom-2 bg-acai-600 text-white px-4 rounded-lg font-bold hover:bg-acai-700 transition-colors"
                 >
                   Confirmar
                 </button>
               )}
             </div>
           </div>
        )}

        {/* STAGE: INTRO SHOP (Day 1) */}
        {stage === 'intro_shop' && (
          <div className="w-full text-center animate-fade-in-up bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
             {/* Day Badge */}
             <div className="absolute top-0 left-0 right-0 bg-acai-100 py-1 border-b border-acai-200">
               <span className="text-acai-800 text-xs font-bold uppercase tracking-widest">Dia 1: Preparação</span>
             </div>

             <div className="w-20 h-20 bg-summer-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                <ShoppingCart className="w-10 h-10 text-summer-600" />
             </div>
             <h2 className="font-heading text-2xl font-bold text-acai-900 mb-4">
               Vamos às Compras!
             </h2>
             <p className="text-gray-600 mb-6 leading-relaxed text-sm">
               Depois de adquirir e estudar nosso modelo de negócio, agora vamos às compras! Você vai <strong className="font-bold">simular</strong> a compra dos ingredientes no nosso mercado virtual. Isso vai te ajudar a entender o investimento e retorno desse negócio!
             </p>
             
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-800 text-left flex gap-3 mb-8">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p><strong>Importante:</strong> os valores apresentados a seguir são baseados em preços médios de mercado e podem variar de acordo com a região.</p>
             </div>

             <Button onClick={handleStartShop} fullWidth>
                Entrar no Mercado
             </Button>
          </div>
        )}

        {/* GAME UI WRAPPER */}
        {stage.startsWith('game_') || stage === 'checklist' ? (
           <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up relative pb-20 md:pb-6">
              {/* Day Indicator in Header */}
              <div className="bg-gray-100 border-b border-gray-200 py-1.5 text-center">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {(stage === 'game_shop' || stage === 'game_prep' || stage === 'game_price') && "Dia 1: Produção"}
                    {(stage === 'game_channels' || stage === 'checklist') && "Dia 2: Estratégia"}
                    {stage === 'game_sales' && "Dia 3: Lucro"}
                 </span>
              </div>

              {/* Game Header Stats */}
              <div className="bg-acai-900 text-white p-4 flex justify-between items-center transition-colors duration-500" style={{backgroundColor: tier === 3 ? '#2e0a2e' : undefined}}>
                 <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-1.5 rounded-lg"><ShoppingBag className="w-4 h-4 text-summer-400" /></div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-white/70 uppercase">Saldo Disponível</span>
                       <span className={`font-bold font-mono leading-none ${balance < 0 ? 'text-red-400' : 'text-white'}`}>
                         {balance < 0 ? '-' : ''} R$ {Math.abs(balance).toFixed(2)}
                       </span>
                    </div>
                 </div>
                 
                 {/* PROFIT INDICATOR (Right Side) */}
                 {(stage !== 'game_shop' && currentTierCost > 0) && (
                   <div className="flex items-center gap-2">
                      <div className="flex flex-col text-right">
                         <span className="text-[10px] text-gray-300 uppercase">Lucro</span>
                         <span className={`font-bold font-mono leading-none ${currentProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {currentProfit >= 0 ? '+' : ''} R$ {currentProfit.toFixed(2)}
                         </span>
                      </div>
                   </div>
                 )}
              </div>

              <div className="p-4 md:p-6 min-h-[400px] flex flex-col items-center justify-start relative">
                 
                 {/* GAME: SHOP LIST SELECTION */}
                 {stage === 'game_shop' && (
                    <div className="w-full">
                       <div className="text-center mb-6">
                         <h3 className="font-heading font-bold text-xl text-acai-900 leading-tight mb-2">
                           Você receberá as listas de compras completas
                         </h3>
                         <p className="text-sm text-gray-500">
                           Selecione uma lista e vamos para produção!
                         </p>
                       </div>
                       
                       <div className="space-y-4">
                          {[1, 2, 3].map((tierId) => {
                             const tierData = TIER_LISTS[tierId];
                             const cost = tierData.totalPrice;
                             const canAfford = balance >= cost;
                             const prod = tierData.production;

                             // Helper to show only first 2 items + count
                             const previewItems = tierData.items.slice(0, 2);
                             const remainingCount = Math.max(0, tierData.items.length - 2);
                             
                             let plusItemsText = `+ ${remainingCount} itens`;
                             if (tierId === 2) plusItemsText = "+ 6 itens";
                             if (tierId === 3) plusItemsText = "+ 10 itens";

                             const itemsText = remainingCount > 0 
                                ? `${previewItems.join(', ')}... ${plusItemsText}`
                                : previewItems.join(', ');

                             return (
                                <div key={tierId} className={`border-2 rounded-xl p-4 transition-all bg-white relative overflow-hidden group ${!canAfford ? 'opacity-50 grayscale border-gray-100' : 'border-gray-100 hover:border-summer-400 hover:shadow-md'}`}>
                                   {tierId === 3 && <div className="absolute top-0 right-0 bg-summer-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">PREMIUM</div>}
                                   
                                   <div className="flex justify-between items-start mb-3">
                                     <div>
                                        <h4 className="font-bold text-acai-900 text-sm md:text-base">{tierData.name}</h4>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{tierData.goal}</p>
                                     </div>
                                     <div className="text-right">
                                       <span className="block font-bold text-gray-800">Apróx. R$ {cost.toFixed(2)}</span>
                                     </div>
                                   </div>

                                   {/* Included Items Summary Text */}
                                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                         {itemsText}.
                                      </p>
                                   </div>

                                   {/* Production Info */}
                                   <div className="flex flex-col gap-1 mb-3">
                                      <span className="text-[10px] font-medium text-acai-700 bg-acai-50 px-2 py-1 rounded border border-acai-100 w-fit">
                                         {prod.qty500} garrafas de 500ml
                                      </span>
                                      {prod.qty300 > 0 && (
                                        <span className="text-[10px] font-medium text-acai-700 bg-acai-50 px-2 py-1 rounded border border-acai-100 w-fit">
                                           {prod.qty300} garrafas de 300ml
                                        </span>
                                      )}
                                   </div>

                                   <button 
                                     onClick={() => handleSelectList(tierId)}
                                     disabled={!canAfford}
                                     className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors
                                       ${canAfford 
                                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 cursor-pointer' 
                                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                       }`}
                                   >
                                      {canAfford ? (
                                        <>
                                          <Check className="w-4 h-4" />
                                          Comprar Lista
                                        </>
                                      ) : (
                                        <>
                                          <Lock className="w-4 h-4" />
                                          Saldo insuficiente
                                        </>
                                      )}
                                   </button>
                                </div>
                             )
                          })}
                       </div>
                    </div>
                 )}

                 {/* GAME: PREP */}
                 {stage === 'game_prep' && (
                    <div className="w-full text-center py-8">
                       <div className="w-24 h-24 bg-acai-100 rounded-full mx-auto mb-6 flex items-center justify-center relative">
                          <Beaker className="w-10 h-10 text-acai-600 animate-pulse" />
                          <div className="absolute inset-0 border-4 border-acai-200 rounded-full border-t-acai-600 animate-spin"></div>
                       </div>
                       <h3 className="font-heading font-bold text-xl mb-2">Preparando a Receita...</h3>
                       <p className="text-gray-500 text-sm mb-6">Misturando ingredientes da {currentTierData.name}</p>
                       
                       <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm text-green-800 animate-fade-in-up mb-8 shadow-sm">
                          <p>Não se preocupe, você receberá nosso cardápio completo e o passo a passo para produção.</p>
                       </div>

                       <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-8">
                          <div className="bg-acai-600 h-full transition-all duration-100" style={{width: `${prepProgress}%`}}></div>
                       </div>

                       <p className="text-xs text-gray-400 font-medium italic">
                          ~ Leva menos de 1 hora para produzir tudo
                       </p>
                    </div>
                 )}

                 {/* GAME: PRICE */}
                 {stage === 'game_price' && (
                    <div className="w-full">
                       <div className="bg-acai-50 p-4 rounded-xl border border-acai-100 mb-6 flex items-start gap-3">
                          <Package className="w-10 h-10 text-acai-600 p-2 bg-white rounded-lg shadow-sm" />
                          <div>
                             <h4 className="font-bold text-acai-900 text-sm">Produção Concluída!</h4>
                             <p className="text-xs text-acai-700 mt-1">
                                {currentTierData.production.qty500} garrafas de 500ml
                                {currentTierData.production.qty300 > 0 && ` e ${currentTierData.production.qty300} garrafas de 300ml`}.
                             </p>
                          </div>
                       </div>

                       <h3 className="font-heading font-bold text-lg mb-4 text-center">Quanto cobrar?</h3>
                       
                       {/* Price Selection 500ml */}
                       <p className="text-gray-500 text-xs mb-2 font-bold uppercase tracking-wide">
                         Garrafa de 500ml
                       </p>
                       <div className="grid grid-cols-3 gap-3 mb-6">
                          {[10, 12, 15].map((price) => {
                             const unitProfit = price - currentTierData.production.cost500;
                             return (
                               <button
                                  key={price}
                                  onClick={() => handleSelectPrice500(price)}
                                  className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${selectedPrice500 === price ? 'border-summer-500 bg-summer-50 ring-2 ring-summer-200' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                               >
                                  <span className="font-bold text-xl text-gray-800">R${price}</span>
                                  <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full mt-1">
                                    Lucro ~R${unitProfit.toFixed(2)}
                                  </span>
                               </button>
                             )
                          })}
                       </div>

                       {/* Price Selection 300ml (Conditional) */}
                       {currentTierData.production.qty300 > 0 && (
                         <>
                           <p className="text-gray-500 text-xs mb-2 font-bold uppercase tracking-wide">
                             Garrafa de 300ml
                           </p>
                           <div className="grid grid-cols-3 gap-3 mb-6">
                              {[6, 8, 10].map((price) => {
                                 const unitProfit = price - currentTierData.production.cost300;
                                 return (
                                   <button
                                      key={price}
                                      onClick={() => handleSelectPrice300(price)}
                                      className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${selectedPrice300 === price ? 'border-summer-500 bg-summer-50 ring-2 ring-summer-200' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                   >
                                      <span className="font-bold text-xl text-gray-800">R${price}</span>
                                      <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full mt-1">
                                        Lucro ~R${unitProfit.toFixed(2)}
                                      </span>
                                   </button>
                                 )
                              })}
                           </div>
                         </>
                       )}

                       {/* Action / Result - Dynamic Display */}
                       {projectedMetrics && (
                          <div className="animate-fade-in-up bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-4">
                             <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Resultado Projetado</span>
                             </div>
                             <div className="p-4">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                     <p className="text-xs text-gray-500 mb-0.5">Faturamento Total</p>
                                     <p className="font-bold text-lg text-gray-900">R$ {projectedMetrics.revenue.toFixed(2)}</p>
                                  </div>
                                  <div>
                                     <p className="text-xs text-gray-500 mb-0.5">Lucro Estimado</p>
                                     <p className="font-bold text-lg text-green-600">R$ {projectedMetrics.profit.toFixed(2)}</p>
                                  </div>
                                </div>
                                
                                <Button onClick={handleGoToChannels} fullWidth className="py-3 text-base">
                                   Ir para o segundo dia
                                </Button>
                             </div>
                          </div>
                       )}
                    </div>
                 )}

                 {/* GAME: CHANNELS (Day 2) */}
                 {stage === 'game_channels' && (
                    <div className="w-full">
                       <h3 className="font-heading font-bold text-lg mb-2 text-center text-acai-900">Onde você vai vender?</h3>
                       <p className="text-gray-500 text-xs mb-6 text-center">
                         Escolha suas estratégias para escoar a produção.
                       </p>

                       <div className="space-y-3 mb-8">
                          {[
                            { id: 'street', label: 'Venda na rua (praias, lugares movimentados)', icon: <MapPin className="w-5 h-5"/> },
                            { id: 'delivery', label: 'Delivery (ifood, instagram)', icon: <Bike className="w-5 h-5"/> },
                            { id: 'resale', label: 'Próximos (Vizinhos, Amigos)', icon: <Users className="w-5 h-5"/> },
                          ].map((channel) => {
                             const isSelected = selectedChannels.includes(channel.id);
                             return (
                                <button
                                   key={channel.id}
                                   onClick={() => handleToggleChannel(channel.id)}
                                   className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${isSelected ? 'border-summer-500 bg-summer-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                >
                                   <div className={`p-2 rounded-full ${isSelected ? 'bg-summer-200 text-summer-700' : 'bg-gray-100 text-gray-500'}`}>
                                      {channel.icon}
                                   </div>
                                   <span className={`font-bold text-left text-sm ${isSelected ? 'text-acai-900' : 'text-gray-600'}`}>{channel.label}</span>
                                   {isSelected && <Check className="w-5 h-5 text-summer-600 ml-auto flex-shrink-0" />}
                                </button>
                             )
                          })}
                       </div>
                       
                       <Button 
                          onClick={handleGoToChecklist} 
                          fullWidth 
                          className={`py-3 text-base ${selectedChannels.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                       >
                          Próxima etapa
                       </Button>
                    </div>
                 )}

                 {/* GAME: CHECKLIST (Day 2) */}
                 {stage === 'checklist' && (
                    <div className="w-full animate-fade-in-up">
                       <h3 className="font-heading font-bold text-lg mb-2 text-center text-acai-900">Tudo pronto?</h3>
                       <p className="text-gray-500 text-xs mb-6 text-center">
                         Confira o checklist antes de sair para vender.
                       </p>

                       <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                           <ul className="space-y-4">
                               <li className="flex items-start gap-3">
                                   <CheckSquare className="w-5 h-5 text-summer-500 flex-shrink-0 mt-0.5" />
                                   <span className="text-gray-700 text-sm">Organizar Instagram e WhatsApp</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <CheckSquare className="w-5 h-5 text-summer-500 flex-shrink-0 mt-0.5" />
                                   <span className="text-gray-700 text-sm">Anunciar em grupos e para amigos</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <CheckSquare className="w-5 h-5 text-summer-500 flex-shrink-0 mt-0.5" />
                                   <span className="text-gray-700 text-sm">Bolsa térmica preparada</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <CheckSquare className="w-5 h-5 text-summer-500 flex-shrink-0 mt-0.5" />
                                   <span className="text-gray-700 text-sm font-bold">Força de vontade e sorriso no rosto!</span>
                               </li>
                           </ul>
                       </div>

                       <Button onClick={handleStartSalesSimulation} fullWidth>
                          Vamos para as vendas
                       </Button>
                    </div>
                 )}

                 {/* GAME: SALES (Day 3) */}
                 {stage === 'game_sales' && (
                    <div className="w-full text-center relative h-full flex flex-col items-center">
                       <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                          <Smartphone className="w-64 h-64 text-gray-300" />
                       </div>
                       
                       <h3 className="font-heading font-bold text-xl mb-8 relative z-10">Vendas acontecendo!</h3>
                       
                       <div className="flex flex-col gap-3 items-center w-full relative z-10 w-full max-w-xs">
                          {notifications.map((notif) => (
                             <div key={notif.id} className="bg-white shadow-lg border-l-4 border-green-500 rounded-r-lg p-3 w-full flex items-center justify-between animate-slide-in-right">
                                <div className="flex flex-col items-start">
                                   <div className="flex items-center gap-2 mb-1">
                                      <div className="bg-green-100 p-1 rounded-full"><TrendingUp className="w-3 h-3 text-green-600" /></div>
                                      <span className="font-bold text-sm text-gray-800">{notif.title}</span>
                                   </div>
                                   <span className="text-xs text-gray-500 ml-6">{notif.subtext}</span>
                                </div>
                                <span className="font-bold text-green-600 text-sm">+ R$ {notif.amount}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>
        ) : null}

        {/* STAGE: FINAL OFFER */}
        {stage === 'final_offer' && projectedMetrics && (
           <div className="w-full text-center animate-fade-in-up">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
                 <div className="w-20 h-20 bg-summer-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-10 h-10 text-summer-600" />
                 </div>
                 
                 <h2 className="font-heading text-2xl font-extrabold text-acai-900 mb-4">
                    Parabéns, no primeiro dia já vendeu tudo!
                 </h2>
                 <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    Você já vendeu suas primeiras <strong className="text-acai-700">{currentTierData.production.qty500 + currentTierData.production.qty300} garrafas</strong> e faturou <strong className="text-green-600">R$ {projectedMetrics.revenue.toFixed(2)}</strong> com lucro de <strong className="text-green-600">R$ {projectedMetrics.profit.toFixed(2)}</strong>!
                 </p>
                 
                 {/* Dica Reinvestimento */}
                 <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6 text-left flex gap-3">
                     <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                     <p className="text-sm text-yellow-800 font-medium leading-snug">
                       <strong className="block mb-1 text-yellow-900">Dica:</strong>
                       Reinvista tudo, melhore o produto e multiplique seus lucros!
                     </p>
                 </div>

                 {/* Projeção Fixa */}
                 <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                   <p className="text-gray-600 text-sm leading-relaxed">
                     Fazendo apenas <strong className="text-gray-900">10 vendas por dia</strong>, a <strong className="text-gray-900">R$ 12,00</strong> cada, você atinge um faturamento de <strong className="text-green-600">R$ 3.600,00 no mês</strong>! Isso dá mais de <strong className="text-green-600">R$ 2.000,00 de lucro</strong>!!
                     <br/><br/>
                     Venda mais ou ajuste seu preço e tenha ganhos maiores!
                   </p>
                 </div>

                 <Button fullWidth onClick={handleFinalOfferClick} className="animate-pulse shadow-summer-500/30">
                    Quero começar a lucrar!
                 </Button>
              </div>
           </div>
        )}

        {/* STAGE: REAL OFFER (Pitch de Vendas) */}
        {stage === 'real_offer' && (
           <div className="w-full animate-fade-in-up">
              <div className="text-center mb-8">
                 <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-acai-900 leading-tight mb-4">
                    Você acabou de ver na prática como o negócio funciona.
                 </h2>
                 <p className="text-gray-600 text-lg">
                    Agora vou te entregar exatamente o que você precisa para fazer e vender igual.
                 </p>
              </div>

              {/* CARD: O QUE VOCÊ RECEBE */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                  <div className="bg-acai-900 p-6 text-center">
                     <h3 className="text-white font-heading font-bold text-xl uppercase tracking-wider">O que você recebe:</h3>
                  </div>

                  {/* Section 1: Receitas */}
                  <div className="p-6 md:p-8 border-b border-gray-100 bg-acai-50/50">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="bg-acai-100 p-2 rounded-lg">
                           <BookOpen className="w-6 h-6 text-acai-600" />
                        </div>
                        <h4 className="font-bold text-acai-900 text-lg">Receitas de um cardápio completo</h4>
                     </div>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                           <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                           <span>+14 receitas prontas</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                           <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                           <span>Versões de 300ml e 500ml</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                           <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                           <span>Quantidades exatas (gramas e ml)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                           <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                           <span>Modo de preparo em passos simples</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                           <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                           <span><strong>Sabores mais vendidos</strong> (tudo testado!)</span>
                        </li>
                     </ul>
                  </div>

                  {/* Section 2: Guia de Vendas */}
                  <div className="p-6 md:p-8">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="bg-summer-100 p-2 rounded-lg">
                           <TrendingUp className="w-6 h-6 text-summer-600" />
                        </div>
                        <h4 className="font-bold text-acai-900 text-lg">Guia de vendas e lucratividade</h4>
                     </div>
                     <p className="text-xs text-gray-500 mb-4">Passo a passo para começar do zero, vender em casa ou na rua e lucrar R$ 3.000/mês.</p>
                     
                     <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                        <p className="font-bold text-gray-800 text-sm mb-3 border-b pb-2">Como começar a vender:</p>
                        <ul className="space-y-3">
                           <li className="flex items-start gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-summer-500 mt-0.5 flex-shrink-0" />
                              <span>Lista do que você precisa para iniciar</span>
                           </li>
                           <li className="flex items-start gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-summer-500 mt-0.5 flex-shrink-0" />
                              <span>Como calcular custos e definir preço</span>
                           </li>
                           <li className="flex items-start gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-summer-500 mt-0.5 flex-shrink-0" />
                              <span>Técnicas básicas de abordagem e vendas</span>
                           </li>
                           <li className="flex items-start gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-summer-500 mt-0.5 flex-shrink-0" />
                              <span>Dicas práticas de atendimento e divulgação</span>
                           </li>
                        </ul>
                     </div>
                  </div>
              </div>

              {/* PRICE ANCHOR */}
              <div className="text-center mb-8">
                 <p className="text-gray-400 text-sm line-through mb-1">Tudo isso vale R$ 97,00</p>
                 <div className="inline-block bg-green-50 border border-green-200 rounded-2xl px-8 py-4 mb-4">
                    <p className="text-sm text-green-800 font-bold uppercase tracking-wide mb-1">Oferta Especial</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-green-600">R$ 19,90</p>
                 </div>
                 <p className="text-xs text-gray-500 max-w-xs mx-auto">Pagamento único. Acesso vitalício.</p>
              </div>

              {/* CLOSING ARGUMENTS */}
              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200 text-center">
                 <div className="flex justify-center mb-4">
                    <Zap className="w-8 h-8 text-yellow-500 fill-current" />
                 </div>
                 <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                   "O método é simples. As receitas funcionam. Qualquer pessoa consegue começar com pouco e recuperar o valor investido com lucro logo no primeiro dia!"
                 </p>
                 <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Ler</span> 
                    <ChevronRight className="w-4 h-4" />
                    <span>Aplicar</span>
                    <ChevronRight className="w-4 h-4" />
                    <strong className="text-green-600">Lucrar</strong>
                 </div>
                 <p className="text-xs text-gray-400 mt-2">Não é um curso longo, é prático e direto ao ponto.</p>
              </div>

              <Button fullWidth onClick={handlePurchase} className="shadow-2xl animate-pulse mb-12">
                 Comprar Agora
              </Button>

              {/* FAQ SECTION */}
              <div className="w-full max-w-md mx-auto mb-8 text-left">
                 <div className="flex items-center justify-center gap-2 mb-6">
                    <HelpCircle className="w-5 h-5 text-acai-600" />
                    <h3 className="font-heading font-bold text-lg text-acai-900">Perguntas Frequentes</h3>
                 </div>
                 <div className="space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                       <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all">
                          <button 
                             onClick={() => toggleFaq(index)}
                             className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                          >
                             <span className="font-bold text-acai-900 text-sm pr-4">{item.q}</span>
                             <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <div className="p-4 pt-0 text-sm text-gray-600 bg-white border-t border-gray-50 leading-relaxed">
                                {item.a}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};