
import React, { useState, useEffect, useRef } from 'react';
import BackgroundVideo from './ConviteMatteo/components/BackgroundVideo';
import Countdown from './ConviteMatteo/components/Countdown';
import RSVPModal from './ConviteMatteo/components/RSVPModal';
import GiftListModal from './ConviteMatteo/components/GiftListModal';
import { EVENT_DATA, LION_KING_QUOTES } from './constants';
import { InvitationState, GuestInfo } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<InvitationState>(InvitationState.IDLE);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

  const handleOpen = () => {
    setState(InvitationState.OPENING);
    setTimeout(() => setState(InvitationState.OPENED), 1000);
  };

  const handleRSVPConfirm = (name: string, title: string, message: string) => {
    setGuestInfo({ name, confirmed: true, title, message });
    setShowRSVP(false);
    setState(InvitationState.RSVP_SUBMITTED);
  };

  // URL de compartilhamento direta para o novo endereço
  const shareMapUrl = "https://www.google.com/maps/search/?api=1&query=Av.+Bartholomeu+de+Gusmão,+70+-+Embaré,+Santos+-+SP,+11045-401";

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <BackgroundVideo />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">

        {state === InvitationState.IDLE && (
          <div className="flex flex-col items-center animate-fade-in">

            <div className="w-full max-w-md mx-auto mb-6">
              <img
                src="/logo.png"
                alt="Disney O Matteo Gabriel 1 Ano"
                className="w-full h-auto drop-shadow-xl animate-fade-in"
              />
            </div>
            <p className="text-amber-100/80 uppercase tracking-[0.3em] text-sm mb-12">Convite Real</p>

            <button
              onClick={handleOpen}
              className="group relative px-12 py-4 bg-transparent border-2 border-amber-600 rounded-full overflow-hidden transition-all hover:bg-amber-600"
            >
              <span className="relative z-10 font-bold uppercase tracking-widest text-amber-500 group-hover:text-white">Abrir Convite</span>
              <div className="absolute inset-0 bg-amber-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        )}

        {(state === InvitationState.OPENED || state === InvitationState.RSVP_SUBMITTED) && (
          <div className="animate-fade-in flex flex-col items-center">
            {/* Header */}
            <header className="mb-8 scale-in">
              <h2 className="text-amber-500 font-regal text-3xl md:text-5xl mb-2 drop-shadow-lg">
                {EVENT_DATA.title}
              </h2>
              <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full"></div>
            </header>

            {/* Event Summary Card */}
            <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/30 w-full mb-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>

              <p className="text-xl md:text-2xl text-amber-200 mb-6 italic">"{LION_KING_QUOTES[Math.floor(Math.random() * LION_KING_QUOTES.length)]}"</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-y border-amber-500/20 py-8 my-6">
                <div>
                  <h4 className="text-amber-500 text-xs uppercase tracking-widest mb-2 font-bold">Quando</h4>
                  <p className="text-xl font-regal">20 de Fevereiro, 2026</p>
                  <p className="text-amber-300/80">Às {EVENT_DATA.time} horas</p>
                </div>
                <div>
                  <h4 className="text-amber-500 text-xs uppercase tracking-widest mb-2 font-bold">Onde</h4>
                  <p className="text-xl font-regal">{EVENT_DATA.location}</p>
                  <p className="text-amber-300/80">Av. Bartholomeu de Gusmão, 70 - Santos - SP</p>
                </div>
              </div>

              <p className="text-amber-100 leading-relaxed mb-8">
                {EVENT_DATA.description}
              </p>

              <Countdown targetDate={EVENT_DATA.date} />

              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <a
                  href={shareMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-6 py-3 bg-amber-900/40 border border-amber-600 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-800/60 transition-colors flex items-center justify-center gap-2"
                >
                  📍 Mapa
                </a>

                <button
                  onClick={() => setShowGifts(true)}
                  className="flex-1 min-w-[140px] px-6 py-3 bg-transparent border border-amber-400/50 rounded-full text-xs font-bold uppercase tracking-widest hover:border-amber-400 transition-colors flex items-center justify-center gap-2"
                >
                  🎁 Presentes
                </button>

                {state !== InvitationState.RSVP_SUBMITTED && (
                  <button
                    onClick={() => setShowRSVP(true)}
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    Confirmar Presença
                  </button>
                )}
              </div>
            </div>

            {/* Personalized Guest Area */}
            {state === InvitationState.RSVP_SUBMITTED && guestInfo && (
              <div className="bg-gradient-to-br from-green-900/60 to-amber-900/60 backdrop-blur-xl p-8 rounded-3xl border-2 border-amber-400 w-full mb-12 animate-bounce-slow shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[10px] font-bold rounded-full mb-4 uppercase tracking-tighter">Decreto Real</span>
                <h3 className="text-2xl font-regal text-amber-300 mb-2">Saudações, {guestInfo.name}!</h3>
                <p className="text-white text-lg italic leading-relaxed">
                  Sua confirmação foi enviada para o Conselho Real!
                </p>
                <div className="mt-4 flex justify-center text-amber-400">
                  <span className="text-sm uppercase tracking-widest">Presença Enviada via WhatsApp</span>
                </div>
              </div>
            )}

            {/* Map Section */}
            <div id="mapa" className="w-full h-80 rounded-3xl overflow-hidden border border-amber-500/30 mb-12 shadow-inner bg-black/50">
              <iframe
                src={EVENT_DATA.mapUrl}
                className="w-full h-full filter grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>

            <footer className="opacity-70 text-[10px] md:text-xs tracking-widest uppercase py-8 flex flex-col md:flex-row items-center gap-1">
              <span>Desenvolvido por Gustavo Melo -</span>
              <a
                href="https://www.instagram.com/orion_locacoes_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 font-bold hover:text-amber-400 transition-colors border-b border-amber-500/30"
              >
                Orion Locações
              </a>
            </footer>
          </div>
        )}
      </div>

      {showRSVP && (
        <RSVPModal
          onClose={() => setShowRSVP(false)}
          onConfirm={handleRSVPConfirm}
        />
      )}

      {showGifts && (
        <GiftListModal onClose={() => setShowGifts(false)} />
      )}

      {/* Global CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
