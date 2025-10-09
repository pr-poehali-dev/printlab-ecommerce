import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AUTH_API_URL = 'https://functions.poehali.dev/9736f46b-2114-4951-a2cd-ad3917d4d9a2';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_auth_time', Date.now().toString());
        navigate('/admin');
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный пароль",
          variant: "destructive"
        });
        setPassword('');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить вход",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Icon name="Shield" size={64} className="text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Вход в админ-панель</h1>
          <p className="text-white/60">Введите пароль для доступа к модерации</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Авторизация</CardTitle>
            <CardDescription className="text-white/70">
              Защита панели управления отзывами
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Пароль администратора
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="Введите пароль"
                  required
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Войти
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Вернуться на главную
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">
            <Icon name="Lock" size={14} className="inline mr-1" />
            Защищённый доступ
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
