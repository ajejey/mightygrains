import SSM from '../SSM.png'
import ragiHurihittu from '../assets/images/RagiHurihittuPack-removebg.png'
import sattuMaavuPack from '../assets/images/sattuMaavuPack-removebg.png'
export const products = [
    {
      id: 1,
      name: "Sattu Maavu",
      image: sattuMaavuPack,
      shortDescription: "A nutritious blend for growing babies.",
      fullDescription: "Sattu Maavu is a carefully crafted blend of Ragi, millets, nuts, and 22+ ingredients, perfect for supporting the growth and development of babies and young children.",
      ingredients: ["Ragi", "Millets", "Almonds", "Cashews", "Dates", "Cardamom"],
      nutritionalFacts: {
        calories: 120,
        protein: "5g",
        carbs: "20g",
        fat: "3g",
        fiber: "4g"
      }
    },
    {
      id: 2,
      name: "Ragi Huri Hittu",
      image: ragiHurihittu,
      shortDescription: "Sprouted Ragi flour for babies 6 months+.",
      fullDescription: "Ragi Huri Hittu is an ideal, healthy, and gluten free snack for that mid-morning hunger pangs. Ragi Huri Hittu has received lot of love from toddlers to grandparents! This fresh and yummy pack is abundant in calcium and supplies the essencial amino acids required for your body.",
      // fullDescription: "Ragi Huri Hittu is a nutrient-dense sprouted Ragi flour, specially processed to be easily digestible and packed with essential nutrients for babies 6 months and older.",
      ingredients: ["Sprouted Ragi"],
      nutritionalFacts: {
        calories: 100,
        protein: "4g",
        carbs: "22g",
        fat: "1g",
        fiber: "3g"
      }
    }
  ];