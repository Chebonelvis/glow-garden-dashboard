
import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  // Mock orders data - TODO: Replace with API calls
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 79.98,
      items: [
        { name: 'Organic Rose Face Serum', quantity: 1, price: 49.99 },
        { name: 'Natural Lavender Body Oil', quantity: 1, price: 29.99 }
      ],
      tracking: 'TRK123456789',
      deliveryDate: '2024-01-22',
      address: '123 Main St, City, State 12345'
    },
    {
      id: 'ORD-002',
      date: '2024-01-22',
      status: 'shipped',
      total: 129.97,
      items: [
        { name: 'Vitamin C Brightening Cream', quantity: 2, price: 39.99 },
        { name: 'Herbal Hair Growth Shampoo', quantity: 2, price: 24.99 }
      ],
      tracking: 'TRK123456790',
      estimatedDelivery: '2024-01-26',
      address: '123 Main St, City, State 12345'
    },
    {
      id: 'ORD-003',
      date: '2024-01-24',
      status: 'processing',
      total: 49.99,
      items: [
        { name: 'Natural Mint Lip Balm Set', quantity: 1, price: 49.99 }
      ],
      estimatedShipping: '2024-01-26',
      address: '123 Main St, City, State 12345'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const activeOrders = orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
  const completedOrders = orders.filter(order => order.status === 'delivered' || order.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/customer" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-light mb-8 nature-text-gradient">My Orders</h1>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active orders</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any orders in progress right now
                  </p>
                  <Link to="/">
                    <Button className="nature-gradient text-white">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <CardDescription>
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Order Details */}
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <h4 className="font-medium mb-2">Delivery Information</h4>
                          <p className="text-sm text-gray-600">{order.address}</p>
                          {order.tracking && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Tracking: {order.tracking}
                            </p>
                          )}
                          {order.estimatedDelivery && (
                            <p className="text-sm text-green-600 mt-1">
                              Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          )}
                          {order.estimatedShipping && (
                            <p className="text-sm text-blue-600 mt-1">
                              Estimated shipping: {new Date(order.estimatedShipping).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</p>
                          <div className="mt-2 space-x-2">
                            {order.tracking && (
                              <Button variant="outline" size="sm">
                                Track Package
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed orders</h3>
                  <p className="text-gray-600">
                    Your order history will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {completedOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <CardDescription>
                            Delivered on {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</p>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm">
                            Write Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
