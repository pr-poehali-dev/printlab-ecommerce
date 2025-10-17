import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface CustomOrderSectionProps {
  onContactUs: () => void;
}

const CustomOrderSection = ({ onContactUs }: CustomOrderSectionProps) => {
  return (
    <section id="custom" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="text-4xl font-bold text-white mb-8 font-montserrat">
          Сделать заказ
        </h3>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <Icon name="Sparkles" size={48} className="text-yellow-200 mx-auto mb-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-white/90 font-open-sans">
              Здесь вы можете заказать свою собственную модель 
              от обычной фигурки до обуви.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="text-center">
                <Icon name="Palette" size={32} className="text-purple-300 mx-auto mb-2" />
                <h4 className="font-montserrat font-semibold mb-1">Фигурки</h4>
                <p className="text-sm text-white/70 font-open-sans">Персонажи и статуэтки</p>
              </div>
              <div className="text-center">
                <Icon name="Gamepad2" size={32} className="text-turquoise-400 mx-auto mb-2" />
                <h4 className="font-montserrat font-semibold mb-1">Игрушки</h4>
                <p className="text-sm text-white/70 font-open-sans">Подвижные модели</p>
              </div>
              <div className="text-center">
                <Icon name="Footprints" size={32} className="text-orange-300 mx-auto mb-2" />
                <h4 className="font-montserrat font-semibold mb-1">Обувь</h4>
                <p className="text-sm text-white/70 font-open-sans">Индивидуальные модели</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="font-montserrat font-semibold mb-2 text-yellow-200">
                По оформлению заказа пишите:
              </h4>
              <a 
                href="tel:+79659911806"
                className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors font-montserrat"
              >
                +7 (965) 991-18-06
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={onContactUs}
              size="lg" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-montserrat transform hover:scale-105 transition-all duration-300"
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Связаться с нами
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default CustomOrderSection;
