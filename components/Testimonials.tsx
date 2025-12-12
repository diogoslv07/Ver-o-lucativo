import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialType } from '../types';
import { Button } from './Button';

const testimonials: TestimonialType[] = [
  {
    name: "Ana Clara",
    role: "Desempregada há 6 meses",
    profit: "R$ 2.400",
    quote: "Comecei vendendo na porta da escola do meu filho. No primeiro dia vendi tudo em 40 minutos! É surreal.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Marcos Paulo",
    role: "Estudante",
    profit: "R$ 1.800",
    quote: "Eu só queria dinheiro pro final de semana. Agora virou meu trabalho principal. O segredo é a receita cremosa.",
    avatar: "https://picsum.photos/100/100?random=3"
  },
  {
    name: "Júlia Costa",
    role: "Mãe de 2",
    profit: "R$ 3.100",
    quote: "Faço tudo na minha cozinha. As garrafinhas saem que nem água. Esse guia salvou meu verão.",
    avatar: "https://picsum.photos/100/100?random=4"
  }
];

interface TestimonialsProps {
  onNext: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onNext }) => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Gente como a gente fazendo acontecer
          </h2>
          <p className="text-gray-500">
            Resultados reais de quem decidiu não reclamar do calor, mas lucrar com ele.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-acai-200" />
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-summer-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 italic">"{t.quote}"</p>
              <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full inline-block">
                Lucrou {t.profit} em 1 mês
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={onNext} className="shadow-xl">
             Quero ter resultados assim
          </Button>
          <p className="text-sm text-gray-400">Resultados variam conforme dedicação, mas o método funciona para todos.</p>
        </div>
      </div>
    </section>
  );
};