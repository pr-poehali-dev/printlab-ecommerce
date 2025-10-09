import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  status: string;
}

const API_URL = 'https://functions.poehali.dev/a401d87c-c0ff-44e2-aa6d-c2ce016e8d7a';

const Admin = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}?admin=true`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить отзывы",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateReviewStatus = async (reviewId: number, newStatus: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, status: newStatus })
      });

      if (response.ok) {
        toast({
          title: "Успешно",
          description: `Отзыв ${newStatus === 'approved' ? 'одобрен' : 'отклонён'}`,
        });
        fetchReviews();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус отзыва",
        variant: "destructive"
      });
    }
  };

  const deleteReview = async (reviewId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;

    try {
      const response = await fetch(`${API_URL}?id=${reviewId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: "Удалено",
          description: "Отзыв успешно удалён",
        });
        fetchReviews();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить отзыв",
        variant: "destructive"
      });
    }
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: any } = {
      pending: { variant: 'secondary', label: 'На модерации', icon: 'Clock' },
      approved: { variant: 'default', label: 'Одобрен', icon: 'CheckCircle2' },
      rejected: { variant: 'destructive', label: 'Отклонён', icon: 'XCircle' }
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon name={config.icon} size={14} />
        {config.label}
      </Badge>
    );
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Icon name="Shield" size={32} className="text-purple-400" />
            <h1 className="text-3xl font-bold">Панель модерации отзывов</h1>
          </div>
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/70">Всего отзывов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/70">На модерации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/70">Одобрено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/70">Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-purple-600' : 'bg-white/10 border-white/20'}
          >
            Все ({stats.total})
          </Button>
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'outline'}
            className={filter === 'pending' ? 'bg-yellow-600' : 'bg-white/10 border-white/20'}
          >
            На модерации ({stats.pending})
          </Button>
          <Button
            onClick={() => setFilter('approved')}
            variant={filter === 'approved' ? 'default' : 'outline'}
            className={filter === 'approved' ? 'bg-green-600' : 'bg-white/10 border-white/20'}
          >
            Одобрено ({stats.approved})
          </Button>
          <Button
            onClick={() => setFilter('rejected')}
            variant={filter === 'rejected' ? 'default' : 'outline'}
            className={filter === 'rejected' ? 'bg-red-600' : 'bg-white/10 border-white/20'}
          >
            Отклонено ({stats.rejected})
          </Button>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-purple-400" />
            <p className="text-white/70">Загрузка отзывов...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="py-12 text-center">
                  <Icon name="Inbox" size={48} className="mx-auto mb-4 text-white/50" />
                  <p className="text-white/70">Нет отзывов с выбранным статусом</p>
                </CardContent>
              </Card>
            ) : (
              filteredReviews.map((review) => (
                <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl text-white">{review.name}</CardTitle>
                          {getStatusBadge(review.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {new Date(review.created_at).toLocaleString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} 
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 mb-4">{review.comment}</p>
                    <div className="flex gap-2 flex-wrap">
                      {review.status !== 'approved' && (
                        <Button
                          onClick={() => updateReviewStatus(review.id, 'approved')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Icon name="Check" size={16} className="mr-1" />
                          Одобрить
                        </Button>
                      )}
                      {review.status !== 'rejected' && (
                        <Button
                          onClick={() => updateReviewStatus(review.id, 'rejected')}
                          size="sm"
                          variant="destructive"
                        >
                          <Icon name="X" size={16} className="mr-1" />
                          Отклонить
                        </Button>
                      )}
                      {review.status !== 'pending' && (
                        <Button
                          onClick={() => updateReviewStatus(review.id, 'pending')}
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-white/20"
                        >
                          <Icon name="RotateCcw" size={16} className="mr-1" />
                          Вернуть на модерацию
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteReview(review.id)}
                        size="sm"
                        variant="outline"
                        className="bg-red-900/20 border-red-500/50 hover:bg-red-900/40 ml-auto"
                      >
                        <Icon name="Trash2" size={16} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
