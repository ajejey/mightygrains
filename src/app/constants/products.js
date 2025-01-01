import SSM from '../SSM.png'
import ragiHurihittu from '../assets/images/ragi-hurihittu.png'
// import sattuMaavuPack from '../assets/images/sattuMaavuPack-removebg.png'
import sattuMaavuPack from '../assets/images/sattu-maavu-grains.png'
import SproutedSathumaavuFront from '../assets/images/SproutedSathumaavuFront.png'
import SproutedSathumaavuBack from '../assets/images/SproutedSathuMaavuBack.png'
// import SproutedSathumaavuBackPack from '../assets/images/SproutedSathumaavuBackPack.png'
import sproutedRagiSeriFront from '../assets/images/sproutedRagiSeriFront.png'
import ragiSeriFrontPack from '../assets/images/sprouted-ragi-seri.png'
// import ragiSeriBackPack from '../assets/images/ragiseri-back-pack.png'
import sproutedRagiSeri from '../assets/images/SproutedRagiSeri.png'
import sproutedRagiSeriAlmondsFront from '../assets/images/RagiSeri-AlmondsFront.png'
import sproutedRagiSeriAlmondsBack from '../assets/images/RagiSeri-AlmondsBack.png'
// import RagiSeriAlmondsBackPack from '../assets/images/ragiseri-almonds-back-pack.png'
import RagiSeriAlmondsFrontPack from '../assets/images/sprouted-ragi-seri-almonds.png'

export const products = [
  {
    id: "sprouted-ragi-seri-porridge",
    name: "Sprouted Ragi Seri (6 months+)",
    fullDescription: `<p>When it comes to introducing your little one to solids, you want something that's gentle on their tiny tummies and packed with essential nutrients to support their rapid growth and development. Sprouted Ragi Seri checks all the boxes, making it an ideal first food for babies starting at 6 months.</p>
    <br/>
    <p><b>Rich in Calcium & Iron</b>: Strengthens bones and supports healthy blood.</p>
    <p><b>Easily Digestible</b>: Sprouted ragi is light and ideal for a baby’s developing digestive system.</p>
    <p><b>Sustained Energy</b>: Powers your little one’s exploration with natural, wholesome energy.</p>
    <p><b>Baby-Led Weaning Friendly</b></p>
    <p><b>Perfect First Food</b>: At 6 months, this porridge introduces babies to the mild sweetness of ragi with its nutty flavour, making it a gentle, enjoyable first meal.</p>`,
    description: "Sprouted Ragi Seri Porridge: The Perfect Nutritional Boost for Your Baby",
    price: {
      amount: 99,
      currency: "INR",
      unit: "200g"
    },
    image: ragiSeriFrontPack,
    images: [ragiSeriFrontPack, sproutedRagiSeriFront, sproutedRagiSeri],
    ingredients: [
      "<b>Sprouted Ragi (Finger Millet)</b>: This is the hero ingredient, loaded with calcium to help those tiny bones grow strong.",
      "<b>Green Cardamom</b>: Adds a touch of love and a pinch of tradition with digestive properties. "
   
    ],
    nutritionalFacts: {
      Calories: "34 kcal",
      Protein: "0.76g",
      "Total carbohydrates": "7.2g",
      "Total fat": "0.16g",
      "Dietary fibre": "0.92g",
      "Added sugar": "0g",
      "Magnesium": "2.5mg",
      "Calcium": "3.5mg",
      "Potassium": "10.5mg",
      "Iron": "0.33mg",
      "Niacin": "0.04mg",
      "Vitamin B6": "0.02mg",
    },
    benefits: [
      "Nutritional Powerhouse - Rich in calcium, iron, and fiber",
      "Easily Digestible - Gentle on the stomach",
      "Perfect for Active Kids - Provides energy boost",
      "Suitable for all ages",
      "Natural immunity-boosting properties"
    ],
    fullBenefits: [
      "Nutritional Powerhouse: Rich in calcium, iron, and fiber, it supports growth and overall health.",
      "Easily Digestible: The simple ingredients and preparation make it gentle on the stomach, ideal for all ages.",
      "Perfect for Active Kids: After a long day of play, these laddus provide the energy boost kids need while being a healthier alternative to processed sweets."
    ],
    recipe: {
      ingredients: [
        {
          item: "MIGHTYGRAINS Sprouted Ragi Seri",
          quantity: "1-2 tbsp",
          measure: "10-20g"
        },
        {
          item: "Water",
          quantity: "as needed"
        }
      ],
      instructions: [
        "<b>1. Make a Slurry</b>: Take one tablespoon of Sprouted Ragi Seri powder and mix it with a small amount of water to create a smooth paste.",
        "<b>2. Add Water or Milk</b>: Gradually add more water or milk (for toddlers and older children) to reach your preferred consistency.",
        "<b>3. Cook on Low Heat</b>: Stir constantly over low heat until the mixture thickens into a creamy porridge.",
        "<b>4. Serve Warm</b>: Allow it to cool to a safe temperature before serving to your baby."
      ],
      addOns: [
        "Apple Puree",
        "Banana Mash",
        "Sweet Potato or Carrot Puree"
      ]
    },
    // bulkPreparation: {
    //   ingredients: [
    //     {
    //       item: "Ragi flour",
    //       quantity: "1.5 cups"
    //     },
    //     {
    //       item: "Ghee",
    //       quantity: "1/3 cup"
    //     },
    //     {
    //       item: "Cardamom powder",
    //       quantity: "1/2 teaspoon",
    //       optional: true
    //     },
    //     {
    //       item: "Jaggery powder",
    //       quantity: "3/4 cup"
    //     }
    //   ],
    //   instructions: [
    //     "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
    //     "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
    //     "Remove from heat and add cardamom powder and jaggery powder",
    //     "Let the mixture cool slightly and mix well",
    //     "Shape into laddus and store in an airtight container"
    //   ]
    // },
    faqs: [
      {
        question: "What age is best to introduce Sprouted Sathu Maavu?",
        answer: "Babies can start enjoying sprouted Sathu Maavu porridge from 8 months and older, depending on individual readiness for solids."
      },
      {
        question: "Can I make Sathu Maavu porridge in bulk and store it?",
        answer: "It’s best to prepare fresh servings."
      },
      {
        question: "Can I add milk directly for babies under one year?",
        answer: "For babies under one, use water instead of milk. You can add milk for toddlers and older children."
      },
      {
        question: "How much Sathu Maavu porridge should I serve?",
        answer: "Start with 1-2 tablespoons and adjust based on your baby’s appetite and response."
      },
      {
        question: "What other fruits or vegetables can I add?",
        answer: "You can try gentle options like cooked vegetables including carrots and pumpkin puree, and fruits like apples or bananas for added nutrients."
      }
    ],
    storage: {
      method: "The product has to be stored in an airtight container.",
      temperature: "Room temperature and away from direct sunlight.",
      duration: "The porridge has to be immediately consumed."
    },
    targetAudience: ["Babies <b>6 months</b> and above"],
    traditions: {
      significance: "Traditional snack with nostalgic value",
      occasions: ["Daily snack", "Festivals", "Special occasions"]
    },
    box_length: "30",
    box_width: "25",
    box_height: "10",
    order_weight: "250"
  },
  {
    id: "sprouted-ragi-almonds-porridge",
    name: "Sprouted Ragi Seri + Almonds (7 months+)",
    fullDescription: `<p>Every parent wants the very best for their little one, especially when it comes to their very first foods. That’s why Sprouted Ragi & Almonds is here—bringing together nature’s goodness in every bite, crafted to nurture your baby’s growth with love and care.</p>
    <br/>
    
<p><b>Strong Bones, Happy Tummy</b>: Sprouted Ragi Seri with Almonds is packed with calcium—the building blocks your baby needs for those tiny bones to grow stronger every day.</p>
<br />
<p><b>Brain-Boosting Goodness</b>: With the healthy fats and protein from almonds, you’re giving your baby the nutrition they need for brain development and cognitive growth.</p>
<br/>
<p><b>Naturally Sweet & Soothing</b>: The gentle sweetness of almonds and the warmth of green cardamom create a delightful, comforting meal that’s as nurturing as a mother’s hug.</p>
<br/>
<p><b>For Babies 7+ Months</b></p>

<p>As your baby embarks on their solid food journey, Sprouted Ragi & Almonds is the perfect choice to support them through this exciting milestone. The Sprouted Ragi is soft and easy on their developing digestive system, while Almonds provide essential nutrients for their growing brain and body.</p>
<br/>
`,
    description: "Sprouted Ragi + Almonds Porridge Mix: A Delicious and Wholesome Health Drink for All Ages",
    price: {
      amount: 229,
      currency: "INR",
      unit: "200g"
    },
    image: RagiSeriAlmondsFrontPack,
    images: [RagiSeriAlmondsFrontPack, sproutedRagiSeriAlmondsFront, sproutedRagiSeriAlmondsBack],
    ingredients: [
      "<b>Sprouted Ragi (Finger Millet)</b>: This superfood is a powerhouse of calcium, iron, and fibre—perfect for building strong bones, promoting healthy blood, and supporting easy digestion.",
      "<b>Soaked & Well-Roasted Almonds</b>: These nutrient-packed almonds provide the ideal dose of healthy fats and protein, supporting your baby’s brain development and boosting overall growth.",
      "<b>Green Cardamom (Elaichi)</b>: The natural, mildly sweet flavour of cardamom adds a soothing touch, making every bite a comforting experience for your little one."
    ],
    nutritionalFacts: {
      "Calories": "35 kcal",
      "Protein": "<1g",
      "Total carbohydrates": "7g",
      "Total fat": "0.5g",
      "Dietary fibre": "0.92g",
      "Added sugar": "0g",
      "Calcium": "39mcg",
      "Potassium": "47mg",
      "Iron": "0.36mg",
      "Vitamin B6": "0.017mg",
      "Vitamin E": "0.45mg",
    },
    benefits: [
      "Nutritional Powerhouse - Rich in calcium, iron, and fiber",
      "Easily Digestible - Gentle on the stomach",
      "Perfect for Active Kids - Provides energy boost",
      "Suitable for all ages",
      "Natural immunity-boosting properties"
    ],
    fullBenefits: [
      "Nutritional Powerhouse: Rich in calcium, iron, and fiber, it supports growth and overall health.",
      "Easily Digestible: The simple ingredients and preparation make it gentle on the stomach, ideal for all ages.",
      "Perfect for Active Kids: After a long day of play, these laddus provide the energy boost kids need while being a healthier alternative to processed sweets."
    ],
    recipe: {
      ingredients: [
        {
          item: "MIGHTYGRAINS Sprouted Ragi + Almonds Porridge Mix",
          quantity: "1-2 tbsp",
          measure: "10-20g"
        },
        {
          item: "Water",
          quantity: "as needed"
        }
      ],
      instructions: [
        "<b>1. Make a Slurry</b>: Take one tablespoon of Sprouted Ragi Seri powder and mix it with a small amount of water to create a smooth paste.",
        "<b>2. Add Water or Milk</b>: Gradually add more water or milk (for toddlers and older children) to reach your preferred consistency.",
        "<b>3. Cook on Low Heat</b>: Stir constantly over low heat until the mixture thickens into a creamy porridge.",
        "<b>4. Serve Warm</b>: Allow it to cool to a safe temperature before serving to your baby."
      ],
      addOns: [
        "Apple Puree",
        "Banana Mash",
        "Sweet Potato or Carrot Puree"
      ]
    },
    // bulkPreparation: {
    //   ingredients: [
    //     {
    //       item: "Ragi flour",
    //       quantity: "1.5 cups"
    //     },
    //     {
    //       item: "Ghee",
    //       quantity: "1/3 cup"
    //     },
    //     {
    //       item: "Cardamom powder",
    //       quantity: "1/2 teaspoon",
    //       optional: true
    //     },
    //     {
    //       item: "Jaggery powder",
    //       quantity: "3/4 cup"
    //     }
    //   ],
    //   instructions: [
    //     "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
    //     "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
    //     "Remove from heat and add cardamom powder and jaggery powder",
    //     "Let the mixture cool slightly and mix well",
    //     "Shape into laddus and store in an airtight container"
    //   ]
    // },
    faqs: [
      {
        question: "What age is best to introduce Sprouted Sathu Maavu?",
        answer: "Babies can start enjoying sprouted Sathu Maavu porridge from 8 months and older, depending on individual readiness for solids."
      },
      {
        question: "Can I make Sathu Maavu porridge in bulk and store it?",
        answer: "It’s best to prepare fresh servings."
      },
      {
        question: "Can I add milk directly for babies under one year?",
        answer: "For babies under one, use water instead of milk. You can add milk for toddlers and older children."
      },
      {
        question: "How much Sathu Maavu porridge should I serve?",
        answer: "Start with 1-2 tablespoons and adjust based on your baby’s appetite and response."
      },
      {
        question: "What other fruits or vegetables can I add?",
        answer: "You can try gentle options like cooked vegetables including carrots and pumpkin puree, and fruits like apples or bananas for added nutrients."
      }
    ],
    storage: {
      method: "The product has to be stored in an airtight container.",
      temperature: "Room temperature and away from direct sunlight.",
      duration: "The porridge has to be immediately consumed."
    },
    targetAudience: ["Babies <b>7 months</b> and above"],
    traditions: {
      significance: "Traditional snack with nostalgic value",
      occasions: ["Daily snack", "Festivals", "Special occasions"]
    },
    box_length: "30",
    box_width: "25",
    box_height: "10",
    order_weight: "250"
  },
  {
    id: "sprouted-sathu-maavu",
    name: "Sprouted Sathu Maavu (8 months+)",
    fullDescription: `<p>Imagine giving your little one a spoonful of love and nourishment that combines centuries of tradition with modern nutritional science.I know what it feels like to constantly worry about what’s best for your little one. I’ve been there too—reading labels, researching ingredients, and questioning every choice I make for my child. That’s when my grandmother’s Sprouted Sathu Maavu helped me.</p> 
    <br />
    <p>This mix isn’t just a product; it’s my promise to you. I’ve poured love, care, and generations of wisdom into crafting this blend. It’s made with the same care as if I were feeding my family—and I wouldn’t have it any other way.</p>`,
    description: "A nourishing, wholesome food for your baby that’s gentle on their stomach and filled with essential nutrients",
    price: {
      amount: 280,
      currency: "INR",
      unit: "200g"
    },
    image: sattuMaavuPack,
    images: [sattuMaavuPack, SproutedSathumaavuFront, SproutedSathumaavuBack],
    // ingredients: [
    //   "Sprouted Finger Millet (Ragi)",
    //   "Sprouted Sorghum (Jowar)",
    //   "Sprouted Wheat",
    //   "Matta Rice",
    //   "Millet Mix (Proso, Barnyard, Little, Kodo, Foxtail)",
    //   "Sprouted Legumes (Brown Chickpeas, Chickpeas, Cowpeas, Green Gram, Horse Gram)",
    //   "Sago (Sabudana)",
    //   "Fried Gram",
    //   "Groundnut (Peanut)",
    //   "Corn",
    //   "Pistachios and Almonds",
    //   "Soya",
    //   "Flax Seeds",
    //   "Green Cardamom (Elaichi)"
    // ],
    ingredients: [
      "<b>Sprouted Ragi (Finger Millet)</b>: The calcium-packed hero that builds strong baby bones.",
      "<b>Sprouted Sorghum (Jowar)</b>: Fibre-rich and tummy-friendly. Bye-bye tummy troubles!",
      "<b>Sprouted Emmer Wheat</b>: An ancient grain, loaded with protein and fibre, giving your little one all the energy they need for big smiles and first steps.",
      "<b>Matta Rice</b>: This ancient, hearty grain isn’t just a staple—it’s a powerhouse! Packed with fibre for smooth digestion and complex carbs for sustained energy, it’s the perfect base for your baby’s growing body. Plus, its mild, nutty flavour makes it super easy for tiny taste buds to love.",
      "<b>Millet Mix (Proso, Barnyard, Little, Kodo, Foxtail)</b>: These millets are packed with ancient nutrition, gluten-free and ready to nourish.",
      "<b>Sprouted Legumes (Chickpeas, Green Gram, Horse Gram)</b>: Protein powerhouses for tiny muscles.",
      "<b>Sago (Sabudana)</b>: Smooth energy, easy digestion.",
      "<b>Groundnuts & Nuts (Peanuts, Pistachios, Almonds)</b>: Healthy fats for that growing brain.",
      "<b>Flax Seeds</b>: Omega-3-rich seeds that support brain and heart health.",
      "<b>Green Cardamom</b>: A sweet tradition with digestive magic."
    ],
    nutritionalFacts: {
      Calories: "35 kcal",
      Protein: "1.5g",
      "Total carbs": "6g",
      "Total fat": "1g",
      "Total fiber": "3g",
      "Dietary fibre": "1.2g",
      "Added sugar": "0g",
      "Magnesium": "7mg",
      "Calcium": "6mg",
      "Potassium": "30mg",
      "Iron": "0.4mg",
      "Vitamin E": "0.1mg",
      "Vitamin B6": "0.1mg",
    },
    benefits: [
      "Better Nutrient Absorption: Sprouting boosts vitamin and mineral availability.",
      "Easy Digestion: Gentler on baby's developing digestive system.",
      "Balanced Nutrition: Essential carbs, protein, and fats for growth.",
      "Immunity & Development: Supports immune system, brain, and bone health."
    ],
    fullBenefits: [
      "Enhanced Nutrient Absorption: Sprouting increases the bioavailability of essential vitamins and minerals, ensuring your baby’s body can absorb more nutrients.",
      "Gentle on the Stomach: Sprouting breaks down complex carbs and proteins, making it easier for babies’ developing digestive systems to handle.",
      "Complete Nutrition: This porridge provides a balanced mix of macronutrients—carbs, protein, and healthy fats—essential for steady growth and development.",
      "Immune and Brain Support: Loaded with iron, calcium, omega-3s, and antioxidants, Sathu Maavu supports healthy immunity, brain development, and bone growth."
    ],
    recipe: {
      ingredients: [
        {
          item: "MIGHTYGRAINS Sprouted Sathu Maavu",
          quantity: "1 tbsp",
          measure: "20g"
        },
        {
          item: "Water",
          quantity: "as needed"
        }
      ],
      instructions: [
        "<b>1. Make a Slurry</b>: Take one tablespoon of Sprouted Sathu Maavu powder and mix it with a small amount of water to create a smooth paste.",
        "<b>2. Add Water or Milk</b>: Gradually add more water or milk (for toddlers and older children) to reach your preferred consistency.",
        "<b>3. Cook on Low Heat</b>: Stir constantly over low heat until the mixture thickens into a creamy porridge.",
        "<b>4. Serve Warm</b>: Allow it to cool to a safe temperature before serving to your baby."
      ],
      addOns: [
        "Apple Puree",
        "Banana Mash",
        "Sweet Potato or Carrot Puree"
      ]
    },
    // bulkPreparation: {
    //   ingredients: [
    //     {
    //       item: "Sathu Maavu powder",
    //       quantity: "1.5 cups"
    //     },
    //     {
    //       item: "Ghee",
    //       quantity: "1/3 cup"
    //     },
    //     {
    //       item: "Cardamom powder",
    //       quantity: "1/2 teaspoon",
    //       optional: true
    //     },
    //     {
    //       item: "Jaggery powder",
    //       quantity: "3/4 cup"
    //     }
    //   ],
    //   instructions: [
    //     "Roast Sathu Maavu powder on low flame for 6-8 minutes until color changes and aroma develops",
    //     "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
    //     "Remove from heat and add cardamom powder and jaggery powder",
    //     "Let the mixture cool slightly and mix well",
    //     "Shape into laddus and store in an airtight container"
    //   ]
    // },
    faqs: [
      {
        question: "What age is best to introduce Sprouted Sathu Maavu?",
        answer: "Babies can start enjoying sprouted Sathu Maavu porridge from 8 months and older, depending on individual readiness for solids."
      },
      {
        question: "Can I make Sathu Maavu porridge in bulk and store it?",
        answer: "It’s best to prepare fresh servings."
      },
      {
        question: "Can I add milk directly for babies under one year?",
        answer: "For babies under one, use water instead of milk. You can add milk for toddlers and older children."
      },
      {
        question: "How much Sathu Maavu porridge should I serve?",
        answer: "Start with 1-2 tablespoons and adjust based on your baby’s appetite and response."
      },
      {
        question: "What other fruits or vegetables can I add?",
        answer: "You can try gentle options like cooked vegetables including carrots and pumpkin puree, and fruits like apples or bananas for added nutrients."
      }
    ],
    storage: {
      method: "The product has to be stored in an airtight container.",
      temperature: "Room temperature and away from direct sunlight.",
      duration: "The porridge has to be immediately consumed."
    },
    targetAudience: ["Babies <b>8 months</b> and above"],
    traditions: {
      significance: "Traditional snack with nostalgic value",
      occasions: ["Daily snack", "Festivals", "Special occasions"]
    },
    box_length: "30",
    box_width: "25",
    box_height: "10",
    order_weight: "250"

  },
    {
      id: 'ragi-hurihittu',
      name: "Ragi Hurihittu (12 months+)",
      image: ragiHurihittu,
      images: [ragiHurihittu, ragiHurihittu, ragiHurihittu],
      shortDescription: "A traditional and nutritious sweet snack made with sprouted ragi (finger millet) and green cardamom.",
      fullDescription: `<p>Do you remember those childhood days when the kitchen was filled with the warm, nutty aroma of homemade snacks? That’s exactly the feeling I wanted to capture with Ragi Hurihittu. This isn’t just a snack—it’s a slice of tradition, lovingly made to bring back memories of home while nourishing your family.</p>
      <br />
<p>At the heart of Ragi Hurihittu is Ragi (finger millet)—an ancient grain that’s been a staple in our homes for generations. But this isn’t just any Ragi. It’s carefully washed, soaked, and popped to perfection, unlocking a deliciously nutty flavour and amplifying its nutritional benefits.</p>
      <br />
<p>To make it even more special, we’ve added the warm, aromatic embrace of green cardamom (elaichi). The result? A wholesome, subtly sweet treat that’s rich in calcium, iron, and fibre—perfect for growing kids and health-conscious adults alike.</p>`,
      
      ingredients: [
        "Sprouted Ragi (finger millet)",
        "Green Cardamom (Elaichi)"
      ],
      
      nutritionalFacts: {
        calories: 100,
        protein: "4g",
        carbs: "22g",
        fat: "1g",
        fiber: "3g"
      },
      
      // New fields to capture additional information
      price: {
        amount: 225,
        currency: "INR",
        unit: "500g"
      },
      
      benefits: [
        "Nutritional Powerhouse - Rich in calcium, iron, and fiber",
        "Easily Digestible - Gentle on the stomach",
        "Perfect for Active Kids - Provides energy boost",
        "Suitable for all ages",
        "Natural immunity-boosting properties"
      ],

      fullBenefits: [
        "Nutritional Powerhouse: Rich in calcium, iron, and fiber, it supports growth and overall health.",
        "Easily Digestible: The simple ingredients and preparation make it gentle on the stomach, ideal for all ages.",
        "Perfect for Active Kids: After a long day of play, these laddus provide the energy boost kids need while being a healthier alternative to processed sweets."
      ],
      
      recipe: {
        ingredients: [
          {
            item: "MIGHTYGRAINS Ragi Hurihittu Mix",
            quantity: "1 cup",
            measure: "200g"
          },
          {
            item: "Jaggery powder",
            quantity: "1 cup"
          },
          {
            item: "Ghee",
            quantity: "1-2 teaspoons"
          },
          {
            item: "Milk",
            quantity: "as needed"
          },
          {
            item: "Freshly grated coconut",
            quantity: "½ cup"
          }
        ],
        instructions: [
          "Combine 1 cup of Ragi flour, 1 cup of jaggery powder, 1-2 teaspoons of ghee, and a splash of milk in a bowl",
          "Mix well until smooth and lump-free",
          "Gently fold in ½ cup of freshly grated coconut",
          "Roll the mixture into small, bite-sized balls",
          "Allow the laddus to set for a few minutes before serving"
        ]
      },
      
      // bulkPreparation: {
      //   ingredients: [
      //     {
      //       item: "Ragi flour",
      //       quantity: "1.5 cups"
      //     },
      //     {
      //       item: "Ghee",
      //       quantity: "1/3 cup"
      //     },
      //     {
      //       item: "Cardamom powder",
      //       quantity: "1/2 teaspoon",
      //       optional: true
      //     },
      //     {
      //       item: "Jaggery powder",
      //       quantity: "3/4 cup"
      //     }
      //   ],
      //   instructions: [
      //     "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
      //     "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
      //     "Remove from heat and add cardamom powder and jaggery powder",
      //     "Let the mixture cool slightly and mix well",
      //     "Shape into laddus and store in an airtight container"
      //   ]
      // },
      
      faqs: [
        {
          question: "What age is best to introduce Ragi Hurihittu?",
          answer: "Babies can start enjoying sprouted Ragi Hurihittu (popped Ragi flour) from 12 months and older, depending on individual readiness for solids."
        },
        {question: "Where else can I use Popped Ragi Flour ( Ragi Hurihittu)?",
          answer: "It is best used to make cookies, laddus, and brownies."}
      ],
      
      storage: {
        method: "The product has to be stored in an airtight container.",
        temperature: "Room temperature and away from direct sunlight.",
        duration: "The porridge has to be immediately consumed."
      },
      
      targetAudience: ["Kids", "Adults", "Toddlers", "Families"],
      
      traditions: {
        significance: "Traditional snack with nostalgic value",
        occasions: ["Daily snack", "Festivals", "Special occasions"]
      },
      box_length: "30",
      box_width: "25",
      box_height: "10",
      order_weight: "600"
    }, 
  ];

  export const testimonials = [
    {
      quote: "Very good quality and tasty food products for kids of all ages.. Have been using since more than a year.. My kid loves it.. Thank you Dayani :)",
      author: "Mangalagauri.",
      role: "Mother of 2-year-old",
      rating: 5
    },
    {
      quote: "I have purchased Sathu Maavu, Ragi with  almond powder, Ragi with cashew powder, goond barfi from Dayani. She is my go to always for my lil one.",
      author: "Riddhi.",
      role: "Mother of 2-year-old",
      rating: 5
    },
    {
      quote: "Whenever I want to prepare Ragi Laddo,mighty grains Ragi powder comes handy to me with an amazing quality and it is highly nutritious. Dayani takes care of the quality of the ingredients and prepares with utmost love ❤️ I wish you all the very best dear. Keep growing and Keep motivating 🤩",
      author: "Akanksha.",
      role: "",
      rating: 5
    },
    {
      quote: "Dayani makes amazing good products including Ragi with almond seri for my kid and Chutney powder for us adults. All made to order freshly and delivered timely. Very reliable and tasty products. Thank you for your services. Will keep visiting again and again. Please continue the good work.",
      author: "Revathi.",
      role: "Mother of 3-year-old",
      rating: 5
    },
    {
      quote: "Excellent products and service. I have been using their Sattu Maavu and groundnut chutney pudi for the past few years and I love it!",
      author: "Ashutosh.",
      role: "",
      rating: 5
    },
    // {
    //   quote: "As a pediatrician, I often recommend Mighty Grains to new mothers. The quality of ingredients and the nutritional balance is exactly what growing babies need.",
    //   author: "Dr. Ramya",
    //   role: "Pediatrician",
    //   rating: 5
    // }
  ];