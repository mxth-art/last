import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Image, X, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

const galleryData: GalleryItem[] = [

  {
    id: "1",
    title: "Traditional Masala Dosa",
    imageUrl: "/gallery-pics-2-for-bay/image(1).jpeg",
    category: "food",
    description: "Our signature crispy dosa served with authentic sambar and chutneys"
  },
  {
    id: "2",
    title: "Main Dining Area",
    imageUrl: "/gallery-pics-2-for-bay/image(2).jpeg",
    category: "restaurant",
    description: "Elegant dining space with traditional South Indian elements"
  },
  {
    id: "3",
    title: "Chef's Special Curry",
    imageUrl: "/gallery-pics-2-for-bay/image(3).jpeg",
    category: "food",
    description: "Aromatic curry prepared with hand-ground spices"
  },
  {
    id: "4",
    title: "Cultural Events",
    imageUrl: "/gallery-pics-2-for-bay/image(4).jpeg",
    category: "events",
    description: "Regular cultural performances and traditional music"
  },
  {
    id: "5",
    title: "South Indian Thali",
    imageUrl: "/gallery-pics-2-for-bay/image(5).jpeg",
    category: "food",
    description: "Complete meal with variety of curries, rice, and accompaniments"
  },
  {
    id: "6",
    title: "Private Dining",
    imageUrl: "/gallery-pics-2-for-bay/image(6).jpeg",
    category: "restaurant",
    description: "Intimate dining space for special occasions"
  },
  // Additional images from gallery pics 2 for bay (7-30)
  {
    id: "7",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(7).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "8",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(8).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "9",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(9).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "10",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(10).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "11",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(11).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "12",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(12).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "13",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(13).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "14",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(14).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "15",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(15).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "16",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(16).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "17",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(17).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "18",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(18).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "19",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(19).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "20",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(20).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "21",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(21).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "22",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(22).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "23",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(23).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "24",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(24).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "25",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(25).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "26",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(26).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "27",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(27).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "28",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(28).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "29",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(29).jpeg",
    category: "food",
    description: ""
  },
  {
    id: "30",
    title: "",
    imageUrl: "/gallery-pics-2-for-bay/image(30).jpeg",
    category: "food",
    description: ""
  },
  // All images from gallery pics for bay (with fixed paths)
  {
    id: "31",
    title: "Aloo Paratha",
    imageUrl: "/gallery-pics-for-bay/aloo-paratha-pic.jpg",
    category: "food",
    description: "Stuffed potato flatbread served with yogurt and pickle"
  },
  {
    id: "32",
    title: "Aloo Chana Chaat",
    imageUrl: "/gallery-pics-for-bay/Aloo-Chana-Chaat-pic.jpg",
    category: "food",
    description: "Spicy chickpea and potato street food"
  },
  {
    id: "33",
    title: "Aloo Gobi",
    imageUrl: "/gallery-pics-for-bay/aloo-gobi-pic.jpg",
    category: "food",
    description: "Cauliflower and potato curry with aromatic spices"
  },
  {
    id: "34",
    title: "Aloo Palak",
    imageUrl: "/gallery-pics-for-bay/Aloo-palak-pic.jpg",
    category: "food",
    description: "Spinach and potato curry rich in iron and flavor"
  },
  {
    id: "35",
    title: "Beef Milagu",
    imageUrl: "/gallery-pics-for-bay/beef-milagu.png",
    category: "food",
    description: "Spicy pepper beef curry from Kerala"
  },
  {
    id: "36",
    title: "Cauliflower Special",
    imageUrl: "/gallery-pics-for-bay/cauliflower-pictures.jpg",
    category: "food",
    description: "Roasted cauliflower with special spice blend"
  },
  {
    id: "37",
    title: "Chana Masala",
    imageUrl: "/gallery-pics-for-bay/chana-masala-pic.jpg",
    category: "food",
    description: "Chickpea curry in rich tomato-onion gravy"
  },
  {
    id: "38",
    title: "Chettinad Chicken",
    imageUrl: "/gallery-pics-for-bay/chettinad-chicken-pic.jpeg",
    category: "food",
    description: "Authentic Chettinad style spicy chicken"
  },
  {
    id: "39",
    title: "Chettinad Mutton Kuzhambu",
    imageUrl: "/gallery-pics-for-bay/Chettinad-Mutton-Kuzhambu-pic.jpg",
    category: "food",
    description: "Traditional Chettinad mutton curry"
  },
  {
    id: "40",
    title: "Chicken 65",
    imageUrl: "/gallery-pics-for-bay/chicken-65-picture.JPG",
    category: "food",
    description: "Crispy fried chicken with South Indian spices"
  },
  {
    id: "41",
    title: "Chicken Biriyani",
    imageUrl: "/gallery-pics-for-bay/chicken-briyani-pic.webp",
    category: "food",
    description: "Fragrant basmati rice with tender chicken"
  },
  {
    id: "42",
    title: "Chicken Chettinad",
    imageUrl: "/gallery-pics-for-bay/chicken-chettinad-pic.jpg",
    category: "food",
    description: "Fiery chicken curry from Chettinad region"
  },
  {
    id: "43",
    title: "Chicken Gongura",
    imageUrl: "/gallery-pics-for-bay/chicken-gongura-pic.jpg",
    category: "food",
    description: "Tangy chicken curry with sorrel leaves"
  },
  {
    id: "44",
    title: "Chicken Gravy",
    imageUrl: "/gallery-pics-for-bay/chicken-gravy-pic.webp",
    category: "food",
    description: "Rich and creamy chicken curry"
  },
  {
    id: "45",
    title: "Chicken Special",
    imageUrl: "/gallery-pics-for-bay/chicken-pic.webp",
    category: "food",
    description: "Chef's special chicken preparation"
  },
  {
    id: "46",
    title: "Chicken Tikka Masala",
    imageUrl: "/gallery-pics-for-bay/chicken-tikka-masala-pic.jpg",
    category: "food",
    description: "Grilled chicken in creamy tomato sauce"
  },
  {
    id: "47",
    title: "Chicken with Bone",
    imageUrl: "/gallery-pics-for-bay/chicken-with-bone.jpg",
    category: "food",
    description: "Traditional bone-in chicken curry"
  },
  {
    id: "48",
    title: "Chicken Chettinad Curry",
    imageUrl: "/gallery-pics-for-bay/Chicken-Chettinad-Curry-pic.jpg",
    category: "food",
    description: "Authentic Chettinad chicken curry"
  },
  {
    id: "49",
    title: "Chicken Kuzhambu",
    imageUrl: "/gallery-pics-for-bay/Chicken-kuzhambu-recipe-chicken-kulambu-pic.jpg",
    category: "food",
    description: "Traditional Tamil chicken kuzhambu"
  },
  {
    id: "50",
    title: "Dal Paneer",
    imageUrl: "/gallery-pics-for-bay/dal-paneer-pic.jpg",
    category: "food",
    description: "Lentil curry with cottage cheese"
  },
  {
    id: "51",
    title: "Eral Fry",
    imageUrl: "/gallery-pics-for-bay/eral-fry.jpg",
    category: "food",
    description: "Spicy prawns stir-fry"
  },
  {
    id: "52",
    title: "Eral Milagu",
    imageUrl: "/gallery-pics-for-bay/eral-milagu-pic.jpg",
    category: "food",
    description: "Pepper prawns curry"
  },
  {
    id: "53",
    title: "Eral Thoku",
    imageUrl: "/gallery-pics-for-bay/eral-thoku.jpg",
    category: "food",
    description: "Dry prawns preparation with spices"
  },
  {
    id: "54",
    title: "Eral Prawn Pepper Fry",
    imageUrl: "/gallery-pics-for-bay/eral-prawn-pepper-fry-pic.jpg",
    category: "food",
    description: "Spicy pepper prawns fry"
  },
  {
    id: "55",
    title: "Fish Kulambu",
    imageUrl: "/gallery-pics-for-bay/fish-kulambu-pic.jpg",
    category: "food",
    description: "Traditional Tamil fish curry"
  },
  {
    id: "56",
    title: "Fish Molee",
    imageUrl: "/gallery-pics-for-bay/Fish-Molee-pic.jpg",
    category: "food",
    description: "Kerala style fish curry in coconut milk"
  },
  {
    id: "57",
    title: "Gongura Mutton",
    imageUrl: "/gallery-pics-for-bay/gongura-mutton-pic.webp",
    category: "food",
    description: "Mutton curry with tangy sorrel leaves"
  },
  {
    id: "58",
    title: "Kadai Paneer",
    imageUrl: "/gallery-pics-for-bay/kadai-paneer-pic.webp",
    category: "food",
    description: "Cottage cheese in spicy tomato gravy"
  },
  {
    id: "59",
    title: "Kari Dosai",
    imageUrl: "/gallery-pics-for-bay/KARI-DOSAI-PIC.jpg",
    category: "food",
    description: "Spicy meat dosa with authentic flavors"
  },
  {
    id: "60",
    title: "Kashmiri Mutton",
    imageUrl: "/gallery-pics-for-bay/kashmiri-mutton-2-1.jpg",
    category: "food",
    description: "Rich Kashmiri style mutton curry"
  },
  {
    id: "61",
    title: "Kozhi Masala",
    imageUrl: "/gallery-pics-for-bay/kozhi-masala-pic.jpg",
    category: "food",
    description: "Tamil style chicken masala"
  },
  {
    id: "62",
    title: "Kongunad Kozhi Kuzhambu",
    imageUrl: "/gallery-pics-for-bay/kongunad-kozhi-kuzhambu-chicken-curry-pic.jpg",
    category: "food",
    description: "Traditional Kongu Nadu chicken curry"
  },
  {
    id: "63",
    title: "Kozhi Rasam",
    imageUrl: "/gallery-pics-for-bay/kozhi-rasam-pic-1.jpg",
    category: "food",
    description: "Chicken rasam with aromatic spices"
  },
  {
    id: "64",
    title: "Kozhi Varuthathu",
    imageUrl: "/gallery-pics-for-bay/Kozhi-Varuthathu-PICTURE.webp",
    category: "food",
    description: "Kerala style chicken fry"
  },
  {
    id: "65",
    title: "Kuruma",
    imageUrl: "/gallery-pics-for-bay/kuruma-pic.webp",
    category: "food",
    description: "Creamy coconut-based curry"
  },
  {
    id: "66",
    title: "Mango Chicken Curry",
    imageUrl: "/gallery-pics-for-bay/Mango-Chicken-Curry-pic.jpg",
    category: "food",
    description: "Tangy mango chicken curry"
  },
  {
    id: "67",
    title: "Masala Dosa",
    imageUrl: "/gallery-pics-for-bay/masala-dosa-pic.webp",
    category: "food",
    description: "Crispy dosa with spiced potato filling"
  },
  {
    id: "68",
    title: "Mixed Vegetable Pakoda",
    imageUrl: "/gallery-pics-for-bay/mixed-vegetable-pakoda-2.jpg",
    category: "food",
    description: "Crispy mixed vegetable fritters"
  },
  {
    id: "69",
    title: "Mixed Vegetable Pakoda Special",
    imageUrl: "/gallery-pics-for-bay/mixed-vegetable-pakoda.jpg",
    category: "food",
    description: "Special mixed vegetable pakoda"
  },
  {
    id: "70",
    title: "Mutton Biryani",
    imageUrl: "/gallery-pics-for-bay/mutton-biryani.jpg",
    category: "food",
    description: "Aromatic mutton biryani with fragrant rice"
  },
  {
    id: "71",
    title: "Mutton Kurma",
    imageUrl: "/gallery-pics-for-bay/mutton-kurma-pic.jpg",
    category: "food",
    description: "Rich and creamy mutton kurma"
  },
  {
    id: "72",
    title: "Mutton Vindaloo",
    imageUrl: "/gallery-pics-for-bay/mutton-vindaloo-pic.webp",
    category: "food",
    description: "Spicy Goan style mutton vindaloo"
  },
  {
    id: "73",
    title: "Mutton Biryani Special",
    imageUrl: "/gallery-pics-for-bay/Mutton-biryani-3.webp",
    category: "food",
    description: "Premium mutton biryani with special spices"
  },
  {
    id: "74",
    title: "Mutton Kola Urundai",
    imageUrl: "/gallery-pics-for-bay/muttonkola-urundai-PICTURE-01.jpg",
    category: "food",
    description: "Traditional Tamil mutton meatballs"
  },
  {
    id: "75",
    title: "Murg Malai Kabab",
    imageUrl: "/gallery-pics-for-bay/Murgh-Malai-Kabab.jpg",
    category: "food",
    description: "Creamy chicken malai kabab"
  },
  {
    id: "76",
    title: "Onion Pakoda",
    imageUrl: "/gallery-pics-for-bay/Onion-pakoda-pic.jpg",
    category: "food",
    description: "Crispy onion fritters"
  },
  {
    id: "77",
    title: "Palak Paneer",
    imageUrl: "/gallery-pics-for-bay/palak-paneer-pic.jpg",
    category: "food",
    description: "Spinach curry with cottage cheese"
  },
  {
    id: "78",
    title: "Paneer Butter Masala",
    imageUrl: "/gallery-pics-for-bay/paneer-butter-masala-pic.jpg",
    category: "food",
    description: "Rich paneer in creamy tomato gravy"
  },
  {
    id: "79",
    title: "Paneer Dosa",
    imageUrl: "/gallery-pics-for-bay/paneer-dosa_July_2024_8.webp",
    category: "food",
    description: "Dosa filled with spiced paneer"
  },
  {
    id: "80",
    title: "Paneer Pakoda",
    imageUrl: "/gallery-pics-for-bay/paneer-pakoda-pic.jpg",
    category: "food",
    description: "Crispy paneer fritters"
  },
  {
    id: "81",
    title: "Paneer Tikka",
    imageUrl: "/gallery-pics-for-bay/paneer-tikka-pic.png",
    category: "food",
    description: "Grilled paneer with aromatic spices"
  },
  {
    id: "82",
    title: "Paruppu Keerai",
    imageUrl: "/gallery-pics-for-bay/paruppu-keerai-pic.jpg",
    category: "food",
    description: "Lentils cooked with spinach"
  },
  {
    id: "83",
    title: "Paruppu Podi",
    imageUrl: "/gallery-pics-for-bay/paruppu-podi-picture.webp",
    category: "food",
    description: "Traditional lentil powder mix"
  },
  {
    id: "84",
    title: "Pepper Chicken",
    imageUrl: "/gallery-pics-for-bay/pepper-chicken-pic.jpg",
    category: "food",
    description: "Spicy black pepper chicken"
  },
  {
    id: "85",
    title: "Pepper Mutton",
    imageUrl: "/gallery-pics-for-bay/PepperMutton-pic.jpg",
    category: "food",
    description: "Aromatic pepper mutton curry"
  },
  {
    id: "86",
    title: "Plain Dosa",
    imageUrl: "/gallery-pics-for-bay/PLAIN-DOSA-PIC.jpg",
    category: "food",
    description: "Classic plain dosa"
  },
  {
    id: "87",
    title: "Prawn Special",
    imageUrl: "/gallery-pics-for-bay/prawn-pic.jpg",
    category: "food",
    description: "Chef's special prawn preparation"
  },
  {
    id: "88",
    title: "SET Dosai",
    imageUrl: "/gallery-pics-for-bay/SET-DOSAI-PIC.jpg",
    category: "food",
    description: "Traditional set dosa"
  },
  {
    id: "89",
    title: "Thakkali Rasam",
    imageUrl: "/gallery-pics-for-bay/thakkali-rasam-pic.jpg",
    category: "food",
    description: "Tangy tomato rasam"
  },
  {
    id: "90",
    title: "Vegetable Biryani",
    imageUrl: "/gallery-pics-for-bay/Vegetable-Biryani-pic.jpg",
    category: "food",
    description: "Aromatic vegetable biryani"
  },
  {
    id: "91",
    title: "Vegetable Samosa",
    imageUrl: "/gallery-pics-for-bay/vegetable-samosa-pic.jpg",
    category: "food",
    description: "Crispy vegetable samosas"
  },
  {
    id: "92",
    title: "Vendikai Kulambu",
    imageUrl: "/gallery-pics-for-bay/vendikai-kulambu-pic.jpg",
    category: "food",
    description: "Traditional okra curry"
  }
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 9);

  const categories = ['all', 'food', 'restaurant', 'events'];

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const ImageComponent = ({ item, className, ...props }: { item: GalleryItem; className?: string; [key: string]: any }) => {
    const hasError = imageErrors.has(item.id);
    
    if (hasError) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <div className="text-center p-4">
            <Image className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-500 text-sm">{item.title}</p>
          </div>
        </div>
      );
    }

    return (
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className={className}
        onError={() => handleImageError(item.id)}
        loading="lazy"
        {...props}
      />
    );
  };

  return (
    <section id="gallery" className="relative py-24 bg-cream-50">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center mb-4"
          >
            <Image className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">Our Visual Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Take a visual journey through our restaurant, cuisine, and cultural events
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center flex-wrap gap-4 my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => {
                setFilter(category);
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                filter === category 
                  ? 'bg-spice-600 text-white shadow' 
                  : 'bg-cream-200 text-gray-700 hover:bg-spice-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          ref={galleryRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6"
          layout
        >
          <AnimatePresence>
            {displayedImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => setSelectedImage(item)}
                className="cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                  <ImageComponent
                    item={item}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-center p-2">
                      <h3 className="text-white font-display text-xs sm:text-sm md:text-base mb-1">{item.title}</h3>
                      <p className="text-white/80 text-xs hidden sm:block">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More/Less Button */}
        {filteredImages.length > 9 && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-spice-600 text-white rounded-full font-medium hover:bg-spice-700 transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <>
                  <EyeOff size={18} />
                  View Less
                </>
              ) : (
                <>
                  <Eye size={18} />
                  View More ({filteredImages.length - 9} more items)
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Scroll Down Indicator - positioned after gallery */}
        <motion.div 
          className="text-center mt-16 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          layout
        >
          <div className="scroll-indicator mx-auto mb-4">
            <div className="scroll-indicator-progress" />
          </div>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors mx-auto w-fit"
          >
            <span className="text-sm uppercase tracking-wider mb-2">Book Your Experience</span>
            <ChevronDown size={20} />
          </Link>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                <ImageComponent
                  item={selectedImage}
                  className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-display mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                  <span className="text-sm text-gray-500 mt-2 block capitalize">
                    Category: {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;