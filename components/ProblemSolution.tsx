import React from 'react';
import { XCircle, CheckCircle2, ThermometerSun } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
          
          {/* Image/Visual Context */}
          <div className="w-full lg:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-summer-500 rounded-full opacity-20 blur-2xl"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-acai-600 rounded-full opacity-20 blur-2xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=800&auto=format&fit=crop" 
               alt="Sol forte representando o calor do verão" 
               className="rounded-2xl shadow-2xl w-full aspect-square object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white"
             />
             
             {/* Floating Widgets Container */}
             <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-3 z-10 max-w-[90%]">
                 
                 {/* Thermal Sensation Card */}
                 <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 border border-gray-100">
                    <div className="bg-red-100 p-2 rounded-full">
                      <ThermometerSun className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Sensação Térmica</p>
                      <p className="font-heading font-bold text-2xl text-gray-800">40°C</p>
                    </div>
                 </div>

                 {/* News Card Simulation */}
                 <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 w-full md:w-72 transform rotate-1 hover:rotate-0 transition-all duration-300">
                    <div className="bg-[#C4170C] px-3 py-1.5 border-b border-[#a0130a]">
                       <p className="text-white text-xs font-bold tracking-tighter flex items-center">
                         <span className="text-sm">g1</span> 
                         <span className="font-normal opacity-90 text-[10px] ml-2 uppercase tracking-wide">MEIO AMBIENTE</span>
                       </p>
                    </div>
                    <div className="p-3 md:p-4 bg-white">
                       <h3 className="font-heading font-bold text-gray-900 text-sm md:text-base leading-tight mb-2">
                          Por que o planeta está cada vez mais quente? g1 explica o que leva o mundo a recordes de calor
                       </h3>
                       <p className="text-[10px] md:text-xs text-gray-500 leading-snug">
                          Recordes de temperatura no mundo e no Brasil mostram que o aquecimento global já é realidade.
                       </p>
                    </div>
                 </div>

             </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-acai-900 mb-6 leading-tight">
              O calor está batendo recordes. <br/>
              <span className="text-acai-600">Por que não lucrar com isso?</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3 mb-2">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm md:text-base">
                    Você sabe que precisa de uma renda extra, mas tudo parece <strong>caro para começar</strong> ou <strong>complicado demais</strong>.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                 <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>

              <div className="bg-acai-50 p-6 rounded-xl border border-acai-100 shadow-md">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-acai-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-acai-900 text-lg mb-1">A Solução Refrescante:</h3>
                    <p className="text-acai-800 text-sm md:text-base leading-relaxed">
                      O <strong>Açaí na Garrafa</strong> é a tendência viral do momento. É prático, todo mundo ama no calor, e a margem de lucro é absurda. Você não precisa de loja física, nem de máquinas caras. Apenas da receita certa e vontade de vencer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};