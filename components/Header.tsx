
import React from 'react';
import { GoldBarIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-4 mb-2">
        <GoldBarIcon className="w-10 h-10 text-yellow-400" />
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
          Жирный Брокер
        </h1>
        <GoldBarIcon className="w-10 h-10 text-yellow-400" />
      </div>
      <p className="text-lg md:text-xl text-yellow-300/80">Ростов-на-Дону | Ваши деньги в надежных руках</p>
    </header>
  );
};

export default Header;
