import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  description: string;
  isHit?: boolean;
}

interface CategorySectionProps {
  title: string;
  products: Product[];
  showProducts: boolean;
  onToggleProducts: () => void;
  onOrder: (productName: string) => void;
  isNew?: boolean;
}

const CategorySection = ({ 
  title, 
  products, 
  showProducts, 
  onToggleProducts, 
  onOrder,
  isNew = false
}: CategorySectionProps) => {
  return (
    <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3">
            <Button
              onClick={onToggleProducts}
              size="lg"
              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 font-montserrat font-semibold px-8 py-4 text-2xl"
            >
              {title}
              <Icon name={showProducts ? "ChevronUp" : "ChevronDown"} size={24} className="ml-2" />
            </Button>
            {isNew && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-montserrat font-bold px-4 py-2 rounded-full text-sm shadow-lg animate-pulse">
                НОВЫЙ
              </span>
            )}
          </div>
        </div>
        
        {showProducts && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onOrder={onOrder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;