import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
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
