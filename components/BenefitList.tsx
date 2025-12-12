import React from 'react';
import { BookOpen, DollarSign, Clock, HeartHandshake } from 'lucide-react';
import { BenefitType } from '../types';

const benefits: BenefitType[] = [
  {
    title: "Receitas Lucrativas",
    description: "Aprenda as receitas de um cardápio completo de açaí cremoso que não congela e vicia o cliente na primeira garrafinha.",
    icon: "book"
  },
  {
    title: "Baixo Investimento",
    description: "Lista exata do que comprar para começar gastando menos de R$ 50,00 no supermercado do bairro.",
    icon: "dollar"
  },
  {
    title: "Venda Rápida",
    description: "Scripts de venda prontos para Whatsapp e Instagram que fazem o cliente pedir antes mesmo de você oferecer.",
    icon: "clock"
  },
  {
    title: "Fidelização",
    description: "Como transformar um cliente que comprou uma vez em alguém que compra toda semana.",
    icon: "heart"
  }
];

const IconMap: Record<string, React.ReactNode> = {
  book: <BookOpen className="w-6 h-6 text-white" />,
  dollar: <DollarSign className="w-6 h-6 text-white" />,
  clock: <Clock className="w-6 h-6 text-white" />,
  heart: <HeartHandshake className="w-6 h-6 text-white" />
};

export const BenefitList: React.FC = () => {
  return (
    <section className="py-16 bg-acai-900 text-white relative">
       {/* Decorative pattern */}
       <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            O que você vai aprender?
          </h2>
          <p className="text-acai-100 text-lg">
            Não são só receitas. É um <span className="text-summer-400 font-bold">mapa do tesouro</span> para o seu verão.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-acai-800 p-6 rounded-xl flex items-start gap-4 hover:bg-acai-700 transition-colors border border-acai-700">
              <div className="bg-gradient-to-br from-summer-500 to-summer-600 p-3 rounded-lg shadow-lg flex-shrink-0">
                {IconMap[b.icon]}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2 text-white">{b.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};