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
  // Original images from gallery pics 2 for bay
  {
    id: "1",
    title: "Traditional Masala Dosa",
    imageUrl: "/gallery pics 2 for bay/image(1).jpeg",
    category: "food",
    description: "Our signature crispy dosa served with authentic sambar and chutneys"
  },
  {
    id: "2",
    title: "Main Dining Area",
    imageUrl: "/gallery pics 2 for bay/image(2).jpeg",
    category: "restaurant",
    description: "Elegant dining space with traditional South Indian elements"
  },
  {
    id: "3",
    title: "Chef's Special Curry",
    imageUrl: "/gallery pics 2 for bay/image(3).jpeg",
    category: "food",
    description: "Aromatic curry prepared with hand-ground spices"
  },
  {
    id: "4",
    title: "Cultural Events",
    imageUrl: "/gallery pics 2 for bay/image(4).jpeg",
    category: "events",
    description: "Regular cultural performances and traditional music"
  },
  {
    id: "5",
    title: "South Indian Thali",
    imageUrl: "/gallery pics 2 for bay/image(5).jpeg",
    category: "food",
    description: "Complete meal with variety of curries, rice, and accompaniments"
  },
  {
    id: "6",
    title: "Private Dining",
    imageUrl: "/gallery pics 2 for bay/image(6).jpeg",
    category: "restaurant",
    description: "Intimate dining space for special occasions"
  },
  // New images from gallery pics for bay
  {
    id: "21",
    title: "Aloo Paratha",
    imageUrl: "/gallery pics for bay/aloo paratha pic.jpg",
    category: "food",
    description: "Stuffed potato flatbread served with yogurt and pickle"
  },
  {
    id: "22",
    title: "Aloo Chana Chaat",
    imageUrl: "/gallery pics for bay/Aloo-Chana-Chaat-pic.jpg",
    category: "food",
    description: "Spicy chickpea and potato street food"
  },
  {
    id: "23",
    title: "Aloo Gobi",
    imageUrl: "/gallery pics for bay/aloo-gobi pic.jpg",
    category: "food",
    description: "Cauliflower and potato curry with aromatic spices"
  },
  {
    id: "24",
    title: "Aloo Palak",
    imageUrl: "/gallery pics for bay/Aloo-palak pic.jpg",
    category: "food",
    description: "Spinach and potato curry rich in iron and flavor"
  },
  {
    id: "25",
    title: "Beef Milagu",
    imageUrl: "/gallery pics for bay/beef milagu.png",
    category: "food",
    description: "Spicy pepper beef curry from Kerala"
  },
  {
    id: "26",
    title: "Cauliflower Special",
    imageUrl: "/gallery pics for bay/cauliflower pictures.jpg",
    category: "food",
    description: "Roasted cauliflower with special spice blend"
  },
  {
    id: "27",
    title: "Chana Masala",
    imageUrl: "/gallery pics for bay/chana masala pic.jpg",
    category: "food",
    description: "Chickpea curry in rich tomato-onion gravy"
  },

  {
    id: "30",
    title: "Chicken 65",
    imageUrl: "/gallery pics for bay/chicken 65 picture.JPG",
    category: "food",
    description: "Crispy fried chicken with South Indian spices"
  },
  {
    id: "31",
    title: "Chicken Biriyani",
    imageUrl: "/gallery pics for bay/chicken briyani pic.webp",
    category: "food",
    description: "Fragrant basmati rice with tender chicken"
  },
  {
    id: "32",
    title: "Chicken Chettinad",
    imageUrl: "/gallery pics for bay/chicken chettinad pic.jpg",
    category: "food",
    description: "Fiery chicken curry from Chettinad region"
  },
  {
    id: "33",
    title: "Chicken Gongura",
    imageUrl: "/gallery pics for bay/chicken gongura pic.jpg",
    category: "food",
    description: "Tangy chicken curry with sorrel leaves"
  },
  {
    id: "34",
    title: "Chicken Gravy",
    imageUrl: "/gallery pics for bay/chicken gravy pic.webp",
    category: "food",
    description: "Rich and creamy chicken curry"
  },
  {
    id: "35",
    title: "Chicken Special",
    imageUrl: "/gallery pics for bay/chicken pic.webp",
    category: "food",
    description: "Chef's special chicken preparation"
  },
  {
    id: "36",
    title: "Chicken Tikka Masala",
    imageUrl: "/gallery pics for bay/chicken tikka masala pic.jpg",
    category: "food",
    description: "Grilled chicken in creamy tomato sauce"
  },
  {
    id: "37",
    title: "Chicken with Bone",
    imageUrl: "/gallery pics for bay/chicken with bone.jpg",
    category: "food",
    description: "Traditional bone-in chicken curry"
  },

  {
    id: "40",
    title: "Dal Paneer",
    imageUrl: "/gallery pics for bay/dal-paneer pic.jpg",
    category: "food",
    description: "Lentil curry with cottage cheese"
  },
  {
    id: "41",
    title: "Eral Fry",
    imageUrl: "/gallery pics for bay/eral fry.jpg",
    category: "food",
    description: "Spicy prawns stir-fry"
  },
  {
    id: "42",
    title: "Eral Milagu",
    imageUrl: "/gallery pics for bay/eral milagu pic.jpg",
    category: "food",
    description: "Pepper prawns curry"
  },
  {
    id: "43",
    title: "Eral Thoku",
    imageUrl: "/gallery pics for bay/eral thoku.jpg",
    category: "food",
    description: "Dry prawns preparation with spices"
  },
  {
    id: "44",
    title: "Eral Prawn Pepper Fry",
    imageUrl: "/gallery pics for bay/eral-prawn-pepper-fry pic.jpg",
    category: "food",
    description: "Spicy pepper prawns fry"
  },
  {
    id: "45",
    title: "Fish Kulambu",
    imageUrl: "/gallery pics for bay/fish kulambu pic.jpg",
    category: "food",
    description: "Traditional Tamil fish curry"
  },
  {
    id: "46",
    title: "Fish Molee",
    imageUrl: "/gallery pics for bay/Fish-Molee pic.jpg",
    category: "food",
    description: "Kerala style fish curry in coconut milk"
  },
  {
    id: "47",
    title: "Gongura Mutton",
    imageUrl: "/gallery pics for bay/gongura mutton pic.webp",
    category: "food",
    description: "Mutton curry with tangy sorrel leaves"
  },
  {
    id: "48",
    title: "Kadai Paneer",
    imageUrl: "/gallery pics for bay/kadai-paneer pic.webp",
    category: "food",
    description: "Cottage cheese in spicy tomato gravy"
  }
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 9);

  const categories = ['all', 'food', 'restaurant', 'events'];

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
                  <motion.img 
                    src={item.imageUrl} 
                    alt={item.title}
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
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title}
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