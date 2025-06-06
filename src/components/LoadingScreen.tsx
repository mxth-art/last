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
    const tl = gsap.timeline();

    // Initial animation for background and text
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

    const timer = setTimeout(() => {
      const openCurtain = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 500);
        }
      });

      openCurtain
        .to(textRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
        .to(bgLeftRef.current, {
          x: '-50vw',
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.1')
        .to(bgRightRef.current, {
          x: '50vw',
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.8')
        .to([bgLeftRef.current, bgRightRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2')
        .to(curtainLeftRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.3')
        .to(curtainRightRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.8')
        .to(backdropRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        }, '-=0.2');
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <>
      {/* Solid backdrop to prevent peeking */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 bg-white z-[9999]"
      />
      
      {/* Left curtain */}
      <div 
        ref={curtainLeftRef} 
        className="fixed top-0 left-0 h-screen w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'left center' }}
      />
      
      {/* Right curtain */}
      <div 
        ref={curtainRightRef} 
        className="fixed top-0 right-0 h-screen w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'right center' }}
      />
      
      {/* Curtain content */}
      <div className="fixed inset-0 flex items-center justify-center z-[10001]">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          
          {/* Background Left */}
          <div
            ref={bgLeftRef}
            className="absolute flex items-center justify-center w-full h-full"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              transformOrigin: 'center center',
              zIndex: 1
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Welcome Left"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Background Right */}
          <div
            ref={bgRightRef}
            className="absolute flex items-center justify-center w-full h-full"
            style={{
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              transformOrigin: 'center center',
              zIndex: 1
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Welcome Right"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none"
          >
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;