import React, { useRef, useState, useEffect } from 'react';

const AboutSection = () => {
  const textRef = useRef(null);
  const contentRef = useRef(null);
  
  // Image slider state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/for-about-2-chicken.jpg",
      alt: "Traditional South Indian chicken dish"
    },
    
    {
      src: "/for-about-1.jpg",
      alt: "Restaurant ambiance"
    },
    {
      src: "/for-about-fish-4.jpg",
      alt: "Fresh South Indian fish curry"
    },
    {
      src: "/for-about-thali-5.jpg",
      alt: "Traditional South Indian thali"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const features = [
    {
      title: "Fresh Ingredients",
      description: "We source the finest ingredients to create authentic flavors that transport you to the heart of South India.",
      color: 'orange'
    },
    {
      title: "Traditional Recipes",
      description: "Our recipes have been passed down through generations, preserving the authentic taste of South Indian cuisine.",
      color: 'green'
    },
    {
      title: "Warm Ambiance",
      description: "Experience the warmth of Indian hospitality in our thoughtfully designed space that feels like home.",
      color: 'red'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 pb-32 overflow-hidden"
      style={{ backgroundColor: '#fed647' }}
    >
      <div className="container mx-auto px-4 pr-6 box-border relative z-10 overflow-y-auto">
        <div ref={textRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="mr-2 text-orange-600">📖</div>
            <span className="uppercase tracking-widest text-sm text-orange-600">
              Our Story
            </span>
          </div>

          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            About Bay Leaf
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover the authentic flavors of South India in the heart of Germany. Our journey began with a passion for sharing traditional recipes and creating memorable dining experiences.
          </p>
        </div>
        
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="lg:pr-8">
            {/* White animated box for "Our Story" */}
            <div className="bg-white/80 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl md:text-3xl mb-4 text-gray-900 font-bold">
                Our Story
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Founded with a vision to bring authentic South Indian cuisine to Germany, Bay Leaf represents a culinary journey that spans generations. Our story begins in the bustling kitchens of Tamil Nadu, where traditional recipes were carefully preserved and passed down through families.
              </p>
              <h4 className="text-xl md:text-2xl mb-2 text-gray-800 font-semibold">
                A Family Legacy
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                What started as a family tradition has blossomed into a restaurant that celebrates the rich heritage of South Indian cooking. Every dish tells a story, every spice blend carries history.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue this legacy by serving authentic dishes prepared with the same love and care that has defined our family's cooking for generations.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-6 shadow">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2 text-2xl font-bold">
                  15+
                </div>
                <h4 className="font-medium text-gray-900">Years Experience</h4>
                <p className="text-sm text-gray-500">Serving authentic cuisine</p>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-6 shadow">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 text-2xl font-bold">
                  50+
                </div>
                <h4 className="font-medium text-gray-900">Traditional Recipes</h4>
                <p className="text-sm text-gray-500">Passed down generations</p>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-6 shadow">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2 text-2xl font-bold">
                  1000+
                </div>
                <h4 className="font-medium text-gray-900">Happy Customers</h4>
                <p className="text-sm text-gray-500">Monthly satisfied diners</p>
              </div>
            </div>
          </div>
          
          {/* Right column: Image Slider */}
          <div className="h-[600px] rounded-lg overflow-hidden shadow-xl relative group">
            {/* Image Container */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    opacity: index === currentImageIndex ? 1 : 0,
                    transform: index === currentImageIndex ? 'scale(1)' : 'scale(1.1)',
                    transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out'
                  }}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div>◀</div>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div>▶</div>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/80 p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-full bg-${feature.color}-500 text-white flex items-center justify-center mb-4`}>
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 md:p-12 relative">
            {/* Quote marks */}
            <div className="text-6xl text-orange-300 absolute top-4 left-6 font-serif">"</div>
            <div className="text-6xl text-orange-300 absolute bottom-4 right-6 font-serif">"</div>
            
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-6 leading-relaxed italic">
                Food is our common ground, a universal experience. When we share a meal, we share stories, culture, and love.
              </p>
              <footer className="flex flex-col items-center">
                <cite className="text-lg md:text-xl font-semibold text-orange-600 not-italic">
                  Chef & Owner
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 text-center">
        <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-orange-600 transition-colors">
          <span className="text-sm uppercase tracking-wider mb-2">
            Explore Our Menu
          </span>
          <div className="animate-bounce">⌄</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;