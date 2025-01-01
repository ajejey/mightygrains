'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { products } from '../../constants/products';
import {
  FaShoppingCart, FaLeaf, FaWeight, FaChevronLeft, FaChevronRight,
  FaCheck, FaQuestionCircle, FaStar, FaClock, FaHeart,
  FaWhatsapp,
  FaTruck
} from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import ProductCard from '@/app/components/reusableComponents/ProductCard';
import { useCart } from '@/context/CartContext';
// import { useCart } from '@/app/context/CartContext';

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

const ProductPage = ({ params }) => {
  const product = products.find(p => p.id.toString() === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const sliderRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center py-20 text-2xl text-amber-800">Product not found</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setSelectedImage(current),
    dotsClass: 'slick-dots custom-dots'
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

  // Filter out the current product from the related products
  const relatedProducts = products.filter(p => p.id.toString() !== params.id);

  return (
    <div className="bg-amber-50 min-h-screen px-2">
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
            <div className="md:w-1/2 md:p-4">
              <Slider ref={sliderRef} {...settings}>
                {product.images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="transition-all duration-300 object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </Slider>
              <div className="flex justify-center md:mt-8 space-x-2 px-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative w-16 aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      fill
                      sizes="60px"
                      className="object-cover p-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="md:w-1/2 p-2">
              <div className="flex justify-between items-start">
                <h1 className="sm:text-3xl text-2xl font-semibold text-green-800 mb-2">{product.name}</h1>
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
                <div className="text-green-600 text-sm">Free delivery across India above ₹499</div>
              </div>

              <div className="mb-6">
                <span dangerouslySetInnerHTML={{ __html: product.fullDescription }} className="block text-amber-700 text-lg">
                </span>
                {/* <span>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 block hover:text-green-700 ml-2"
                  >
                    {showFullDescription ? 'Read less' : 'Read more'}
                  </button>
                </span> */}
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
                <div className="flex items-center space-x-2 text-sm text-amber-700">
                  <FaTruck className="text-green-600" />
                  <span>Free delivery above ₹499</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          {/* <div className="border-t">
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
            </div> */}

            <div className="px-2 md:px-6">
              {/* {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">About {product.name}</h3>
                  <p className="text-amber-700">{product.fullDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {product.fullBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <FaCheck className="text-green-500 mt-1" />
                        <span className="text-amber-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* {activeTab === 'ingredients' && ( */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold text-green-700">Ingredients</h3>
                  <ul className="list-disc list-inside text-amber-700 space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: ingredient }}></p>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-green-700 mb-3">Nutritional Facts <span className="text-sm">(per 10g serving)</span> </h4>
                    <div className="overflow-x-auto md:w-1/2">
                      <table className="w-full text-sm text-left text-amber-700">
                        {/* <thead className="text-amber-600">
                          <tr>
                            <th className="px-4 py-2">Nutrient</th>
                            <th className="px-4 py-2">Quantity</th>
                          </tr>
                        </thead> */}
                        <tbody>
                          {Object.entries(product.nutritionalFacts).map(([key, value]) => (
                            <tr key={key} className="border-t border-amber-200">
                              <td className="px-4 py-2">{key}</td>
                              <td className="px-4 py-2">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              {/* )} */}

              {/* {activeTab === 'recipe' && ( */}
                <div className="space-y-6 pt-4">
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
                        
                          {product.recipe.instructions.map((step, index) => (
                            <p  dangerouslySetInnerHTML={{ __html: step }} key={index} className="text-amber-700" />
                           ))}
                       
                      </div>
                    </div>
                  </div>
                  
                  {product.bulkPreparation &&
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
                  }
                </div>
              {/* )} */}

              {/* {activeTab === 'faqs' && ( */}
                <div className="space-y-6 pt-4">
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
              {/* )} */}
            </div>
          </div>

          {/* Storage and Traditions Section */}
          <div className="border-t py-4 px-2">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-4">Storage Instructions</h3>
                <div className="bg-amber-50 rounded-lg pt-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 gap-2">
                      <FaClock className="text-green-600" />
                      <span className="text-amber-700"><b>Storage Duration</b> : {product.storage.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 gap-2">
                      <FaLeaf className="text-green-600" />
                      <span className="text-amber-700"><b>Method</b> : {product.storage.method}</span>
                    </div>
                    <div className="flex items-center space-x-2 gap-2">
                      <FaWeight className="text-green-600" />
                      <span className="text-amber-700"><b>Temperature</b> : {product.storage.temperature}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div>
                <h3 className="text-lg font-semibold text-green-700 mb-4">Traditional Significance</h3>
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-amber-700 mb-3">{product.traditions.significance}</p>
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Perfect for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.traditions.occasions.map((occasion, index) => (
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
              </div> */}
            </div>
          </div>

          {/* Target Audience */}
          <div className="border-t pt-4 px-2">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Perfect For</h3>
            <div className="flex flex-wrap gap-4">
              {product.targetAudience.map((audience, index) => (
                <div
                  key={index}
                  className="bg-amber-50 rounded-lg px-2 py-2 flex items-center space-x-2"
                >
                  <FaCheck className="text-green-500" />
                  <span dangerouslySetInnerHTML={{ __html: audience }} className="text-amber-700"></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    //   {showCartNotification && (
    //     <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
    //       Item added to cart successfully!
    //     </div>
    //   )}
    // </div>
  );
};

export default ProductPage;