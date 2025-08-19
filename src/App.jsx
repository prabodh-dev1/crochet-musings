import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Star, Gift, Phone, Instagram, Clock, Sparkles, Flame } from 'lucide-react'
import { AuthButton } from '@/components/AuthButton.jsx'
import { AuthCallback } from '@/components/AuthCallback.jsx'
import promoImage from './assets/promo-image.png'
import './App.css'

function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 'budget',
      name: 'Budget Festive Hamper',
      price: '₹400',
      items: [
        '2 Earthen Diyas',
        '1 Crochet Diya Magnet',
        '2 Resin Crochet Coasters',
        '40g Assorted Dry Fruits'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Festive Hamper',
      price: '₹650',
      items: [
        '2 Tealight Candles',
        '2 Crochet Tealight Holders',
        '2 Crochet Diya Magnets',
        '2 Resin Crochet Coasters',
        '40g Assorted Dry Fruits'
      ],
      popular: true
    },
    {
      id: 'exclusive',
      name: 'Exclusive Festive Hamper',
      price: '₹1000',
      items: [
        'Resin Crochet Tray + Matching 4 Resin Crochet Coasters',
        '5 Crochet Flowers',
        '2 Diya Magnets',
        'Assorted Dry Fruits (40gm) in Crochet Potli',
        '4 Tea Candle Lights with Crochet Holder'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8 text-amber-300" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Crochet Musings by Hema</h1>
                <p className="text-amber-200 text-sm">Handmade • Festive • Customizable</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex">
                <Badge variant="secondary" className="bg-amber-200 text-amber-900">
                  <Clock className="h-4 w-4 mr-1" />
                  Limited Offer
                </Badge>
              </div>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Gift className="h-4 w-4 mr-1" />
                  Festive Gift Hampers 2025
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Handcrafted with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Love</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover our exclusive collection of handmade crochet items perfect for festive celebrations. 
                  Each piece is crafted with care and made with love in India.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
                  onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="h-5 w-5 mr-2" />
                  View Packages
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-gray-600 ml-2">Made with Love in India</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={promoImage} 
                  alt="Festive Gift Hampers 2025" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Flame className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Our Hampers?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each hamper is thoughtfully curated with handmade crochet items that bring warmth and joy to your celebrations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Handmade with Love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every item is carefully handcrafted with attention to detail and love.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <CardTitle>Festive & Beautiful</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Perfect for adding a traditional touch to your festive celebrations.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Gift className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Choose your preferred bag style and customize your perfect hamper.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Our Festive Hampers</h3>
            <p className="text-lg text-gray-600">Choose from our carefully curated packages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  pkg.popular ? 'ring-2 ring-amber-500 scale-105' : ''
                } ${selectedPackage === pkg.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-gray-900">{pkg.price}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">*Shipping charges extra</p>
            <p className="text-xs text-gray-400 mt-2">*These are AI generated images. Actual products will be very similar to these</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">Ready to Order?</h3>
            <p className="text-lg text-amber-200 max-w-2xl mx-auto">
              Contact us through Instagram or WhatsApp to place your order and customize your perfect festive hamper.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-pink-600 hover:bg-pink-700 text-white"
                onClick={() => window.open('https://instagram.com/crochetmusingsbyhema', '_blank')}
              >
                <Instagram className="h-5 w-5 mr-2" />
                @crochetmusingsbyhema
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://wa.me/919949211170', '_blank')}
              >
                <Phone className="h-5 w-5 mr-2" />
                +91-99492 11170
              </Button>
            </div>

            <div className="pt-8 border-t border-amber-800">
              <p className="text-amber-200">Made with ❤️ in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="h-6 w-6 text-amber-300" />
            <span className="text-xl font-bold">Crochet Musings by Hema</span>
          </div>
          <p className="text-gray-400">© 2025 Crochet Musings by Hema. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router basename="/crochet-musings">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App

