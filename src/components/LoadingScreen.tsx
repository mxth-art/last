import React, { useEffect, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import gsap from 'gsap';

const LoadingScreen: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/IMG_3555-Photoroom.png', // Hero rotating plate
      '/Menu/table.jpg', // Menu rotating table
      '/thiruvalluvar wo bg final.png', // Thiruvalluvar statue
      '/red curtain with welcome .jpg' // Loading screen curtain
    ];

    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    // Wait for all critical images to load
    Promise.all(imagePromises)
      .then(() => {
        // Start loading screen animation after images are loaded
        const tl = gsap.timeline();

        tl.set([bgLeftRef.current, bgRightRef.current], { opacity: 0 })
          .set(textRef.current, { opacity: 0 })
          .to([bgLeftRef.current, bgRightRef.current], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          })
          .to(textRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.2');

        // Minimum loading time to ensure smooth experience
        const timer = setTimeout(() => {
          const openCurtain = gsap.timeline({
            onComplete: () => {
              setTimeout(() => setIsLoading(false), 300);
            }
          });

          openCurtain
            .to(textRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
            .to(bgLeftRef.current, { x: '-50vw', duration: 1.5, ease: 'power2.out' }, '-=0.2')
            .to(bgRightRef.current, { x: '50vw', duration: 1.5, ease: 'power2.out' }, '-=1.5')
            .to([bgLeftRef.current, bgRightRef.current], { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
            .to(curtainLeftRef.current, { scaleX: 0, duration: 1.5, ease: 'power3.inOut' }, '-=0.4')
            .to(curtainRightRef.current, { scaleX: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
            .to(backdropRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
        }, 2000); // Reduced from 2500ms to 2000ms

        return () => clearTimeout(timer);
      })
      .catch(error => {
        console.warn('Some images failed to preload:', error);
        // Still proceed with loading screen even if some images fail
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
      });
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-white z-[9999]"
      />

      {/* Curtains */}
      <div
        ref={curtainLeftRef}
        className="fixed top-0 left-0 h-full w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'left center' }}
      />
      <div
        ref={curtainRightRef}
        className="fixed top-0 right-0 h-full w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'right center' }}
      />

      {/* Curtain content */}
      <div className="fixed inset-0 flex items-center justify-center z-[10001]">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Left Background */}
          <div
            ref={bgLeftRef}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              zIndex: 1,
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Left"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* Right Background */}
          <div
            ref={bgRightRef}
            className="absolute top-0 right-0 w-full h-full flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              zIndex: 1,
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Right"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* Loading indicator */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none text-black text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spice-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-800">Willkommen bei Bay Leaf</p>
              <p className="text-sm text-gray-600 mt-2">Loading authentic flavors...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;