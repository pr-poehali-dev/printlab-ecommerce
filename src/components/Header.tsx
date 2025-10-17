import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  return (
    <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Boxes" size={32} className="text-white" />
            <h1 className="text-2xl font-bold text-white font-montserrat">PrintLab</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => onNavigate('catalog')} 
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Каталог
            </button>
            <button 
              onClick={() => onNavigate('reviews')} 
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Отзывы
            </button>
            <button 
              onClick={() => onNavigate('custom')} 
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Сделать заказ
            </button>
            <button 
              onClick={() => onNavigate('complaints')} 
              className="text-white hover:text-yellow-200 transition-colors"
            >
              Обращения
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
