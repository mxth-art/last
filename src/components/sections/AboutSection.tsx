import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const AboutSection: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { src: "https://ik.imageKit.io/jacw2jgvs/la43-listing.jpg?updatedAt=1747316422127", alt: "Restaurant interior" },
    { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop", alt: "Traditional South Indian dishes" },
    { src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop", alt: "Chef preparing food" },
    { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop", alt: "Spices and ingredients" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));

  const features = [
    { ...translations.about.features.ingredients, color: 'spice' },
    { ...translations.about.features.recipes, color: 'leaf' },
    { ...translations.about.features.ambiance, color: 'chili' }
  ];

  return (
    <section id="about" className="relative py-24 pb-32 overflow-hidden" style={{ backgroundColor: '#fed647' }}>
      <div className="container mx-auto px-4 pr-6 box-border relative z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-spice-400 scrollbar-track-cream-100">
        <div ref={textRef} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-center mb-4">
            <BookOpen className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">{translations.about.subtitle[language]}</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {translations.about.title[language]}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {translations.about.description[language]}
          </motion.p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="lg:pr-8">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-white/80 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="font-display text-2xl md:text-3xl mb-4 text-gray-900 font-bold">{translations.about.story.title[language]}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{translations.about.story.content[language]}</p>
              <h4 className="font-display text-xl md:text-2xl mb-2 text-gray-800 font-semibold">{translations.about.legacy.title[language]}</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">{translations.about.legacy.story[language]}</p>
              <p className="text-gray-700 leading-relaxed">{translations.about.legacy.continuation[language]}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {["experience", "recipes", "customers"].map((key, idx) => (
                <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 + idx * 0.2 }} className="flex flex-col items-center bg-white/80 rounded-lg p-6 shadow">
                  <div className={`w-16 h-16 rounded-full bg-${key === 'experience' ? 'spice' : key === 'recipes' ? 'leaf' : 'chili'}-100 flex items-center justify-center text-${key === 'experience' ? 'spice' : key === 'recipes' ? 'leaf' : 'chili'}-600 mb-2 text-2xl font-bold`}>
                    {translations.about.stats[key].number}+
                  </div>
                  <h4 className="font-medium text-gray-900">{translations.about.stats[key].label[language]}</h4>
                  <p className="text-sm text-gray-500">{translations.about.stats[key].subtext[language]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="h-[600px] rounded-lg overflow-hidden shadow-xl relative group">
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <motion.img key={index} src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: index === currentImageIndex ? 1 : 0, scale: index === currentImageIndex ? 1 : 1.1 }} transition={{ duration: 0.7, ease: "easeInOut" }} />
              ))}
            </div>

            <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/60 hover:bg-white/80'}`} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title[language]} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }} whileHover={{ y: -10 }} className="bg-white/80 p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl">
                <div className={`w-12 h-12 rounded-full bg-${feature.color}-500 text-white flex items-center justify-center mb-4`}>
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-display text-xl mb-3 text-gray-900">{feature.title[language]}</h3>
                <p className="text-gray-600">{feature.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mb-16 max-w-4xl mx-auto">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 md:p-12 relative">
            <div className="text-6xl text-spice-300 absolute top-4 left-6 font-serif">"</div>
            <div className="text-6xl text-spice-300 absolute bottom-4 right-6 font-serif">"</div>
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-6 leading-relaxed italic">{translations.about.quote.text[language]}</p>
              <footer className="flex flex-col items-center">
                <cite className="text-lg md:text-xl font-semibold text-spice-600 not-italic">{translations.about.quote.author[language]}</cite>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 text-center">
        <Link to="menu" spy={true} smooth={true} offset={-80} duration={800} className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors">
          <span className="text-sm uppercase tracking-wider mb-2">{translations.about.cta[language]}</span>
          <ChevronDown size={20} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
