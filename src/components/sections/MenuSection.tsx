import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, ChevronDown, Utensils, Coffee, Wine } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isSpecial?: boolean;
  spiceLevel?: 1 | 2 | 3;
}

const menuData: MenuItemData[] = [
  // Starters
  {
    id: "1",
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced vegetables",
    price: 4.50,
    category: "starters",
    isVegetarian: true,
    spiceLevel: 2
  },
  {
    id: "2",
    name: "Onion Bhaji",
    description: "Deep-fried onion fritters with aromatic spices",
    price: 4.50,
    category: "starters",
    isVegetarian: true,
    spiceLevel: 2
  },
  {
    id: "3",
    name: "Chicken Tikka",
    description: "Marinated chicken pieces grilled in tandoor",
    price: 6.50,
    category: "starters",
    spiceLevel: 2
  },
  {
    id: "4",
    name: "Seekh Kebab",
    description: "Spiced minced lamb grilled on skewers",
    price: 6.50,
    category: "starters",
    spiceLevel: 3
  },
  {
    id: "5",
    name: "Prawn Puri",
    description: "Spiced prawns served with puri bread",
    price: 7.50,
    category: "starters",
    spiceLevel: 2
  },
  {
    id: "6",
    name: "Mixed Starter",
    description: "Selection of vegetarian and non-vegetarian starters",
    price: 8.50,
    category: "starters",
    isSpecial: true,
    spiceLevel: 2
  },

  // Main Courses - Chicken
  {
    id: "7",
    name: "Chicken Curry",
    description: "Traditional chicken curry with aromatic spices",
    price: 12.50,
    category: "chicken",
    spiceLevel: 2
  },
  {
    id: "8",
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in creamy tomato sauce",
    price: 13.50,
    category: "chicken",
    spiceLevel: 1,
    isSpecial: true
  },
  {
    id: "9",
    name: "Chicken Korma",
    description: "Mild chicken curry in coconut and almond sauce",
    price: 13.50,
    category: "chicken",
    spiceLevel: 1
  },
  {
    id: "10",
    name: "Chicken Vindaloo",
    description: "Hot and sour chicken curry from Goa",
    price: 13.50,
    category: "chicken",
    spiceLevel: 3
  },
  {
    id: "11",
    name: "Chicken Madras",
    description: "Medium hot chicken curry with coconut",
    price: 13.50,
    category: "chicken",
    spiceLevel: 3
  },
  {
    id: "12",
    name: "Butter Chicken",
    description: "Creamy tomato-based chicken curry",
    price: 14.50,
    category: "chicken",
    spiceLevel: 1,
    isSpecial: true
  },

  // Main Courses - Lamb
  {
    id: "13",
    name: "Lamb Curry",
    description: "Traditional lamb curry with spices",
    price: 14.50,
    category: "lamb",
    spiceLevel: 2
  },
  {
    id: "14",
    name: "Lamb Rogan Josh",
    description: "Aromatic lamb curry from Kashmir",
    price: 15.50,
    category: "lamb",
    spiceLevel: 2,
    isSpecial: true
  },
  {
    id: "15",
    name: "Lamb Saag",
    description: "Lamb cooked with spinach and spices",
    price: 15.50,
    category: "lamb",
    spiceLevel: 2
  },
  {
    id: "16",
    name: "Lamb Vindaloo",
    description: "Hot and sour lamb curry",
    price: 15.50,
    category: "lamb",
    spiceLevel: 3
  },

  // Vegetarian
  {
    id: "17",
    name: "Dal Tarka",
    description: "Lentils tempered with garlic and spices",
    price: 8.50,
    category: "vegetarian",
    isVegetarian: true,
    spiceLevel: 1
  },
  {
    id: "18",
    name: "Aloo Gobi",
    description: "Cauliflower and potato curry",
    price: 9.50,
    category: "vegetarian",
    isVegetarian: true,
    spiceLevel: 2
  },
  {
    id: "19",
    name: "Palak Paneer",
    description: "Cottage cheese in spinach curry",
    price: 10.50,
    category: "vegetarian",
    isVegetarian: true,
    spiceLevel: 2,
    isSpecial: true
  },
  {
    id: "20",
    name: "Paneer Makhani",
    description: "Cottage cheese in creamy tomato sauce",
    price: 11.50,
    category: "vegetarian",
    isVegetarian: true,
    spiceLevel: 1
  },
  {
    id: "21",
    name: "Chana Masala",
    description: "Chickpeas in spiced tomato gravy",
    price: 9.50,
    category: "vegetarian",
    isVegetarian: true,
    spiceLevel: 2
  },

  // Seafood
  {
    id: "22",
    name: "Fish Curry",
    description: "Fresh fish in coconut curry sauce",
    price: 15.50,
    category: "seafood",
    spiceLevel: 2
  },
  {
    id: "23",
    name: "Prawn Curry",
    description: "Prawns in aromatic curry sauce",
    price: 16.50,
    category: "seafood",
    spiceLevel: 2,
    isSpecial: true
  },
  {
    id: "24",
    name: "Fish Tikka",
    description: "Marinated fish grilled in tandoor",
    price: 16.50,
    category: "seafood",
    spiceLevel: 2
  },

  // Rice & Biryani
  {
    id: "25",
    name: "Basmati Rice",
    description: "Fragrant long-grain rice",
    price: 3.50,
    category: "rice",
    isVegetarian: true
  },
  {
    id: "26",
    name: "Pilau Rice",
    description: "Spiced basmati rice",
    price: 4.50,
    category: "rice",
    isVegetarian: true
  },
  {
    id: "27",
    name: "Chicken Biryani",
    description: "Aromatic rice with spiced chicken",
    price: 14.50,
    category: "rice",
    isSpecial: true,
    spiceLevel: 2
  },
  {
    id: "28",
    name: "Lamb Biryani",
    description: "Aromatic rice with spiced lamb",
    price: 16.50,
    category: "rice",
    isSpecial: true,
    spiceLevel: 2
  },
  {
    id: "29",
    name: "Vegetable Biryani",
    description: "Aromatic rice with mixed vegetables",
    price: 12.50,
    category: "rice",
    isVegetarian: true,
    spiceLevel: 2
  },

  // Bread
  {
    id: "30",
    name: "Naan",
    description: "Traditional Indian bread",
    price: 3.50,
    category: "bread",
    isVegetarian: true
  },
  {
    id: "31",
    name: "Garlic Naan",
    description: "Naan bread with garlic",
    price: 4.50,
    category: "bread",
    isVegetarian: true
  },
  {
    id: "32",
    name: "Peshwari Naan",
    description: "Sweet naan with coconut and almonds",
    price: 4.50,
    category: "bread",
    isVegetarian: true
  },
  {
    id: "33",
    name: "Keema Naan",
    description: "Naan stuffed with spiced minced lamb",
    price: 5.50,
    category: "bread",
    spiceLevel: 2
  },
  {
    id: "34",
    name: "Chapati",
    description: "Thin unleavened bread",
    price: 2.50,
    category: "bread",
    isVegetarian: true
  },
  {
    id: "35",
    name: "Paratha",
    description: "Layered flatbread",
    price: 3.50,
    category: "bread",
    isVegetarian: true
  },

  // Drinks
  {
    id: "36",
    name: "Mango Lassi",
    description: "Sweet yogurt drink with mango",
    price: 4.50,
    category: "drinks",
    isVegetarian: true
  },
  {
    id: "37",
    name: "Sweet Lassi",
    description: "Traditional sweet yogurt drink",
    price: 3.50,
    category: "drinks",
    isVegetarian: true
  },
  {
    id: "38",
    name: "Masala Tea",
    description: "Spiced Indian tea",
    price: 2.50,
    category: "drinks",
    isVegetarian: true
  },
  {
    id: "39",
    name: "Fresh Lime Soda",
    description: "Refreshing lime drink",
    price: 3.50,
    category: "drinks",
    isVegetarian: true
  },

  // Desserts
  {
    id: "40",
    name: "Gulab Jamun",
    description: "Sweet milk dumplings in syrup",
    price: 4.50,
    category: "desserts",
    isVegetarian: true
  },
  {
    id: "41",
    name: "Kulfi",
    description: "Traditional Indian ice cream",
    price: 4.50,
    category: "desserts",
    isVegetarian: true
  },
  {
    id: "42",
    name: "Ras Malai",
    description: "Cottage cheese dumplings in sweet milk",
    price: 5.50,
    category: "desserts",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "43",
    name: "Kheer",
    description: "Rice pudding with cardamom",
    price: 4.50,
    category: "desserts",
    isVegetarian: true
  }
];

const MenuSection: React.FC = () => {
  const { language } = useLanguage();
  const categories = [
    { id: "all", name: "All", icon: Utensils },
    { id: "starters", name: "Starters", icon: Utensils },
    { id: "chicken", name: "Chicken", icon: Utensils },
    { id: "lamb", name: "Lamb", icon: Utensils },
    { id: "seafood", name: "Seafood", icon: Utensils },
    { id: "vegetarian", name: "Vegetarian", icon: Utensils },
    { id: "rice", name: "Rice & Biryani", icon: Utensils },
    { id: "bread", name: "Bread", icon: Utensils },
    { id: "drinks", name: "Drinks", icon: Coffee },
    { id: "desserts", name: "Desserts", icon: Wine }
  ];
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllItems, setShowAllItems] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredMenu = activeCategory === "all"
    ? menuData
    : menuData.filter(item => item.category === activeCategory);

  const displayedItems = showAllItems ? filteredMenu : filteredMenu.slice(0, 12);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Utensils;
  };

  return (
    <section id="menu" className="relative py-24 overflow-hidden" style={{ backgroundColor: '#ffd647' }}>
      {/* Rotating Table Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[100vw] h-screen overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/2 w-[120vw] h-[120vw] flex justify-center items-center menu-table-rotate">
            <img 
              src="/Menu/table.jpg" 
              alt="Rotating table decoration"
              className="w-full h-full object-contain opacity-20"
            />
          </div>
        </div>

        <style>{`
          .menu-table-rotate {
            animation: menuTableRotate 30s linear infinite;
            transform-origin: center;
          }
          @keyframes menuTableRotate {
            from {
              transform: translateY(-50%) rotate(0deg);
            }
            to {
              transform: translateY(-50%) rotate(360deg);
            }
          }
        `}</style>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Menu className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">
              {translations.menu.subtitle[language]}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {translations.menu.title[language]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Discover authentic Indian flavors crafted with traditional recipes and the finest spices
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center flex-wrap gap-2 md:gap-4 my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`flex items-center gap-2 px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium capitalize transition-all ${
                  activeCategory === category.id
                    ? 'bg-spice-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-spice-200 hover:text-spice-800'
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowAllItems(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <IconComponent size={16} />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Menu Items Grid */}
        <div 
          ref={menuRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-gray-900 mb-1 group-hover:text-spice-600 transition-colors">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-spice-600 font-bold text-lg">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Tags and Indicators */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {item.isVegetarian && (
                      <span className="bg-leaf-100 text-leaf-700 text-xs px-2 py-1 rounded-full font-medium">
                        Vegetarian
                      </span>
                    )}
                    {item.isSpecial && (
                      <span className="bg-chili-100 text-chili-700 text-xs px-2 py-1 rounded-full font-medium">
                        Chef's Special
                      </span>
                    )}
                    {item.spiceLevel && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Spice:</span>
                        {[...Array(3)].map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < item.spiceLevel! ? 'bg-chili-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        {filteredMenu.length > 12 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowAllItems(!showAllItems)}
              className="bg-spice-600 hover:bg-spice-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllItems 
                ? `Show Less` 
                : `View All ${filteredMenu.length} Items`
              }
            </motion.button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Authentic Indian Cuisine?
            </h3>
            <p className="text-gray-600 mb-6">
              Book your table now and embark on a culinary journey through India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                className="btn-primary text-center"
              >
                {translations.hero.bookTable[language]}
              </Link>
              <a 
                href="tel:+4917942320002" 
                className="bg-white border-2 border-spice-500 text-spice-600 hover:bg-spice-50 px-6 py-3 rounded-md font-medium transition-all duration-300 text-center"
              >
                Call to Order
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="scroll-indicator">
            <div className="scroll-indicator-progress" />
          </div>
          <Link
            to="gallery"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors"
          >
            <span className="text-sm uppercase tracking-wider mb-2">
              View Our Gallery
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;