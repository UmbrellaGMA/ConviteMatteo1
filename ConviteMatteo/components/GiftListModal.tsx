
import React from 'react';

interface GiftListModalProps {
  onClose: () => void;
}

const GiftListModal: React.FC<GiftListModalProps> = ({ onClose }) => {
  const giftItems = [
    { label: 'Tamanho de Roupa', value: '1 Ano' },
    { label: 'Sugestão', value: 'Brinquedos' },
    { label: 'Calçados', value: '12 CM (Tamanho do pé)' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#2a1a0a] border-2 border-amber-500 rounded-3xl p-8 max-w-sm w-full relative shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-500 hover:text-amber-400 text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
            <span className="text-3xl">🎁</span>
          </div>
          <h2 className="text-2xl font-regal text-amber-500">Sugestões de Presentes</h2>
          <p className="text-amber-200/60 text-xs uppercase tracking-widest mt-2">Para o nosso pequeno Matteo</p>
        </div>

        <div className="space-y-4">
          {giftItems.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b border-amber-500/10 pb-3">
              <span className="text-[10px] uppercase tracking-tighter text-amber-500/70 font-bold">{item.label}</span>
              <span className="text-amber-100 font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3 rounded-full bg-amber-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-amber-500 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default GiftListModal;
