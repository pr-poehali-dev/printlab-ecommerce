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
}

interface ProductCardProps {
  product: Product;
  onOrder: (productName: string) => void;
}

const ProductCard = ({ product, onOrder }: ProductCardProps) => {
  return (
    <Card 
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