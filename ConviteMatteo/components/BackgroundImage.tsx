
import React from 'react';

const BackgroundImage: React.FC = () => {
  // Imagem representativa de alta qualidade do Timão e Pumba na savana
  const imageUrl = "/background.png";

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0 opacity-70"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Camada de Gradiente para legibilidade */}
      <div className="absolute inset-0 gradient-overlay pointer-events-none z-10"></div>

      {/* Textura de ruído sutil para acabamento cinematográfico */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default BackgroundImage;
