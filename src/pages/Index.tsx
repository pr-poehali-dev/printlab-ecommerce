import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

const Index = () => {
  const products = [
    {
      id: 1,
      name: "Каракатица",
      price: "650₽",
      image: "https://cdn.poehali.dev/files/e31c9c10-11db-4595-94a9-6880295801d9.jpeg",
      description: "Подвижная 3D модель каракатицы с гибкими щупальцами"
    },
    {
      id: 2,
      name: "Хамелеон",
      price: "500₽", 
      image: "https://cdn.poehali.dev/files/b2ba80d9-a251-4423-9f6c-3c65725630ea.jpeg",
      description: "Гибкая 3D модель хамелеона с подвижными частями"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-600">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Boxes" size={32} className="text-white" />
              <h1 className="text-2xl font-bold text-white font-montserrat">PrintLab</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#catalog" className="text-white hover:text-yellow-200 transition-colors">Каталог</a>
              <a href="#custom" className="text-white hover:text-yellow-200 transition-colors">Сделать заказ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
            size="lg" 
            className="bg-white text-purple-600 hover:bg-yellow-100 font-montserrat font-semibold px-8 py-4 text-lg animate-scale-in"
          >
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-white text-center mb-12 font-montserrat">
            Каталог: Подвижные игрушки
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <Card key={product.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl font-montserrat">{product.name}</CardTitle>
                  <CardDescription className="text-white/70 font-open-sans">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-yellow-200 font-montserrat">
                    {product.price}
                  </span>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-montserrat">
                    Заказать
                    <Icon name="ShoppingCart" size={18} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <section id="custom" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold text-white mb-8 font-montserrat">
            Сделать заказ
          </h3>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <Icon name="Sparkles" size={48} className="text-yellow-200 mx-auto mb-4" />
              <CardTitle className="text-2xl font-montserrat">Кастомные заказы</CardTitle>
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
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-montserrat"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;