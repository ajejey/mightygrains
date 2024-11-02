import SSM from '../SSM.png'
import ragiHurihittu from '../assets/images/RagiHurihittuPack-removebg.png'
import sattuMaavuPack from '../assets/images/sattuMaavuPack-removebg.png'
import SproutedSathumaavuFront from '../assets/images/SproutedSathumaavuFront.png'
import SproutedSathumaavuBack from '../assets/images/SproutedSathuMaavuBack.png'
import SproutedSathumaavuBackPack from '../assets/images/SproutedSathumaavuBackPack.png'
import sproutedRagiSeriFront from '../assets/images/sproutedRagiSeriFront.png'
import ragiSeriFrontPack from '../assets/images/ragiseri-front-pack.png'
import ragiSeriBackPack from '../assets/images/ragiseri-back-pack.png'
import sproutedRagiSeri from '../assets/images/SproutedRagiSeri.png'
import sproutedRagiSeriAlmondsFront from '../assets/images/RagiSeri-AlmondsFront.png'
import sproutedRagiSeriAlmondsBack from '../assets/images/RagiSeri-AlmondsBack.png'
import RagiSeriAlmondsBackPack from '../assets/images/ragiseri-almonds-back-pack.png'
import RagiSeriAlmondsFrontPack from '../assets/images/ragiseri-almonds-front-pack.png'

export const products = [
  {
    id: "sprouted-sathu-maavu",
    name: "Sprouted Sathu Maavu",
    fullDescription: "The Perfect Nutritious Porridge for Babies 8 Months and Up",
    description: "A nourishing, wholesome food for your baby that’s gentle on their stomach and filled with essential nutrients",
    price: {
      amount: 280,
      currency: "INR",
      unit: "200g"
    },
    image: sattuMaavuPack,
    images: [sattuMaavuPack, SproutedSathumaavuBackPack, SproutedSathumaavuFront, SproutedSathumaavuBack],
    ingredients: [
      "Sprouted Finger Millet (Ragi)",
      "Sprouted Sorghum (Jowar)",
      "Sprouted Wheat",
      "Matta Rice",
      "Millet Mix (Proso, Barnyard, Little, Kodo, Foxtail)",
      "Sprouted Legumes (Brown Chickpeas, Chickpeas, Cowpeas, Green Gram, Horse Gram)",
      "Sago (Sabudana)",
      "Fried Gram",
      "Groundnut (Peanut)",
      "Corn",
      "Pistachios and Almonds",
      "Soya",
      "Flax Seeds",
      "Green Cardamom (Elaichi)"
    ],
    nutritionalFacts: {
      calories: 100,
      protein: "4g",
      carbs: "22g",
      fat: "1g",
      fiber: "3g"
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
          quantity: "1 cup",
          measure: "200g"
        },
        {
          item: "Water",
          quantity: "as needed"
        }
      ],
      instructions: [
        "Make a Paste: Take one tablespoon of Sathu Maavu powder and mix it with a small amount of water to create a smooth paste.",
        "Add Water or Milk: Gradually add more water or milk (for toddlers and older children) to reach your preferred consistency.",
        "Cook on Low Heat: Stir constantly over low heat until the mixture thickens into a creamy porridge.",
        "Serve Warm: Allow it to cool to a safe temperature before serving to your baby."
      ],
      addOns: [
        "Apple Puree",
        "Banana Mash",
        "Sweet Potato or Carrot Puree"
      ]
    },
    bulkPreparation: {
      ingredients: [
        {
          item: "Sathu Maavu powder",
          quantity: "1.5 cups"
        },
        {
          item: "Ghee",
          quantity: "1/3 cup"
        },
        {
          item: "Cardamom powder",
          quantity: "1/2 teaspoon",
          optional: true
        },
        {
          item: "Jaggery powder",
          quantity: "3/4 cup"
        }
      ],
      instructions: [
        "Roast Sathu Maavu powder on low flame for 6-8 minutes until color changes and aroma develops",
        "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
        "Remove from heat and add cardamom powder and jaggery powder",
        "Let the mixture cool slightly and mix well",
        "Shape into laddus and store in an airtight container"
      ]
    },
    faqs: [
      {
        question: "What age is best to introduce Sprouted Sathu Maavu?",
        answer: "Babies can start enjoying sprouted Sathu Maavu porridge from 8 months and older, depending on individual readiness for solids."
      },
      {
        question: "Can I make Sathu Maavu porridge in bulk and store it?",
        answer: "It’s best to prepare fresh servings. However, dry Sathu Maavu powder can be stored in an airtight container for a few weeks."
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
        answer: "Yes! You can try gentle options like pear or pumpkin puree for added nutrients."
      }
    ],
    storage: {
      method: "Airtight container",
      temperature: "Room temperature or refrigerated",
      duration: "Few days at room temperature, longer if refrigerated"
    },
    targetAudience: ["Kids", "Adults", "Toddlers", "Families"],
    traditions: {
      significance: "Traditional snack with nostalgic value",
      occasions: ["Daily snack", "Festivals", "Special occasions"]
    }
  },
    {
      id: 'ragi-hurihittu',
      name: "Ragi Hurihittu",
      image: ragiHurihittu,
      images: [ragiHurihittu, ragiHurihittu, ragiHurihittu],
      shortDescription: "A traditional and nutritious sweet snack made with sprouted ragi (finger millet) and green cardamom.",
      fullDescription: "Ragi Hurihittu, a traditional snack made with ragi (finger millet) and green elaichi (cardamom), is a wholesome sweet that's packed with nutrition. This delightful treat combines the goodness of sprouted ragi, which is thoroughly washed, soaked, and gently popped to give a nutty flavour, with the aromatic touch of green cardamom. Perfect for both kids and adults, it's not just delicious but also rich in essential nutrients like calcium, iron, and fiber.",
      
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
      
      bulkPreparation: {
        ingredients: [
          {
            item: "Ragi flour",
            quantity: "1.5 cups"
          },
          {
            item: "Ghee",
            quantity: "1/3 cup"
          },
          {
            item: "Cardamom powder",
            quantity: "1/2 teaspoon",
            optional: true
          },
          {
            item: "Jaggery powder",
            quantity: "3/4 cup"
          }
        ],
        instructions: [
          "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
          "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
          "Remove from heat and add cardamom powder and jaggery powder",
          "Let the mixture cool slightly and mix well",
          "Shape into laddus and store in an airtight container"
        ]
      },
      
      faqs: [
        {
          question: "Can I make Ragi Hurihittu in bulk?",
          answer: "Yes! But for the freshest taste, it's best to enjoy them within a few days. Avoid using milk for bulk preparation."
        },
        {
          question: "Is this treat suitable for toddlers?",
          answer: "Absolutely! It's a gentle snack perfect for little ones!"
        },
        {
          question: "Can I use sugar instead of jaggery?",
          answer: "Yes! While jaggery adds a unique, earthy flavor, you can use sugar. Palm jaggery is also suitable for babies in desired quantities."
        },
        {
          question: "How should I store these laddus?",
          answer: "Keep them in an airtight container at room temperature for a few days or refrigerate for longer freshness."
        },
        {
          question: "Can I add nuts or dried fruits?",
          answer: "Yes! Get creative! Adding nuts or dried fruits can enhance flavor and nutrition."
        }
      ],
      
      storage: {
        method: "Airtight container",
        temperature: "Room temperature or refrigerated",
        duration: "Few days at room temperature, longer if refrigerated"
      },
      
      targetAudience: ["Kids", "Adults", "Toddlers", "Families"],
      
      traditions: {
        significance: "Traditional snack with nostalgic value",
        occasions: ["Daily snack", "Festivals", "Special occasions"]
      }
    },

    {
      id: "sprouted-ragi-seri-porridge",
      name: "Sprouted Ragi Seri Porridge",
      fullDescription: "A rich and nutritious blend for your little ones.",
      description: "Sprouted Ragi Seri Porridge: The Perfect Nutritional Boost for Your Baby",
      price: {
        amount: 90,
        currency: "INR",
        unit: "200g"
      },
      image: ragiSeriFrontPack,
      images: [ragiSeriFrontPack, ragiSeriBackPack, sproutedRagiSeriFront, sproutedRagiSeri],
      ingredients: ["Sprouted Ragi (finger millet)",
          "Green Cardamom (Elaichi)"
      
      ],
      nutritionalFacts: {
        calories: 100,
        protein: "4g",
        carbs: "22g",
        fat: "1g",
        fiber: "3g"
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
            quantity: "1 cup",
            measure: "200g"
          },
          {
            item: "Water",
            quantity: "as needed"
          }
        ],
        instructions: [
          "Mix one tablespoon of Ragi powder with a bit of water to form a smooth paste without lumps.",
          "Add Water gradually to reach your desired consistency.",
          "Cook on Low Heat until the mixture thickens into a smooth, creamy porridge."
        ],
        addOns: [
          "Apple Puree",
          "Banana Mash",
          "Sweet Potato or Carrot Puree"
        ]
      },
      bulkPreparation: {
        ingredients: [
          {
            item: "Ragi flour",
            quantity: "1.5 cups"
          },
          {
            item: "Ghee",
            quantity: "1/3 cup"
          },
          {
            item: "Cardamom powder",
            quantity: "1/2 teaspoon",
            optional: true
          },
          {
            item: "Jaggery powder",
            quantity: "3/4 cup"
          }
        ],
        instructions: [
          "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
          "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
          "Remove from heat and add cardamom powder and jaggery powder",
          "Let the mixture cool slightly and mix well",
          "Shape into laddus and store in an airtight container"
        ]
      },
      faqs: [
        {
          question: "What age is best to introduce Sprouted Ragi Seri Porridge?",
          answer: "Babies can start enjoying sprouted Ragi porridge from 6 months and older, depending on individual readiness for solids."
        },
        {
          question: "Can I make Ragi porridge in bulk and store it?",
          answer: "It's best to make fresh servings each time. However, dry ragi powder can be stored in an airtight container for a few weeks."
        },
        {
          question: "Can I add milk directly for a baby under one year?",
          answer: "For babies under one, use water instead of milk. You can add milk for toddlers and older children."
        },
        {
          question: "How much ragi porridge should I serve to my baby?",
          answer: "Start with 1-2 tablespoons and adjust based on your baby's appetite and response."
        },
        {
          question: "Are there other fruits or veggies I can add?",
          answer: "Yes! You can try gentle options like pear or pumpkin puree for added nutrients."
        }
      ],
      storage: {
        method: "Airtight container",
        temperature: "Room temperature or refrigerated",
        duration: "Few days at room temperature, longer if refrigerated"
      },
      targetAudience: ["Kids", "Adults", "Toddlers", "Families"],
      traditions: {
        significance: "Traditional snack with nostalgic value",
        occasions: ["Daily snack", "Festivals", "Special occasions"]
      }
    },

    {
      id: "sprouted-ragi-almonds-porridge",
      name: "Sprouted Ragi + Almonds Porridge",
      fullDescription: "A Nutritional Powerhouse for Everyone",
      description: "Sprouted Ragi + Almonds Porridge Mix: A Delicious and Wholesome Health Drink for All Ages",
      price: {
        amount: 230,
        currency: "INR",
        unit: "200g"
      },
      image: RagiSeriAlmondsFrontPack,
      images: [RagiSeriAlmondsFrontPack, RagiSeriAlmondsBackPack, sproutedRagiSeriAlmondsFront, sproutedRagiSeriAlmondsBack],
      ingredients: ["Sprouted Ragi (finger millet)",
          "Almonds",
          "Green Cardamom (Elaichi)"
      
      ],
      nutritionalFacts: {
        calories: 100,
        protein: "4g",
        carbs: "22g",
        fat: "1g",
        fiber: "3g"
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
            quantity: "1 cup",
            measure: "200g"
          },
          {
            item: "Water",
            quantity: "as needed"
          }
        ],
        instructions: [
          "Mix one tablespoon of Ragi powder with a bit of water to form a smooth paste without lumps.",
          "Add Water gradually to reach your desired consistency.",
          "Cook on Low Heat until the mixture thickens into a smooth, creamy porridge."
        ],
        addOns: [
          "Apple Puree",
          "Banana Mash",
          "Sweet Potato or Carrot Puree"
        ]
      },
      bulkPreparation: {
        ingredients: [
          {
            item: "Ragi flour",
            quantity: "1.5 cups"
          },
          {
            item: "Ghee",
            quantity: "1/3 cup"
          },
          {
            item: "Cardamom powder",
            quantity: "1/2 teaspoon",
            optional: true
          },
          {
            item: "Jaggery powder",
            quantity: "3/4 cup"
          }
        ],
        instructions: [
          "Roast ragi flour on low flame for 6-8 minutes until color changes and aroma develops",
          "Stir in ghee and continue roasting for 5-7 minutes until mixture is crunchy",
          "Remove from heat and add cardamom powder and jaggery powder",
          "Let the mixture cool slightly and mix well",
          "Shape into laddus and store in an airtight container"
        ]
      },
      faqs: [
        {
          question: "What age is best to introduce Sprouted Ragi + Almonds Porridge?",
          answer: "Babies can start enjoying sprouted Ragi porridge from 6 months and older, depending on individual readiness for solids."
        },
        {
          question: "Can I make Ragi porridge in bulk and store it?",
          answer: "It's best to make fresh servings each time. However, dry ragi powder can be stored in an airtight container for a few weeks."
        },
        {
          question: "Can I add milk directly for a baby under one year?",
          answer: "For babies under one, use water instead of milk. You can add milk for toddlers and older children."
        },
        {
          question: "How much ragi porridge should I serve to my baby?",
          answer: "Start with 1-2 tablespoons and adjust based on your baby's appetite and response."
        },
        {
          question: "Are there other fruits or veggies I can add?",
          answer: "Yes! You can try gentle options like pear or pumpkin puree for added nutrients."
        }
      ],
      storage: {
        method: "Airtight container",
        temperature: "Room temperature or refrigerated",
        duration: "Few days at room temperature, longer if refrigerated"
      },
      targetAudience: ["Kids", "Adults", "Toddlers", "Families"],
      traditions: {
        significance: "Traditional snack with nostalgic value",
        occasions: ["Daily snack", "Festivals", "Special occasions"]
      }
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