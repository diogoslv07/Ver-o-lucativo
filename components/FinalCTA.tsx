import React from 'react';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

interface FinalCTAProps {
  onNext: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNext }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-acai-600 via-summer-500 to-acai-600"></div>

          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-acai-900 mb-6">
            Você está a um passo da sua <br/>
            <span className="text-summer-600">Liberdade Financeira</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Não deixe o verão acabar para se arrepender de não ter começado. 
            O investimento é baixo e o retorno é rápido.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button onClick={onNext} className="w-full md:w-auto px-12 py-5 text-xl">
              Quero testar como funciona
            </Button>
            
            <div className="flex items-center gap-2 text-acai-700 bg-acai-50 px-4 py-2 rounded-full mt-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Oferta por tempo limitado</span>
            </div>
          </div>

        </div>
        
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2026 Verão Lucrativo. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.</p>
        </footer>
      </div>
    </section>
  );
};