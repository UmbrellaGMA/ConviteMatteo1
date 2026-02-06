
import React from 'react';

const BackgroundVideo: React.FC = () => {
  // Configuração para vídeo local no public
  const videoSrc = "/background.mp4";
  const fallbackImage = "/background.png";

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* Fallback Image / Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0 opacity-50"
        style={{ backgroundImage: `url(${fallbackImage})` }}
      ></div>

      {/* Local Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Gradient for legibility */}
      <div className="absolute inset-0 gradient-overlay pointer-events-none z-10"></div>

      {/* Grainy Texture Overlay for Cinematic Look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default BackgroundVideo;
