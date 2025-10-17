import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  status?: string;
}

const API_URL = 'https://functions.poehali.dev/a401d87c-c0ff-44e2-aa6d-c2ce016e8d7a';

const Index = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toGenitive = (name: string): string => {
    const genitiveMap: { [key: string]: string } = {
      "Китовая акула": "китовую акулу",
      "Лягушка": "лягушку",
      "Ленивый кот": "ленивого кота",
      "Акула молот": "акулу молот",
      "Игрушка-брелок паук": "игрушку-брелок паук",
      "Хамелеон": "хамелеона",
      "Змея": "змею",
      "Каракатица": "каракатицу",
      "Карп": "карпа",
      "Морская звезда": "морскую звезду",
      "Кенгуру": "кенгуру",
      "Дельфин": "дельфина"
    };
    return genitiveMap[name] || name.toLowerCase();
  };

  const orderProduct = (productName: string) => {
    const genitiveName = toGenitive(productName);
    const whatsappUrl = `https://wa.me/79659911806?text=Здравствуйте,%20хочу%20заказать%20${encodeURIComponent(genitiveName)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactUs = () => {
    const whatsappUrl = 'https://wa.me/79659911806?text=Здравствуйте,%20хочу%20сделать%20заказ';
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}?status=approved`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.comment.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment
          })
        });
        
        if (response.ok) {
          toast({
            title: "Отзыв отправлен!",
            description: "Ваш отзыв будет опубликован после модерации.",
          });
          setNewReview({ name: '', rating: 5, comment: '' });
        }
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить отзыв. Попробуйте позже.",
          variant: "destructive"
        });
      }
    }
  };

  const products = [
    {
      id: 1,
      name: "Китовая акула",
      price: "450₽",
      image: "https://cdn.poehali.dev/files/ebea276f-02e6-481b-909c-700c3b6d6b56.jpeg",
      description: "Подвижная 3D модель китовой акулы с сегментированным телом"
    },
    {
      id: 2,
      name: "Лягушка",
      price: "150₽", 
      image: "https://cdn.poehali.dev/files/c79fb40a-9f06-42f2-9e21-05546d16b4e2.jpeg",
      description: "Компактная подвижная лягушка с гибкими суставами"
    },
    {
      id: 3,
      name: "Ленивый кот",
      price: "250₽",
      image: "https://cdn.poehali.dev/files/f5f03b27-b3c6-430b-80ca-762f2d1aa616.jpeg",
      description: "Забавная модель ленивого кота с подвижными частями"
    },
    {
      id: 4,
      name: "Акула молот",
      price: "400₽",
      image: "https://cdn.poehali.dev/files/10401ffa-4b31-4b2b-8ccc-83d178f1080a.jpeg",
      description: "Детализированная акула-молот с подвижными плавниками"
    },
    {
      id: 5,
      name: "Игрушка-брелок паук",
      price: "300₽",
      image: "https://cdn.poehali.dev/files/a0030e5a-7043-4959-9007-e4c985781c1b.jpeg",
      description: "Компактный брелок-паук с подвижными лапками"
    },
    {
      id: 6,
      name: "Хамелеон",
      price: "500₽",
      image: "https://cdn.poehali.dev/files/04741c6d-d0d1-4cbe-ae2b-bbb49ffc2c67.jpeg",
      description: "Яркий хамелеон с градиентной расцветкой и подвижными частями"
    },
    {
      id: 7,
      name: "Змея",
      price: "200₽",
      image: "https://cdn.poehali.dev/files/cf333ed5-2708-4e4a-b3fc-7377e89384f3.jpeg",
      description: "Гибкая змея с сегментированным телом и реалистичной головой"
    },
    {
      id: 8,
      name: "Каракатица",
      price: "550₽",
      image: "https://cdn.poehali.dev/files/fbfd8853-c5ef-4c61-bea3-4d3eacc642eb.jpeg",
      description: "Детализированная каракатица с подвижными щупальцами"
    },
    {
      id: 9,
      name: "Карп",
      price: "350₽",
      image: "https://cdn.poehali.dev/files/3678eafa-3f19-4745-9c30-097c6c4880c6.jpeg",
      description: "Подвижная модель карпа с гибким хвостом и плавниками"
    },
    {
      id: 10,
      name: "Морская звезда",
      price: "250₽",
      image: "https://cdn.poehali.dev/files/b58a417d-47e2-48ec-a45f-22282741b866.jpeg",
      description: "Яркая морская звезда с подвижными лучами"
    },
    {
      id: 11,
      name: "Кенгуру",
      price: "400₽",
      image: "https://cdn.poehali.dev/files/c4d6749e-601d-4bff-bae0-566170da7b93.jpeg",
      description: "Забавный кенгуру с подвижными лапками и хвостом"
    },
    {
      id: 12,
      name: "Дельфин",
      price: "300₽",
      image: "https://cdn.poehali.dev/files/60e39448-d85c-45c9-9549-6dd7b31666f0.jpeg",
      description: "Элегантный дельфин с изящными плавниками и гибким телом"
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
              <button 
                onClick={() => scrollToSection('catalog')} 
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Каталог
              </button>
              <button 
                onClick={() => scrollToSection('reviews')} 
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Отзывы
              </button>
              <button 
                onClick={() => scrollToSection('custom')} 
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Сделать заказ
              </button>
              <button 
                onClick={() => scrollToSection('complaints')} 
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Обращения
              </button>
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
            onClick={() => scrollToSection('catalog')}
            size="lg" 
            className="bg-white text-purple-600 hover:bg-yellow-100 font-montserrat font-semibold px-8 py-4 text-lg animate-scale-in transform hover:scale-105 transition-all duration-300"
          >
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Button
              onClick={() => setShowProducts(!showProducts)}
              size="lg"
              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 font-montserrat font-semibold px-8 py-4 text-2xl"
            >
              Подвижные игрушки
              <Icon name={showProducts ? "ChevronUp" : "ChevronDown"} size={24} className="ml-2" />
            </Button>
          </div>
          
          {showProducts && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:scale-105 transition-all duration-300"
              >
                <CardHeader>
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
                  <Button 
                    onClick={() => orderProduct(product.name)}
                    className="bg-green-600 hover:bg-green-700 text-white font-montserrat transform hover:scale-105 transition-all duration-200"
                  >
                    Заказать
                    <Icon name="MessageCircle" size={18} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-white text-center mb-12 font-montserrat">
            Отзывы наших клиентов
          </h3>

          {isLoading ? (
            <div className="text-center text-white mb-12">
              <Icon name="Loader2" size={48} className="animate-spin mx-auto" />
              <p className="mt-4">Загрузка отзывов...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {reviews.length === 0 ? (
                <div className="col-span-2 text-center text-white/70 py-8">
                  <p>Пока нет опубликованных отзывов. Будьте первым!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl font-montserrat">{review.name}</CardTitle>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={18} 
                              className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/60 text-sm font-open-sans">
                        {new Date(review.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90 font-open-sans">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Review Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-montserrat text-center">Оставить отзыв</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-2 font-open-sans">Ваше имя</label>
                  <Input 
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-2 font-open-sans">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon 
                          name="Star" 
                          size={32} 
                          className={star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 mb-2 font-open-sans">Ваш отзыв</label>
                  <Textarea 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 min-h-[120px]"
                    placeholder="Поделитесь вашими впечатлениями..."
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-montserrat transform hover:scale-105 transition-all duration-200"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить отзыв
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Orders Section */}
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
                onClick={contactUs}
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

      {/* Complaints Section */}
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