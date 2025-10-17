import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Boxes" size={24} className="text-white" />
          <span className="text-xl font-bold text-white font-montserrat">PrintLab</span>
        </div>
        <p className="text-white/60 font-open-sans">
          © 2024 PrintLab. Создаем будущее с помощью 3D печати.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
