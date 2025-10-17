import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface CatalogSectionProps {
  products: Product[];
  showProducts: boolean;
  onToggleProducts: () => void;
  onOrder: (productName: string) => void;
}

const CatalogSection = ({ products, showProducts, onToggleProducts, onOrder }: CatalogSectionProps) => {
  return (
    <section id="catalog" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Button
            onClick={onToggleProducts}
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
              <ProductCard key={product.id} product={product} onOrder={onOrder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
