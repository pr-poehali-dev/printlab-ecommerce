import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

const ComplaintsSection = () => {
  return (
    <section id="complaints" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-4xl font-bold text-white text-center mb-8 font-montserrat">
          Обращение и жалобы
        </h3>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <Icon name="FileWarning" size={48} className="text-yellow-200 mx-auto mb-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-white/90 font-open-sans leading-relaxed">
              Возникли вопросы или претензии к качеству 3D-печати, срокам изготовления или работе сервиса? 
              Оставьте обращение — мы рассмотрим вашу жалобу и предложим решение. 
              Ваше мнение помогает нам становиться лучше.
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="font-montserrat font-semibold mb-3 text-yellow-200 text-lg">
                Контакт для обращений:
              </h4>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Mail" size={24} className="text-white" />
                <a 
                  href="mailto:printl4b@yandex.ru"
                  className="text-xl font-semibold text-white hover:text-yellow-200 transition-colors font-montserrat"
                >
                  printl4b@yandex.ru
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComplaintsSection;
