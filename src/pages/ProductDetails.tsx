
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock product data - TODO: Replace with API call using the id parameter
  const product = {
    id: id,
    name: 'Organic Rose Face Serum',
    price: 49.99,
    originalPrice: 59.99,
    image: '/placeholder.svg',
    category: 'Skincare',
    rating: 4.8,
    reviews: 124,
    organic: true,
    inStock: true,
    stock: 25,
    description: 'Our premium organic rose face serum is crafted with the finest Bulgarian rose oil and vitamin E. This luxurious serum deeply moisturizes and rejuvenates your skin, leaving it with a natural, healthy glow.',
    ingredients: ['Organic Rose Oil', 'Vitamin E', 'Hyaluronic Acid', 'Jojoba Oil', 'Aloe Vera Extract'],
    benefits: ['Deep Hydration', 'Anti-Aging', 'Natural Glow', 'Suitable for All Skin Types'],
    howToUse: 'Apply 2-3 drops to clean face and neck. Gently massage in circular motions. Use morning and evening for best results.',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    // TODO: Add API call to add item to cart
    console.log('Adding to cart:', { productId: id, quantity });
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Added to Cart!",
        description: `${quantity} x ${product.name} added to your cart`,
      });
    }, 500);
  };

  const updateQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-white border">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-light mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-green-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.organic && (
                  <Badge className="bg-green-600 text-white">
                    Organic
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>

              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className="w-full nature-gradient text-white py-3"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {isLoading ? 'Adding...' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
              </Button>
            </div>

            {/* Product Details */}
            <div className="space-y-6 pt-6 border-t">
              <div>
                <h3 className="font-medium mb-3">Key Benefits</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">Ingredients</h3>
                <p className="text-sm text-gray-600">
                  {product.ingredients.join(', ')}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">How to Use</h3>
                <p className="text-sm text-gray-600">
                  {product.howToUse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
