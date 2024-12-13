'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  FaShoppingCart, FaLeaf, FaWeight, FaChevronLeft, FaChevronRight,
  FaCheck, FaQuestionCircle, FaStar, FaClock, FaHeart,
  FaWhatsapp
} from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import ProductCard from '@/app/components/reusableComponents/ProductCard';
import { useCart } from '@/context/CartContext';

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
    <FaChevronRight className="text-green-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
    <FaChevronLeft className="text-green-800" />
  </button>
);

const ProductDetails = ({ product }) => {
  // const product = products.find(p => p.id.toString() === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const sliderRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart } = useCart();


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setSelectedImage(current),
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product, quantity);
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  console.log("product  ", product);

  const productSample = {
    "nutritionalFacts": {
        "calories": 100,
        "protein": "4g",
        "carbs": "22g",
        "fat": "1g",
        "fiber": "3g"
    },
    "_id": "6755e7d0022560f6af1863d8",
    "id": "ragi-hurihittu",
    "name": "Ragi Hurihittu",
    "fullDescription": "Ragi Hurihittu, a traditional snack made with ragi (finger millet) and green elaichi (cardamom), is a wholesome sweet that's packed with nutrition. This delightful treat combines the goodness of sprouted ragi, which is thoroughly washed, soaked, and gently popped to give a nutty flavour, with the aromatic touch of green cardamom. Perfect for both kids and adults, it's not just delicious but also rich in essential nutrients like calcium, iron, and fiber.",
    "price": 225,
    "image": "/images/RagiHurihittuPack.png",
    "images": [
        "/images/RagiHurihittuPack.png",
        "/images/RagiHurihittuPack.png",
        "/images/RagiHurihittuPack.png"
    ],
    "category": "Porridge",
    "stock": 100,
    "ingredients": [
        "Sprouted Ragi (finger millet)",
        "Green Cardamom (Elaichi)"
    ],
    "benefits": [
        "Nutritional Powerhouse - Rich in calcium, iron, and fiber",
        "Easily Digestible - Gentle on the stomach",
        "Perfect for Active Kids - Provides energy boost",
        "Suitable for all ages",
        "Natural immunity-boosting properties"
    ],
    "__v": 0,
    "createdAt": "2024-12-08T18:39:12.223Z",
    "updatedAt": "2024-12-08T18:39:12.223Z"
}

  // Filter out the current product from the related products
//   const relatedProducts = products.filter(p => p.id.toString() !== params.id);

  return (
    <div className="bg-amber-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm">
          <ol className="list-none p-0 flex text-amber-600">
            <li className="hover:text-amber-800">
              <Link href="/">Home</Link>
            </li>
            <li className="mx-2">/</li>
            <li className="hover:text-amber-800">
              <Link href="/products">Products</Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-amber-800">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery Section */}
            <div className="md:w-1/2 p-4">
              <Slider ref={sliderRef} {...settings}>
                {product.images.map((image, index) => (
                  <div key={index} className="relative flex items-center justify-center bg-gray-100 rounded-lg">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="transition-all p-4 mx-auto duration-300 max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </Slider>
              <div className="flex justify-center mt-8 space-x-2 px-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex items-center justify-center bg-gray-100 ${selectedImage === index ? 'border-green-500' : 'border-transparent'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
                <button className="text-red-400 hover:text-red-500">
                  <FaHeart size={24} />
                </button>
              </div>

              <div className="mb-4 flex items-center">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                {/* <span className="ml-2 text-amber-600">(50 reviews)</span> */}
              </div>

              <div className="mb-6">
                <div className="text-2xl font-bold text-green-700 mb-2">
                  ₹{product.price.amount}
                  <span className="text-sm text-gray-500 ml-2">per {product.price.unit}</span>
                </div>
                <div className="text-green-600 text-sm">Free delivery across Bengaluru</div>
              </div>

              <div className="mb-6">
                <p className="text-amber-700 text-lg">
                  {showFullDescription ? product.fullDescription : `${product.fullDescription.slice(0, 150)}...`}
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 hover:text-green-700 ml-2"
                  >
                    {showFullDescription ? 'Read less' : 'Read more'}
                  </button>
                </p>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-700 mb-3">Key Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.slice(0, 4).map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-amber-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector and Add to Cart */}
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 bg-amber-500 text-white py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-amber-700">
                  <FaClock className="text-green-600" />
                  <span>Delivery in 2-3 days</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-amber-700">
                  <FaLeaf className="text-green-600" />
                  <span>100% Natural</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              {['description', 'ingredients', 'recipe', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === tab
                      ? 'border-b-2 border-green-500 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">About {product.name}</h3>
                  <p className="text-amber-700">{product.fullDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <FaCheck className="text-green-500 mt-1" />
                        <span className="text-amber-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">Ingredients</h3>
                  <ul className="list-disc list-inside text-amber-700 space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-green-700 mb-3">Nutritional Facts</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {Object.entries(product.nutritionalFacts).map(([key, value]) => (
                        <div key={key} className="bg-amber-50 rounded-lg p-3 text-center">
                          <div className="text-sm text-amber-600 capitalize">{key}</div>
                          <div className="text-lg font-semibold text-green-700">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recipe' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">Recipe Instructions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Ingredients Needed:</h4>
                        <ul className="space-y-2">
                          {product.recipe.ingredients.map((ing, index) => (
                            <li key={index} className="flex items-center text-amber-700">
                              <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs mr-2">
                                {index + 1}
                              </span>
                              {ing.item} - {ing.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Steps:</h4>
                        <ol className="space-y-3">
                          {product.recipe.instructions.map((step, index) => (
                            <li key={index} className="flex items-start text-amber-700">
                              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm mr-2 flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">Bulk Preparation</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Ingredients for Bulk:</h4>
                        <ul className="space-y-2">
                          {product.bulkPreparation.ingredients.map((ing, index) => (
                            <li key={index} className="flex items-center text-amber-700">
                              <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs mr-2">
                                {index + 1}
                              </span>
                              {ing.item} - {ing.quantity}
                              {ing.optional && <span className="text-sm text-amber-500 ml-2">(optional)</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Bulk Preparation Steps:</h4>
                        <ol className="space-y-3">
                          {product.bulkPreparation.instructions.map((step, index) => (
                            <li key={index} className="flex items-start text-amber-700">
                              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm mr-2 flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-green-700">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {product.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-amber-100 pb-4">
                        <div className="flex items-start space-x-2">
                          <FaQuestionCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800 mb-2">{faq.question}</h4>
                            <p className="text-amber-700">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Storage and Traditions Section */}
          <div className="border-t p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-4">Storage Instructions</h3>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-green-600" />
                      <span className="text-amber-700">Storage Duration: {product?.storage?.duration || '6 months'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaLeaf className="text-green-600" />
                      <span className="text-amber-700">Method: {product?.storage?.method}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaWeight className="text-green-600" />
                      <span className="text-amber-700">Temperature: {product?.storage?.temperature}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-4">Traditional Significance</h3>
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-amber-700 mb-3">{product?.traditions?.significance}</p>
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Perfect for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product?.traditions?.occasions.map((occasion, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm text-green-600"
                        >
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="border-t p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Perfect For</h3>
            <div className="flex flex-wrap gap-4">
              {product?.targetAudience?.map((audience, index) => (
                <div
                  key={index}
                  className="bg-amber-50 rounded-lg px-4 py-2 flex items-center space-x-2"
                >
                  <FaCheck className="text-green-500" />
                  <span className="text-amber-700">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {/* <div className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div> */}
      </div>
      {showCartNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Item added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default ProductDetails;