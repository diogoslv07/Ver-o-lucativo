import React from 'react';
import { Button } from './Button';
import { TrendingUp, Sun } from 'lucide-react';

interface HeroProps {
  onNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNext }) => {
  return (
    <section className="relative bg-acai-900 text-white pt-8 md:pt-20 pb-0 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Background Pattern" 
            className="w-full h-full object-cover"
         />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pb-24 md:pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-acai-800/80 border border-acai-600 rounded-full px-4 py-1.5 mb-8 animate-fade-in-down backdrop-blur-sm shadow-sm hover:bg-acai-800 transition-colors cursor-default">
            <Sun className="w-4 h-4 text-summer-500" />
            <span className="text-sm font-semibold tracking-wide text-summer-400 uppercase">
              Oportunidade de Verão 2026
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight drop-shadow-xl tracking-tight">
            Transforme esse calor em <span className="text-transparent bg-clip-text bg-gradient-to-r from-summer-500 to-red-400">DINHEIRO NO BOLSO</span>!
          </h1>

          <p className="text-lg md:text-2xl text-acai-100 mb-10 max-w-2xl leading-relaxed font-light">
            Domine a receita, o preparo e a venda do Açaí na Garrafa e aproveite a estação mais lucrativa do ano. Experimente na prática como alunas estão vendendo de <strong className="text-white font-semibold">R$100 a R$300 por dia</strong> mesmo começando do zero absoluto.
          </p>

          <div className="flex flex-col items-center gap-4 w-full max-w-md relative z-20">
            <Button onClick={onNext} fullWidth className="shadow-summer-500/20 shadow-2xl">
              Começar minha experiência
            </Button>
            
            <p className="text-sm text-acai-200 font-medium tracking-wide opacity-80">
              ~ Mais de 582 pessoas começaram essa semana
            </p>
          </div>
        </div>
      </div>
      
      {/* Elegant S-Curve Divider */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-10">
        <svg 
          className="w-full h-16 md:h-24 fill-gray-50" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};