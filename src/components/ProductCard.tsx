import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  description: string;
  isHit?: boolean;
}

interface ProductCardProps {
  product: Product;
  onOrder: (productName: string) => void;
}

const ProductCard = ({ product, onOrder }: ProductCardProps) => {
  return (
    <Card 
      className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:scale-105 transition-all duration-300 flex flex-col relative"
    >
      <CardHeader className="p-4 relative">
        <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
          {product.isHit && (
            <div className="absolute top-2 right-2 z-20">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-montserrat font-bold px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">
                ХИТ
              </span>
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4 pb-2">
        <CardTitle className="text-2xl font-montserrat mb-2">{product.name}</CardTitle>
        <CardDescription className="text-white/70 font-open-sans text-base">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4 pb-4 pt-2">
        <div className="flex flex-col">
          {product.oldPrice && (
            <span className="text-lg text-white/50 line-through font-montserrat">
              {product.oldPrice}
            </span>
          )}
          <span className="text-3xl font-bold text-yellow-200 font-montserrat">
            {product.price}
          </span>
        </div>
        <Button 
          onClick={() => onOrder(product.name)}
          className="bg-green-600 hover:bg-green-700 text-white font-montserrat transform hover:scale-105 transition-all duration-200"
        >
          Заказать
          <Icon name="MessageCircle" size={18} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;