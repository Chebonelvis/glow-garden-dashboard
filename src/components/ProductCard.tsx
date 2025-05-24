
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  organic: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // TODO: Add API call to add item to cart
    console.log('Adding to cart:', product.id);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1/1}>
          <div className={`bg-gray-100 w-full h-full flex items-center justify-center ${!imageLoaded ? 'animate-pulse' : ''}`}>
            <img 
              src={product.image} 
              alt={product.name}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
        </AspectRatio>
        {product.organic && (
          <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
            Organic
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="space-y-2 flex-grow">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm text-yellow-500">★</span>
              <span className="text-sm text-muted-foreground">{product.rating}</span>
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full nature-gradient text-white mt-3"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
