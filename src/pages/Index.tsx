import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ReviewsSection from '@/components/ReviewsSection';
import CustomOrderSection from '@/components/CustomOrderSection';
import ComplaintsSection from '@/components/ComplaintsSection';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';

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
  const [showNewYearProducts, setShowNewYearProducts] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

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
      "Рыбка": "рыбку",
      "Морская звезда": "морскую звезду",
      "Кенгуру": "кенгуру",
      "Дельфин": "дельфина",
      "Украшение для ёлки снеговик": "украшение для ёлки снеговик",
      "Новогодний олень": "новогоднего оленя",
      "Снеговик с подвижными ножками": "снеговика с подвижными ножками",
      "Украшение для ёлки снежинка": "украшение для ёлки снежинка"
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

  const handleReviewChange = (field: keyof typeof newReview, value: string | number) => {
    setNewReview({ ...newReview, [field]: value });
  };

  const products = [
    {
      id: 3,
      name: "Ленивый кот",
      price: "225₽",
      oldPrice: "450₽",
      image: "https://cdn.poehali.dev/files/f5f03b27-b3c6-430b-80ca-762f2d1aa616.jpeg",
      description: "Забавная модель ленивого кота с подвижными частями",
      isHit: true
    },
    {
      id: 7,
      name: "Змея",
      price: "150₽",
      oldPrice: "300₽",
      image: "https://cdn.poehali.dev/files/cf333ed5-2708-4e4a-b3fc-7377e89384f3.jpeg",
      description: "Гибкая змея с сегментированным телом и реалистичной головой",
      isHit: true
    },
    {
      id: 1,
      name: "Китовая акула",
      price: "400₽",
      oldPrice: "800₽",
      image: "https://cdn.poehali.dev/files/ebea276f-02e6-481b-909c-700c3b6d6b56.jpeg",
      description: "Подвижная 3D модель китовой акулы с сегментированным телом"
    },
    {
      id: 2,
      name: "Лягушка",
      price: "150₽",
      oldPrice: "300₽",
      image: "https://cdn.poehali.dev/files/c79fb40a-9f06-42f2-9e21-05546d16b4e2.jpeg",
      description: "Компактная подвижная лягушка с гибкими суставами"
    },
    {
      id: 4,
      name: "Акула молот",
      price: "400₽",
      oldPrice: "800₽",
      image: "https://cdn.poehali.dev/files/10401ffa-4b31-4b2b-8ccc-83d178f1080a.jpeg",
      description: "Детализированная акула-молот с подвижными плавниками"
    },
    {
      id: 5,
      name: "Игрушка-брелок паук",
      price: "250₽",
      oldPrice: "500₽",
      image: "https://cdn.poehali.dev/files/a0030e5a-7043-4959-9007-e4c985781c1b.jpeg",
      description: "Компактный брелок-паук с подвижными лапками"
    },
    {
      id: 6,
      name: "Хамелеон",
      price: "450₽",
      oldPrice: "900₽",
      image: "https://cdn.poehali.dev/files/04741c6d-d0d1-4cbe-ae2b-bbb49ffc2c67.jpeg",
      description: "Яркий хамелеон с градиентной расцветкой и подвижными частями"
    },
    {
      id: 8,
      name: "Каракатица",
      price: "475₽",
      oldPrice: "950₽",
      image: "https://cdn.poehali.dev/files/fbfd8853-c5ef-4c61-bea3-4d3eacc642eb.jpeg",
      description: "Детализированная каракатица с подвижными щупальцами"
    },
    {
      id: 9,
      name: "Рыбка",
      price: "350₽",
      oldPrice: "700₽",
      image: "https://cdn.poehali.dev/files/3678eafa-3f19-4745-9c30-097c6c4880c6.jpeg",
      description: "Подвижная модель карпа с гибким хвостом и плавниками"
    },
    {
      id: 10,
      name: "Морская звезда",
      price: "250₽",
      oldPrice: "500₽",
      image: "https://cdn.poehali.dev/files/b58a417d-47e2-48ec-a45f-22282741b866.jpeg",
      description: "Яркая морская звезда с подвижными лучами"
    },
    {
      id: 11,
      name: "Кенгуру",
      price: "400₽",
      oldPrice: "800₽",
      image: "https://cdn.poehali.dev/files/c4d6749e-601d-4bff-bae0-566170da7b93.jpeg",
      description: "Забавный кенгуру с подвижными лапками и хвостом"
    },
    {
      id: 12,
      name: "Дельфин",
      price: "350₽",
      oldPrice: "700₽",
      image: "https://cdn.poehali.dev/files/60e39448-d85c-45c9-9549-6dd7b31666f0.jpeg",
      description: "Элегантный дельфин с изящными плавниками и гибким телом"
    }
  ];

  const newYearProducts = [
    {
      id: 13,
      name: "Украшение для ёлки снеговик",
      price: "250₽",
      oldPrice: "500₽",
      image: "https://cdn.poehali.dev/files/93ebb5fc-57f9-48f4-9473-3eb4d5bee0a5.jpeg",
      description: "Милое украшение-снеговик с петелькой для подвешивания на ёлку"
    },
    {
      id: 14,
      name: "Новогодний олень",
      price: "300₽",
      oldPrice: "600₽",
      image: "https://cdn.poehali.dev/files/20278e75-091f-4f4e-9633-b7d3a6ded5cf.jpeg",
      description: "Элегантная фигурка оленя с рогами для новогоднего декора"
    },
    {
      id: 15,
      name: "Снеговик с подвижными ножками",
      price: "250₽",
      oldPrice: "500₽",
      image: "https://cdn.poehali.dev/files/ab243ff2-b043-404a-9f98-731575d8c250.jpeg",
      description: "Забавный снеговик с шарнирными подвижными ножками"
    },
    {
      id: 16,
      name: "Украшение для ёлки снежинка",
      price: "150₽",
      oldPrice: "300₽",
      image: "https://cdn.poehali.dev/files/5f74ce6e-51c4-42cd-9bb2-41fed91fae0b.jpeg",
      description: "Ажурная снежинка для подвешивания на новогоднюю ёлку"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-600">
      <Snowfall />
      <Header onNavigate={scrollToSection} />
      <HeroSection onNavigate={(section) => {
        setShowCatalog(true);
        scrollToSection(section);
      }} />
      {showCatalog && (
        <>
          <CategorySection 
            title="Новогодний декор"
            products={newYearProducts}
            showProducts={showNewYearProducts}
            onToggleProducts={() => setShowNewYearProducts(!showNewYearProducts)}
            onOrder={orderProduct}
            isNew={true}
          />
          <CategorySection 
            title="Подвижные игрушки"
            products={products}
            showProducts={showProducts}
            onToggleProducts={() => setShowProducts(!showProducts)}
            onOrder={orderProduct}
          />
        </>
      )}
      <ReviewsSection 
        reviews={reviews}
        isLoading={isLoading}
        newReview={newReview}
        onReviewChange={handleReviewChange}
        onSubmitReview={handleSubmitReview}
      />
      <CustomOrderSection onContactUs={contactUs} />
      <ComplaintsSection />
      <Footer />
    </div>
  );
};

export default Index;