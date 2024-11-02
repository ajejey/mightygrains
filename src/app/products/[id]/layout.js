import { products } from '@/app/constants/products';
import React from 'react'

export async function generateMetadata({ params }) {
  const product = products.find(p => p.id.toString() === params.id);
  return {
    title: `${product.name} | Mighty Grains`,
    description: product.fullDescription,
  };
}

const layout = ({ children }) => {
  return (
    <div>
      {children}
      </div>
  )
}

export default layout