import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  return (
    <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-blue-400/20">
        <div className="absolute top-2 left-1/4 animate-pulse">❄️</div>
        <div className="absolute top-4 left-1/2 animate-pulse" style={{animationDelay: '0.5s'}}>❄️</div>
        <div className="absolute top-1 right-1/4 animate-pulse" style={{animationDelay: '1s'}}>❄️</div>
        <div className="absolute top-3 right-1/3 animate-pulse" style={{animationDelay: '1.5s'}}>❄️</div>
      </div>
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