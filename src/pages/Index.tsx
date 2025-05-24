
import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock product data - TODO: Replace with API calls
  const products = [
    {
      id: '1',
      name: 'Organic Rose Face Serum',
      price: 49.99,
      originalPrice: 59.99,
      image: '/placeholder.svg',
      category: 'Skincare',
      rating: 4.8,
      organic: true,
      inStock: true
    },
    {
      id: '2',
      name: 'Natural Lavender Body Oil',
      price: 29.99,
      image: '/placeholder.svg',
      category: 'Body Care',
      rating: 4.6,
      organic: true,
      inStock: true
    },
    {
      id: '3',
      name: 'Vitamin C Brightening Cream',
      price: 39.99,
      image: '/placeholder.svg',
      category: 'Skincare',
      rating: 4.7,
      organic: false,
      inStock: false
    },
    {
      id: '4',
      name: 'Herbal Hair Growth Shampoo',
      price: 24.99,
      image: '/placeholder.svg',
      category: 'Hair Care',
      rating: 4.5,
      organic: true,
      inStock: true
    },
    {
      id: '5',
      name: 'Natural Mint Lip Balm Set',
      price: 19.99,
      image: '/placeholder.svg',
      category: 'Lips',
      rating: 4.9,
      organic: true,
      inStock: true
    },
    {
      id: '6',
      name: 'Anti-Aging Eye Cream',
      price: 54.99,
      image: '/placeholder.svg',
      category: 'Skincare',
      rating: 4.4,
      organic: false,
      inStock: true
    }
  ];

  const categories = ['all', 'Skincare', 'Body Care', 'Hair Care', 'Lips'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 nature-text-gradient">
            Pure Beauty, Naturally
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of organic and natural beauty products, 
            crafted with love for your skin and the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              placeholder="Search products..." 
              className="flex-1"
            />
            <Button className="nature-gradient text-white px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "nature-gradient text-white" : ""}
              >
                {category === 'all' ? 'All Products' : category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-center mb-12 nature-text-gradient">
            Why Choose Natural Beauty?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 nature-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-medium mb-3">100% Natural</h3>
              <p className="text-gray-600">
                All our products are made with carefully selected natural ingredients
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 nature-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and eco-friendly delivery to your doorstep
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 nature-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">
                Sustainable packaging and cruelty-free products
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
