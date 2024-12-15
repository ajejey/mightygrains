'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { products } from '../constants/products';
import ProductCard from './reusableComponents/ProductCard';

const ProductCardOne = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Link href={`/products/${product.id}`}>
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-md mb-8 mx-auto object-cover"
      />
      <h3 className="text-2xl font-semibold text-amber-700 mb-2">{product.name}</h3>
      <p className="text-amber-600 mb-4">{product.shortDescription}</p>

      <div className='mb-4'>
      <p>{product.fullDescription}</p>
      </div>
      
      {/* <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "description" ? "border-b-2 border-amber-500 text-amber-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "ingredients" ? "border-b-2 border-amber-500 text-amber-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "nutrition" ? "border-b-2 border-amber-500 text-amber-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "description" && <p>{product.fullDescription}</p>}
          {activeTab === "ingredients" && (
            <ul className="list-disc pl-5">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {activeTab === "nutrition" && (
            <ul>
              <li><strong>Calories:</strong> {product.nutritionalFacts.calories}</li>
              <li><strong>Protein:</strong> {product.nutritionalFacts.protein}</li>
              <li><strong>Carbs:</strong> {product.nutritionalFacts.carbs}</li>
              <li><strong>Fat:</strong> {product.nutritionalFacts.fat}</li>
              <li><strong>Fiber:</strong> {product.nutritionalFacts.fiber}</li>
            </ul>
          )}
        </div>
      </div> */}
      
      <div className="flex justify-end items-center mt-4">
        <Link href={`https://wa.me/7829288011?text=I'm interested in ${product.name}`}>
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-colors">
            <FaShoppingCart className="mr-2" /> Order on WhatsApp
          </button>
        </Link>
      </div>
    </div>
    </Link>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="w-full bg-amber-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-800 text-center mb-12">Our Signature Products</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <Link href="#all-products">
            <button className="text-amber-700 hover:text-amber-800 flex items-center mx-auto">
              View All Products <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default ProductsSection;