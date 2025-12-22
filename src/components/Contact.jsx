'use client';

import { socials } from '../../constants/index.js';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const branches = [
  {
    id: 'zamalek',
    name: 'Zamalek',
    address: '15, 26th of July St, Nile View',
    phone: '+20 122 345 6789',
    hours: '08:00 AM - 12:00 AM',
    coordinates: '30.06° N, 31.22° E'
  },
  {
    id: 'newcairo',
    name: 'New Cairo',
    address: 'Waterway 2, 5th Settlement',
    phone: '+20 100 987 6543',
    hours: '09:00 AM - 02:00 AM',
    coordinates: '30.02° N, 31.49° E'
  },
  {
    id: 'gouna',
    name: 'El Gouna',
    address: 'Abu Tig Marina, Red Sea',
    phone: '+20 111 222 3333',
    hours: '10:00 AM - 04:00 AM',
    coordinates: '27.39° N, 33.67° E'
  },
  {
    id: 'maadi',
    name: 'Maadi',
    address: 'Road 9, Degla, Cairo',
    phone: '+20 155 555 5555',
    hours: '08:00 AM - 11:00 PM',
    coordinates: '29.96° N, 31.25° E'
  }
];

const Contact = () => {
  const container = useRef(null);
  const [activeBranch, setActiveBranch] = useState(0);

  const changeBranch = (index) => {
    if (index === activeBranch) return;

    gsap.to('.details-content', {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setActiveBranch(index);
        gsap.to('.details-content', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          clearProps: 'all'
        });
      }
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      }
    });

    tl.from('.footer-title span', {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power4.out'
    });

    tl.from('.fade-in-up', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    }, "-=0.4");

    gsap.to('.marquee-text', {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

  }, { scope: container });

  return (
    <>
    {/* ستايل خاص لإخفاء السكرول بار فقط في هذا الجزء */}
    <style jsx global>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>

    <footer 
      ref={container} 
      id="contact" 
      className="relative bg-[#0a0a0a] text-white overflow-hidden pt-12 md:pt-20 pb-0 min-h-screen md:min-h-[80vh] flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-b from-green-500/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-grow flex flex-col">
        
        {/* Title */}
        <h2 className="footer-title text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-16 overflow-hidden leading-none">
          { "Let's Connect".split("").map((char, i) => (
             <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
          ))}
        </h2>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 border-t border-white/20 pt-8 lg:pt-12 h-full">
          
          {/* --- Navigation Area --- */}
          <div className="lg:col-span-5 fade-in-up w-full">
            <h3 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Select Location</h3>
            
            {/* التعديل هنا:
              1. إضافة كلاس hide-scrollbar
              2. استخدام padding-bottom بسيط
              3. التأكد من أن الترتيب منظم
             */}
            <div className="hide-scrollbar flex lg:flex-col gap-3 overflow-x-auto pb-2 w-full snap-x">
                {branches.map((branch, index) => (
                <button
                    key={branch.id}
                    onClick={() => changeBranch(index)}
                    className={`
                        snap-start flex-shrink-0 px-6 py-3 rounded-full border transition-all duration-300 text-sm md:text-xl font-bold whitespace-nowrap
                        lg:whitespace-normal lg:px-0 lg:py-0 lg:rounded-none lg:border-none lg:text-5xl lg:text-left lg:hover:pl-4
                        ${index === activeBranch 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] lg:shadow-none lg:bg-transparent lg:text-white lg:pl-4 lg:border-l-4 lg:border-green-500' 
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/20 lg:hover:bg-transparent lg:hover:text-white lg:border-l-0'}
                    `}
                >
                    {branch.name}
                </button>
                ))}
            </div>
          </div>

          {/* --- Details Card --- */}
          <div className="lg:col-span-7 fade-in-up flex-grow pb-10 md:pb-0">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-12 flex flex-col justify-between border border-white/10 h-full min-h-[350px]">
                
                <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-20">
                    <svg className="w-10 h-10 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </div>

                <div className="details-content space-y-6 flex-grow">
                    <div>
                        <p className="text-xs text-green-400 font-mono mb-2">{branches[activeBranch].coordinates}</p>
                        <h4 className="text-3xl md:text-4xl font-serif italic mb-2">{branches[activeBranch].name}</h4>
                        <p className="text-lg md:text-xl text-white/80 max-w-md leading-relaxed">{branches[activeBranch].address}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        <div>
                            <span className="block text-[10px] md:text-xs uppercase text-white/40 mb-1">Call Us</span>
                            <a href={`tel:${branches[activeBranch].phone}`} className="text-xl md:text-2xl font-bold hover:text-green-400 transition-colors block">
                            {branches[activeBranch].phone}
                            </a>
                        </div>
                        <div>
                            <span className="block text-[10px] md:text-xs uppercase text-white/40 mb-1">Hours</span>
                            <p className="text-lg md:text-xl font-medium">{branches[activeBranch].hours}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-4 pt-6 border-t border-white/10 lg:hidden">
                    {socials.map((social, i) => (
                        <a key={i} href={social.url} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                            <img src={social.icon} className="w-5 h-5 brightness-0 invert" alt={social.name} />
                        </a>
                    ))}
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee */}
      <div className="w-full border-t border-white/10 mt-auto py-3 md:py-4 overflow-hidden bg-white text-black relative z-20">
        <div className="marquee-text whitespace-nowrap flex items-center gap-4 md:gap-8 text-sm md:text-lg font-bold uppercase tracking-widest">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-4 md:gap-8">
                MONJU JUICE BAR • FRESH • 
             </span>
           ))}
        </div>
      </div>

      {/* Desktop Socials */}
      <div className="hidden lg:flex absolute bottom-24 right-6 z-20 flex-col gap-4">
         {socials.map((social, i) => (
             <a key={i} href={social.url} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all border border-white/20">
                <img src={social.icon} alt={social.name} className="w-5 h-5 brightness-0 invert" />
             </a>
         ))}
      </div>
    </footer>
    </>
  )
}

export default Contact