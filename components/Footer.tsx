
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-8 md:mt-12">
      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} Жирный Брокер Inc. Все права защищены. Финансовые операции сопряжены с риском.
      </p>
    </footer>
  );
};

export default Footer;
