import { products } from '@/app/constants/products';
import SuspendedPostHogPageView from '@/app/PostHogPageView';
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
      <SuspendedPostHogPageView />
      {children}
      </div>
  )
}

export default layout