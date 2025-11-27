import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';
import CountdownTimer from './CountdownTimer';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 animate-fade-in space-y-6">
          <div className="inline-block bg-gradient-to-r from-black via-gray-900 to-black border-4 border-yellow-400 px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Icon name="Zap" size={32} className="text-yellow-400 animate-pulse" />
              <h3 className="text-4xl md:text-5xl font-black text-yellow-400 font-montserrat tracking-wider">
                ЧЕРНАЯ ПЯТНИЦА
              </h3>
              <Icon name="Zap" size={32} className="text-yellow-400 animate-pulse" />
            </div>
            <p className="text-white text-xl md:text-2xl font-bold mt-2 font-open-sans">
              СКИДКА 50% на все товары! 🔥
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <CountdownTimer />
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-montserrat animate-fade-in">
          3D Печать
          <br />
          <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
            Подвижных Игрушек
          </span>
        </h2>
        <p className="text-xl text-white/80 mb-8 font-open-sans max-w-2xl mx-auto animate-fade-in">
          Создаем уникальные подвижные модели с высочайшим качеством детализации. 
          От готовых игрушек до индивидуальных заказов.
        </p>
        <Button 
          onClick={() => onNavigate('catalog')}
          size="lg" 
          className="bg-white text-purple-600 hover:bg-yellow-100 font-montserrat font-semibold px-8 py-4 text-lg animate-scale-in transform hover:scale-105 transition-all duration-300"
        >
          Смотреть каталог
          <Icon name="ArrowRight" size={20} className="ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;