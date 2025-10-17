import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  status?: string;
}

interface NewReview {
  name: string;
  rating: number;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  isLoading: boolean;
  newReview: NewReview;
  onReviewChange: (field: keyof NewReview, value: string | number) => void;
  onSubmitReview: (e: React.FormEvent) => void;
}

const ReviewsSection = ({ reviews, isLoading, newReview, onReviewChange, onSubmitReview }: ReviewsSectionProps) => {
  return (
    <section id="reviews" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h3 className="text-4xl font-bold text-white text-center mb-12 font-montserrat">
          Отзывы наших клиентов
        </h3>

        {isLoading ? (
          <div className="text-center text-white/70 font-open-sans">
            Загрузка отзывов...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review) => (
              <Card 
                key={review.id} 
                className="bg-white/10 backdrop-blur-md border-white/20 text-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-montserrat">{review.name}</CardTitle>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-open-sans">{review.comment}</p>
                  <p className="text-xs text-white/50 mt-4 font-open-sans">
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat text-center">
              Оставьте свой отзыв
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitReview} className="space-y-4">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={newReview.name}
                  onChange={(e) => onReviewChange('name', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-open-sans">Оценка:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => onReviewChange('rating', rating)}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon 
                        name="Star" 
                        size={32} 
                        className={rating <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => onReviewChange('comment', e.target.value)}
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
  );
};

export default ReviewsSection;
