import React from 'react'
import { FaHistory, FaUtensils } from 'react-icons/fa'
import { GiWeightScale } from 'react-icons/gi'

const BenefitsSection = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Why Mothers Choose Mighty Grains</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <FaHistory className="text-amber-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-700 mb-2">Traditional Recipes</h3>
          <p className="text-amber-600">Time-tested South Indian recipes passed down through generations</p>
        </div>
        <div className="text-center">
          <GiWeightScale className="text-amber-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-700 mb-2">Nutrient-Dense</h3>
          <p className="text-amber-600">Packed with essential vitamins, minerals, and proteins for healthy growth</p>
        </div>
        <div className="text-center">
          <FaUtensils className="text-amber-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-700 mb-2">Easy to Prepare</h3>
          <p className="text-amber-600">Quick and simple to make, perfect for busy parents</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default BenefitsSection