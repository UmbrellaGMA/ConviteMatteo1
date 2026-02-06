
import React, { useState } from 'react';

interface Companion {
  name: string;
  age: string;
}

interface RSVPModalProps {
  onClose: () => void;
  onConfirm: (name: string, title: string, message: string) => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ onClose, onConfirm }) => {
  const [mainName, setMainName] = useState('');
  const [mainAge, setMainAge] = useState('');
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCompanion = () => {
    setCompanions([...companions, { name: '', age: '' }]);
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const updateCompanion = (index: number, field: keyof Companion, value: string) => {
    const newCompanions = [...companions];
    newCompanions[index][field] = value;
    setCompanions(newCompanions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainName.trim()) return;

    setIsSubmitting(true);

    // Formatação da mensagem para o WhatsApp com emojis compatíveis
    const phoneNumber = "5513974277753";
    let message = `Confirmacao de Presenca - O Rei Leao\n\n`;
    message += `Convidado Principal: ${mainName} (${mainAge} anos)\n`;
    
    if (companions.length > 0) {
      message += `\nAcompanhantes:\n`;
      companions.forEach((c, i) => {
        if (c.name) {
          message += `- ${c.name} (${c.age} anos)\n`;
        }
      });
    }

    message += `\nEstamos ansiosos para o Ciclo Sem Fim!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Finalizar no app
    onConfirm(mainName, "Nobre Convidado", "Sua presença foi enviada para o Conselho Real via WhatsApp!");
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#2a1a0a] border-2 border-amber-600 rounded-2xl p-6 md:p-8 max-w-md w-full my-8 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-500 hover:text-amber-400"
        >
          ✕
        </button>

        <h2 className="text-2xl font-regal text-amber-500 text-center mb-6">Confirmação Real</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-amber-100 text-[10px] mb-1 uppercase tracking-widest font-bold">Seu Nome</label>
              <input 
                type="text" 
                required
                value={mainName}
                onChange={(e) => setMainName(e.target.value)}
                className="w-full bg-black/40 border border-amber-700 rounded-lg py-3 px-4 text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Nome Completo"
              />
            </div>
            <div className="w-24">
              <label className="block text-amber-100 text-[10px] mb-1 uppercase tracking-widest font-bold">Sua Idade</label>
              <input 
                type="text" 
                required
                value={mainAge}
                onChange={(e) => setMainAge(e.target.value)}
                className="w-full bg-black/40 border border-amber-700 rounded-lg py-3 px-4 text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Idade"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-amber-100 text-[10px] uppercase tracking-widest font-bold">Acompanhantes</label>
              <button 
                type="button"
                onClick={addCompanion}
                className="text-xs bg-amber-900/40 border border-amber-600/50 px-3 py-1 rounded-full text-amber-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                + Adicionar
              </button>
            </div>

            {companions.map((companion, index) => (
              <div key={index} className="flex gap-2 items-end animate-fade-in">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Nome"
                    value={companion.name}
                    onChange={(e) => updateCompanion(index, 'name', e.target.value)}
                    className="w-full bg-black/20 border border-amber-900 rounded-lg py-2 px-3 text-sm text-amber-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="w-20">
                  <input 
                    type="text" 
                    placeholder="Idade"
                    value={companion.age}
                    onChange={(e) => updateCompanion(index, 'age', e.target.value)}
                    className="w-full bg-black/20 border border-amber-900 rounded-lg py-2 px-3 text-sm text-amber-100 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => removeCompanion(index)}
                  className="p-2 text-red-500 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar no WhatsApp'}
          </button>
          
          <p className="text-[10px] text-amber-400/60 text-center italic">
            *Você será redirecionado para o WhatsApp para concluir o envio.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RSVPModal;
